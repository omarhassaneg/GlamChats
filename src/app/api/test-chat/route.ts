import { NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { openai } from "@/lib/openai";
import { Keyword } from "@prisma/client";
import { cleanupTestMessages } from "@/actions/automations/queries";

export async function POST(request: Request) {
  try {
    const { message, automationId, listenerType } = await request.json();

    // Get automation details including keywords and listener
    const automation = await client.automation.findUnique({
      where: { id: automationId },
      include: {
        keywords: true,
        listener: true,
      },
    });

    if (!automation) {
      return NextResponse.json(
        { error: "Automation not found" },
        { status: 404 }
      );
    }

    // Check for keyword matches
    const matchedKeyword = automation.keywords.find((keyword: Keyword) =>
      message.toLowerCase().includes(keyword.word.toLowerCase())
    );

    // Create test message record
    const testMessage = await client.testMessage.create({
      data: {
        content: message,
        automationId,
        matched: !!matchedKeyword,
        matchedKeyword: matchedKeyword?.word,
      },
    });

    let response = "";

    if (matchedKeyword) {
      if (automation.listener?.listener === "SMARTAI") {
        try {
          // Use OpenAI for smart responses
          const completion = await openai.chat.completions.create({
            messages: [
              {
                role: "system",
                content: automation.listener.prompt,
              },
              {
                role: "user",
                content: message,
              },
            ],
            model: "gpt-3.5-turbo",
          });

          response = completion.choices[0]?.message?.content || "No response generated";
        } catch (error) {
          console.error("OpenAI API error:", error);
          response = "Error generating AI response. Falling back to default message.";
        }
      } else {
        // Use predefined message response
        response = automation.listener?.commentReply || "Default response message";
      }

      // Update test message with response
      await client.testMessage.update({
        where: { id: testMessage.id },
        data: { response },
      });

      // Cleanup old test messages
      await cleanupTestMessages(automationId).catch(console.error);

      return NextResponse.json({ response });
    }

    return NextResponse.json({
      response: "No matching keywords found for this message.",
    });
  } catch (error) {
    console.error("Error processing test message:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}