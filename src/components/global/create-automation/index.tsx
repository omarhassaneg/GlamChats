'use client'

import { Button } from '@/components/ui/button'
import React, { useMemo } from 'react'
import Loader from '../loader'
import { AutomationDuoToneWhite } from '@/icons'
import { useCreateAutomation } from '@/hooks/use-automations'
import { v4 } from 'uuid'
import { useRouter, useParams } from 'next/navigation'

type Props = {}

const CreateAutomation = (props: Props) => {
  const mutationId = useMemo(() => v4(), [])

  console.log(mutationId)
  const { isPending, mutate } = useCreateAutomation(mutationId)
  const router = useRouter()
  const { username } = useParams() as { username: string }

  const handleCreate = async () => {
    const result = await mutate({
      name: 'Untitled',
      id: mutationId,
      createdAt: new Date(),
      keywords: [],
    })
    
    if (result?.status === 200) {
      router.push(`/dashboard/${username}/automations/${mutationId}`)
    }
  }

  return (
    <Button
      className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
      onClick={handleCreate}
    >
      <Loader state={isPending}>
        {isPending ? (
          <p className="lg:inline hidden">Creating automation...</p>
        ) : (
          <>
            <AutomationDuoToneWhite />
            <p className="lg:inline hidden">Create an Automation</p>
          </>
        )}
      </Loader>
    </Button>
  )
}

export default CreateAutomation
