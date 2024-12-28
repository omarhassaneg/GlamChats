import { client } from '@/lib/prisma'

export const matchKeyword = async (keyword: string) => {
  console.log('🔵 Matching Keyword:', { keyword })
  const match = await client.keyword.findFirst({
    where: {
      word: {
        equals: keyword,
        mode: 'insensitive',
      },
    },
  })
  console.log('🔵 Keyword Match Result:', {
    found: match !== null,
    keywordId: match?.id,
    automationId: match?.automationId
  })
  return match
}

export const getKeywordAutomation = async (
  automationId: string,
  dm: boolean
) => {
  console.log('🔵 Fetching Automation:', {
    automationId,
    type: dm ? 'DM' : 'COMMENT'
  })
  
  const automation = await client.automation.findUnique({
    where: {
      id: automationId,
    },
    include: {
      dms: dm,
      trigger: {
        where: {
          type: dm ? 'DM' : 'COMMENT',
        },
      },
      listener: true,
      User: {
        select: {
          subscription: {
            select: {
              plan: true,
            },
          },
          integrations: {
            select: {
              token: true,
            },
          },
        },
      },
    },
  })

  console.log('🔵 Automation Details:', {
    found: automation !== null,
    hasListener: automation?.listener !== null,
    triggerCount: automation?.trigger.length,
    hasValidToken: automation?.User?.integrations[0]?.token !== null,
    subscriptionPlan: automation?.User?.subscription?.plan
  })

  return automation
}
export const trackResponses = async (
  automationId: string,
  type: 'COMMENT' | 'DM'
) => {
  console.log('🔵 Tracking Response:', {
    automationId,
    type
  })

  try {
    let result;
    if (type === 'COMMENT') {
      result = await client.listener.update({
        where: { automationId },
        data: {
          commentCount: {
            increment: 1,
          },
        },
      })
      console.log('🟢 Comment Count Updated:', {
        automationId,
        newCount: result.commentCount
      })
    }

    if (type === 'DM') {
      result = await client.listener.update({
        where: { automationId },
        data: {
          dmCount: {
            increment: 1,
          },
        },
      })
      console.log('🟢 DM Count Updated:', {
        automationId,
        newCount: result.dmCount
      })
    }
    return result
  } catch (error: any) {
    console.error('🔴 Response Tracking Error:', {
      automationId,
      type,
      error: error.message
    })
    throw error
  }
}

export const createChatHistory = (
  automationId: string,
  sender: string,
  reciever: string,
  message: string
) => {
  console.log('🔵 Creating Chat History:', {
    automationId,
    sender,
    reciever,
    messageLength: message.length
  })

  try {
    const result = client.automation.update({
      where: {
        id: automationId,
      },
      data: {
        dms: {
          create: {
            reciever,
            senderId: sender,
            message,
          },
        },
      },
    })
    console.log('🟢 Chat History Created')
    return result
  } catch (error: any) {
    console.error('🔴 Chat History Creation Error:', {
      automationId,
      error: error.message
    })
    throw error
  }
}

export const getKeywordPost = async (postId: string, automationId: string) => {
  return await client.post.findFirst({
    where: {
      AND: [{ postid: postId }, { automationId }],
    },
    select: { automationId: true },
  })
}

export const getChatHistory = async (sender: string, reciever: string) => {
  console.log('🔵 Fetching Chat History:', {
    sender,
    reciever
  })

  try {
    const history = await client.dms.findMany({
      where: {
        AND: [{ senderId: sender }, { reciever }],
      },
      orderBy: { createdAt: 'asc' },
    })

    console.log('🔵 Chat History Found:', {
      messageCount: history.length,
      timespan: history.length > 0 ? {
        first: history[0].createdAt,
        last: history[history.length - 1].createdAt
      } : null
    })

    const chatSession: {
      role: 'assistant' | 'user'
      content: string
    }[] = history.map((chat) => {
      return {
        role: chat.reciever ? 'assistant' : 'user',
        content: chat.message!,
      }
    })

    const result = {
      history: chatSession,
      automationId: history[history.length - 1]?.automationId,
    }

    console.log('🟢 Chat History Processed:', {
      messageCount: chatSession.length,
      hasAutomationId: !!result.automationId
    })

    return result
  } catch (error: any) {
    console.error('🔴 Chat History Retrieval Error:', {
      sender,
      reciever,
      error: error.message
    })
    throw error
  }
}
