

const Thinkindicator = () => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
      <span>Thinking...</span>
    </div>
  )
}

export default Thinkindicator