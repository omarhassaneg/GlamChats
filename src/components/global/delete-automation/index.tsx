'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Loader from '../loader'
import { useDeleteAutomation } from '@/hooks/use-automations' 
import { Trash2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

type Props = {
  automationId: string
}

const DeleteAutomation = ({ automationId }: Props) => {
  const queryClient = useQueryClient()
  const { isPending, mutate } = useDeleteAutomation()

  const handleDelete = async () => {
    queryClient.setQueryData(['user-automations'], (old: any) => ({
      ...old,
      data: old?.data?.filter((automation: any) => automation.id !== automationId) || []
    }))

    await mutate({ id: automationId }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user-automations'] })
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-red-500/10 hover:text-red-500"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your automation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            <Loader state={isPending}>
              {isPending ? 'Deleting...' : 'Delete'}
            </Loader>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAutomation