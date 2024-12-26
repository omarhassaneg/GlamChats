 ``                                                                                                                                                                                                                                                                                                                                                                                                                                                               export type LISTENERS = 'SMARTAI' | 'MESSAGE'

export interface Keyword {
  id: string
  word: string
  automationId: string | null
}

export interface Listener {
  id: string
  automationId: string
  listener: LISTENERS
  prompt: string
  commentReply: string | null
  dmCount: number
  commentCount: number
}

export interface Automation {
  id: string
  name: string
  createdAt: Date | string
  active: boolean
  keywords: {
    id: string
    automationId: string | null
    word: string
  }[]
  listener: {
    id: string
    automationId: string
    listener: LISTENERS
    prompt: string
    commentReply: string | null
    dmCount: number
    commentCount: number
  } | null
  userId?: string
}