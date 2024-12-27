export interface Keyword {
  id: string
  word: string
  automationId: string | null
}

export interface Listener {
  id: string
  automationId: striyng
  listener: 'MESSAGE' | 'SMARTAI'
  prompt: string
  commentReply: string | null
  dmCount: number
  commentCount: number
}

export interface Trigger {
  id: string
  type: string
  automationId: string | null
}

export interface TestMessage {
  id: string
  content: string
  isUserMessage: boolean
  createdAt: string
  automationId: string | null
}

export interface Automation {
  id: string
  name: string
  createdAt: string
  active: boolean
  userId: string | null
  trigger: Trigger[]
  listener: Listener | null
  keywords: Keyword[]
  testMessages: TestMessage[]
}