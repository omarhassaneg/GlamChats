import React from 'react'
import Loader from '../loader'

type Props = {
  message: string
}

const LoaderScreen = ({ message }: Props) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader state={true}>
          <></>
        </Loader>
        <p className="text-lg text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

export default LoaderScreen