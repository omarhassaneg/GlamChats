'use client'

import { cn } from '@/lib/utils'

interface MessageProps {
  type: 'user' | 'bot'
  text: string
}

const Message = ({ type, text }: MessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300",
        type === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {type === 'bot' && (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
      )}
      <div 
        className={cn(
          "rounded-2xl px-4 py-2 max-w-[80%]",
          type === 'user' 
            ? 'bg-[#3352CC] text-white' 
            : 'bg-[#222222] text-neutral-200'
        )}
      >
        <p className="text-sm">{text}</p>
      </div>
    </div>
  )
}

export default Message