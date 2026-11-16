import { Loader2 as Spinner } from "lucide-react"

export function SpinnerDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
        <div className="flex shrink-0 items-center">
          <Spinner className="size-4 animate-spin" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="line-clamp-1 font-medium">Processing payment...</div>
        </div>
        <div className="flex flex-none justify-end">
          <span className="text-sm tabular-nums">$100.00</span>
        </div>
      </div>
    </div>
  )
}
export { Spinner }

