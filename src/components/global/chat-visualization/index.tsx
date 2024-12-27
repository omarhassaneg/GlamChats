'use client'

import { useEffect, useState, useRef } from 'react'
import Header from './header'
import Message from './message'
import { messages } from './messages'

const ChatVisualization = () => {
  const [visibleMessages, setVisibleMessages] = useState<typeof messages>([])
  const animationRef = useRef<NodeJS.Timeout>()
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    const showMessages = async () => {
      if (isAnimatingRef.current) return
      isAnimatingRef.current = true
      
      setVisibleMessages([])
      
      for (const message of messages) {
        if (!isAnimatingRef.current) break
        await new Promise(resolve => setTimeout(resolve, message.delay || 0))
        setVisibleMessages(prev => [...prev, message])
      }

      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }

      animationRef.current = setTimeout(() => {
        isAnimatingRef.current = false
        showMessages()
      }, 5000)
    }

    showMessages()

    return () => {
      isAnimatingRef.current = false
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="relative mx-auto w-[300px] h-[600px] overflow-hidden flex-shrink-0">
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-[#222] rounded-[3rem] shadow-xl">
        {/* Phone Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
          <div className="w-40 h-6 bg-black rounded-b-2xl" />
        </div>
      </div>
      
      {/* Chat Interface */}
      <div className="absolute inset-2 bg-[#111111] rounded-[2.5rem] overflow-hidden flex flex-col">
        <Header />
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-4 overflow-y-auto scrollbar-none">
            <div className="flex flex-col gap-4">
              {visibleMessages.map((message, index) => (
                <Message
                  key={`${message.type}-${message.text}-${index}`}
                  type={message.type}
                  text={message.text}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatVisualization