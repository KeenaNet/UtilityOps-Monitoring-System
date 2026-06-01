import * as React from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function TimePicker({ value = "08:00", onChange }: { value?: string, onChange?: (val: string) => void }) {
  const [hour, setHour] = React.useState(value.split(':')[0] || "08")
  const [minute, setMinute] = React.useState(value.split(':')[1] || "00")
  const [focusSegment, setFocusSegment] = React.useState<'hour' | 'minute'>('hour')
  const [isOpen, setIsOpen] = React.useState(false)

  const hourRef = React.useRef<HTMLInputElement>(null)
  const minuteRef = React.useRef<HTMLInputElement>(null)

  const notifyChange = (h: string, m: string) => {
    if (onChange) onChange(`${h}:${m}`)
  }

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.length > 2) val = val.slice(-2)
    
    if (val.length === 2) {
      let num = parseInt(val)
      if (num > 23) val = "23"
      setHour(val)
      minuteRef.current?.focus()
      notifyChange(val, minute)
    } else {
      setHour(val)
    }
  }

  const handleHourBlur = () => {
    let num = parseInt(hour || "0")
    if (isNaN(num)) num = 0
    if (num > 23) num = 23
    const newHour = num.toString().padStart(2, '0')
    setHour(newHour)
    notifyChange(newHour, minute)
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.length > 2) val = val.slice(-2)
    setMinute(val)
    if (val.length === 2) {
      notifyChange(hour, val)
    }
  }

  const handleMinuteBlur = () => {
    let num = parseInt(minute || "0")
    if (isNaN(num)) num = 0
    if (num > 59) num = 59
    const newMinute = num.toString().padStart(2, '0')
    setMinute(newMinute)
    notifyChange(hour, newMinute)
  }

  const increment = () => {
    if (focusSegment === 'hour') {
      let num = (parseInt(hour) + 1) % 24
      const h = num.toString().padStart(2, '0')
      setHour(h)
      notifyChange(h, minute)
    } else {
      let num = (parseInt(minute) + 1) % 60
      const m = num.toString().padStart(2, '0')
      setMinute(m)
      notifyChange(hour, m)
    }
  }

  const decrement = () => {
    if (focusSegment === 'hour') {
      let num = (parseInt(hour) - 1 + 24) % 24
      const h = num.toString().padStart(2, '0')
      setHour(h)
      notifyChange(h, minute)
    } else {
      let num = (parseInt(minute) - 1 + 60) % 60
      const m = num.toString().padStart(2, '0')
      setMinute(m)
      notifyChange(hour, m)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, segment: 'hour' | 'minute') => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      increment()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      decrement()
    } else if (e.key === 'ArrowRight' && segment === 'hour') {
      if (hourRef.current?.selectionStart === hour.length) {
        minuteRef.current?.focus()
      }
    } else if (e.key === 'ArrowLeft' && segment === 'minute') {
      if (minuteRef.current?.selectionStart === 0) {
        hourRef.current?.focus()
      }
    }
  }

  const hoursList = Array.from({ length: 24 }).map((_, i) => i.toString().padStart(2, '0'))
  const minutesList = Array.from({ length: 60 }).map((_, i) => i.toString().padStart(2, '0'))

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div 
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent cursor-text",
            isOpen ? "ring-2 ring-primary/50 ring-offset-2 ring-offset-background" : "focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 focus-within:ring-offset-background"
          )}
          onClick={(e) => {
            if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).tagName === 'path') {
              setIsOpen(true)
            }
          }}
        >
          <div className="flex items-center gap-2 flex-1 pl-1">
            <input
              ref={hourRef}
              type="text"
              value={hour}
              onChange={handleHourChange}
              onBlur={handleHourBlur}
              onKeyDown={(e) => handleKeyDown(e, 'hour')}
              onFocus={() => setFocusSegment('hour')}
              className="w-6 bg-transparent text-center focus:outline-none selection:bg-primary/50 text-foreground"
              maxLength={2}
            />
            <span className="text-muted-foreground font-bold pb-0.5 select-none">:</span>
            <input
              ref={minuteRef}
              type="text"
              value={minute}
              onChange={handleMinuteChange}
              onBlur={handleMinuteBlur}
              onKeyDown={(e) => handleKeyDown(e, 'minute')}
              onFocus={() => setFocusSegment('minute')}
              className="w-6 bg-transparent text-center focus:outline-none selection:bg-primary/50 text-foreground"
              maxLength={2}
            />
          </div>

          <div className="flex flex-col items-center justify-center -space-y-1 ml-2 select-none">
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); increment() }} 
              className="text-muted-foreground hover:text-foreground p-0.5 transition-colors focus:outline-none"
            >
              <ChevronUp className="h-3 w-3" />
            </button>
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); decrement() }} 
              className="text-muted-foreground hover:text-foreground p-0.5 transition-colors focus:outline-none"
            >
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-auto p-0 glass-card border-border" 
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex h-64 w-[160px]">
          <div className="flex-1 overflow-y-auto border-r border-border p-1 custom-scrollbar" id="hour-scroll">
            {hoursList.map(h => (
              <div 
                key={h}
                className={cn(
                  "px-4 py-2 text-sm text-center rounded-sm cursor-pointer hover:bg-accent transition-colors",
                  h === hour ? "bg-primary/20 text-primary font-bold" : "text-muted-foreground"
                )}
                onClick={() => {
                  setHour(h)
                  setFocusSegment('minute')
                  minuteRef.current?.focus()
                }}
              >
                {h}
              </div>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-1 custom-scrollbar" id="minute-scroll">
            {minutesList.map(m => (
              <div 
                key={m}
                className={cn(
                  "px-4 py-2 text-sm text-center rounded-sm cursor-pointer hover:bg-accent transition-colors",
                  m === minute ? "bg-primary/20 text-primary font-bold" : "text-muted-foreground"
                )}
                onClick={() => {
                  setMinute(m)
                  notifyChange(hour, m)
                  setIsOpen(false)
                }}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
