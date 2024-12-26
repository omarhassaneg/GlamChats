'use client'

import { Button } from '@/components/ui/button'
import GradientButton from '@/components/global/gradient-button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn, getMonth } from '@/lib/utils' 
import { usePaths } from '@/hooks/user-nav'
import { Trash2, X } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { useQueryAutomations } from '@/hooks/user-queries'
import CreateAutomation from '../create-automation'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import DeleteAutomation from '../delete-automation'
import { Automation } from '@/types/automation'

type Props = {}

interface AutomationResponse {
  status: number
  data: Automation[]
}

const AutomationList = (props: Props) => {
  const { data } = useQueryAutomations()
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedAutomations, setSelectedAutomations] = useState<string[]>([])

  const { latestVariable } = useMutationDataState(['create-automation'])
  const { pathname } = usePaths()
  
  const optimisticUiData = useMemo<AutomationResponse>(() => {
    if ((latestVariable && latestVariable?.variables && data)) {
      return { 
        status: data.status,
        data: [latestVariable.variables as Automation, ...data.data]
      }
    }
    return data || { status: 200, data: [] }
  }, [latestVariable, data])

  const toggleSelect = (id: string) => {
    setSelectedAutomations(prev => 
      prev.includes(id) 
        ? prev.filter(automationId => automationId !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedAutomations(optimisticUiData.data.map(automation => automation.id))
  }

  const cancelSelection = () => {
    setIsSelecting(false)
    setSelectedAutomations([])
  }
  if (!optimisticUiData || optimisticUiData.status !== 200 || optimisticUiData.data.length <= 0) {
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
        <h3 className="text-lg text-gray-400">No Automations</h3>
        <CreateAutomation />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-3 relative">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-background z-10 py-4 gap-4">
        <CreateAutomation />
        <Button
          variant="outline"
          onClick={() => setIsSelecting(true)}
          className={cn("hover:bg-primary/10", isSelecting && "hidden")}
        >
          Select
        </Button>
        
        {isSelecting && (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={selectAll}
              className="hover:bg-primary/10"
            >
              Select All
            </Button>
            <Button 
              variant="destructive"
              className={cn(
                "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors", 
                selectedAutomations.length === 0 && "hidden"
              )}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected
            </Button>
            <Button 
              variant="ghost" 
              onClick={cancelSelection}
              className="hover:bg-primary/10"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>
      {optimisticUiData.data.map((automation: Automation) => (
        <div key={automation.id} className="relative group">
          {isSelecting && (
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-10">
              <Checkbox
                checked={selectedAutomations.includes(automation.id)}
                onCheckedChange={() => toggleSelect(automation.id)}
                className="h-5 w-5 border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
            </div>
          )}
          <Link
            href={`${pathname}/${automation.id}`}
            className={cn(
              "bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454] relative",
              isSelecting && "ml-6"
            )}
          >
            <div className="flex flex-col flex-1 items-start">
              <h2 className="text-xl font-semibold">{automation.name}</h2>
              <p className="text-[#9B9CA0] text-sm font-light mb-2">
                This is from the comment
              </p>

              {automation.keywords.length > 0 ? (
                <div className="flex gap-x-2 flex-wrap mt-3">
                  {automation.keywords.map((keyword, index: number) => (
                    <div
                      key={keyword.id}
                      className={cn(
                        'rounded-full px-4 py-1 capitalize',
                        (index + 1) % 1 === 0 &&
                          'bg-keyword-green/15 border-2 border-keyword-green',
                        (index + 1) % 2 === 0 &&
                          'bg-keyword-purple/15 border-2 border-keyword-purple',
                        (index + 1) % 3 === 0 &&
                          'bg-keyword-yellow/15 border-2 border-keyword-yellow',
                        (index + 1) % 4 === 0 &&
                          'bg-keyword-red/15 border-2 border-keyword-red'
                      )}
                    >
                      {keyword.word}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
                  <p className="text-sm text-[#bfc0c3]">No Keywords</p>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between">
              <p className="capitalize text-sm font-light text-[#9B9CA0]">
                {getMonth(new Date(automation.createdAt).getUTCMonth() + 1)}{' '}
                {new Date(automation.createdAt).getUTCDate() === 1
                  ? `${new Date(automation.createdAt).getUTCDate()}st`
                  : `${new Date(automation.createdAt).getUTCDate()}th`}{' '}
                {new Date(automation.createdAt).getUTCFullYear()}
              </p>

              {automation.listener?.listener === 'SMARTAI' ? (
                <GradientButton
                  type="BUTTON"
                  className="w-full bg-background-80 text-white hover:bg-background-80 rounded-xl"
                >
                  Smart AI
                </GradientButton>
              ) : (
                <Button className="bg-background-80 hover:bg-background-80/80 text-white transition-colors">
                  Standard
                </Button>
              )}
            </div>
          </Link>
          {!isSelecting && (
            <div className="absolute -right-3 -top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <DeleteAutomation automationId={automation.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AutomationList
