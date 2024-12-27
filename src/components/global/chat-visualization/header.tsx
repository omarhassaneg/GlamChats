'use client'

const Header = () => {
  return (
    <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
      <div>
        <p className="text-sm font-medium text-white">Fashion_Boutique</p>
        <p className="text-xs text-neutral-400">Active now</p>
      </div>
    </div>
  )
}

export default Header