import axios from 'axios'

export const refreshToken = async (token: string) => {
  console.log('🔵 Instagram Token Refresh Attempt:', {
    tokenLength: token.length
  })
  
  try {
    const refresh_token = await axios.get(
      `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    )
    
    console.log('🟢 Instagram Token Refresh Success:', {
      status: refresh_token.status,
      expires_in: refresh_token.data.expires_in,
      token_type: refresh_token.data.token_type
    })
    
    return refresh_token.data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('🔴 Instagram Token Refresh Error:', {
        error: error.response?.data || error.message,
        status: error.response?.status
      })
    } else {
      console.error('🔴 Instagram Token Refresh Unknown Error:', error)
    }
    throw error
  }
}

export const sendDM = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log('🔵 Instagram DM Attempt:', {
    userId,
    recieverId,
    prompt,
    tokenLength: token.length
  })
  try {
    const response = await axios.post(
      `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
      {
        recipient: {
          id: recieverId,
        },
        message: {
          text: prompt,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    console.log('🟢 Instagram DM Success:', {
      status: response.status,
      data: response.data
    })
    return response
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('🔴 Instagram DM Error:', {
        error: error.response?.data || error.message,
        status: error.response?.status
      })
    } else {
      console.error('🔴 Instagram DM Unknown Error:', error)
    }
    throw error
  }
}

export const sendPrivateMessage = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log('🔵 Instagram Comment Response Attempt:', {
    userId,
    commentId: recieverId,
    prompt,
    tokenLength: token.length
  })
  
  try {
    const response = await axios.post(
      `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
      {
        recipient: {
          comment_id: recieverId,
        },
        message: {
          text: prompt,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    console.log('🟢 Instagram Comment Response Success:', {
      status: response.status,
      data: response.data
    })
    return response
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('🔴 Instagram Comment Response Error:', {
        error: error.response?.data || error.message,
        status: error.response?.status,
        endpoint: `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`
      })
    } else {
      console.error('🔴 Instagram Comment Response Unknown Error:', error)
    }
    throw error
  }
}


export const generateTokens = async (code: string) => {
  try {
    console.log('🔵 Instagram Token Generation Start:', { code: code.substring(0, 10) + '...' })
    
    const insta_form = new FormData()
    insta_form.append('client_id', process.env.INSTAGRAM_CLIENT_ID as string)
    insta_form.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET as string)
    insta_form.append('grant_type', 'authorization_code')
    insta_form.append('redirect_uri', `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`)
    insta_form.append('code', code)

    console.log('🔵 Instagram Short Token Request:', {
      url: process.env.INSTAGRAM_TOKEN_URL,
      redirect_uri: `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
    })

    const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
      method: 'POST',
      body: insta_form,
    })

    const token = await shortTokenRes.json()
    console.log('🔵 Instagram Short Token Response:', {
      status: shortTokenRes.status,
      hasPermissions: token.permissions?.length > 0,
      permissions: token.permissions
    })

    if (token.permissions?.length > 0) {
      console.log('🔵 Instagram Long Token Request Start')
      const long_token = await axios.get(
        `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
      )
      console.log('🟢 Instagram Long Token Success:', {
        status: long_token.status,
        expires_in: long_token.data.expires_in
      })
      return long_token.data
    } else {
      console.error('🔴 Instagram Token Error: No permissions granted')
      return null
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('🔴 Instagram Token Error:', {
        error: error.response?.data || error.message,
        status: error.response?.status
      })
    } else {
      console.error('🔴 Instagram Token Unknown Error:', error)
    }
    throw error
  }
}
