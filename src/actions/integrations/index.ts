'use server'

import { redirect } from 'next/navigation'
import { onCurrentUser } from '../user'
import { createIntegration, getIntegration } from './queries'
import { generateTokens } from '@/lib/fetch'
import axios from 'axios'

export const onOAuthInstagram = (strategy: 'INSTAGRAM' | 'CRM') => {
  if (strategy === 'INSTAGRAM') {
    return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
  }
}

export const onIntegrate = async (code: string) => {
  console.log('🔵 Instagram Integration Start:', {
    code: code.substring(0, 10) + '...'
  })
  
  const user = await onCurrentUser()
  console.log('🔵 Current User:', {
    userId: user.id
  })

  try {
    const integration = await getIntegration(user.id)
    console.log('🔵 Existing Integration Check:', {
      hasIntegration: integration !== null,
      integrationCount: integration?.integrations.length
    })

    if (integration && integration.integrations.length === 0) {
      const token = await generateTokens(code)
      console.log('🔵 Generated Tokens:', {
        hasToken: token !== null,
        tokenType: token?.token_type
      })

      if (token) {
        console.log('🔵 Fetching Instagram User ID')
        const insta_id = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
        )
        console.log('🔵 Instagram User ID Retrieved:', {
          instagram_user_id: insta_id.data.user_id
        })

        const today = new Date()
        const expire_date = today.setDate(today.getDate() + 60)
        console.log('🔵 Creating Integration:', {
          expiry: new Date(expire_date)
        })

        const create = await createIntegration(
          user.id,
          token.access_token,
          new Date(expire_date),
          insta_id.data.user_id
        )
        console.log('🟢 Integration Success:', {
          status: 200,
          userId: user.id,
          instagram_user_id: insta_id.data.user_id
        })
        return { status: 200, data: create }
      }
      console.error('🔴 Integration Failed: Invalid Token (401)')
      return { status: 401 }
    }
    console.error('🔴 Integration Failed: Integration Already Exists (404)')
    return { status: 404 }
  } catch (error: any) {
    console.error('🔴 Integration Error (500):', {
      error: error.response?.data || error.message,
      status: error.response?.status
    })
    return { status: 500 }
  }
}
