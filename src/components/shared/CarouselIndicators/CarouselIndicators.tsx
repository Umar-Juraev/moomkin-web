import React from 'react'
import { type CarouselApi } from "@/components/ui/carousel"
import { cn } from "@/lib/utils" 

interface CarouselIndicatorsProps {
  api: CarouselApi | undefined
  className?: string
}

const CarouselIndicators = ({ api, className }: CarouselIndicatorsProps) => {
   const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap()) 

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div
      className={cn(
        "inline-flex z-10 items-center justify-center gap-[3px] p-2 rounded-full bg-[#0000008C]",
        className
      )}

    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "h-[5px] rounded-full transition-all duration-300",
            current === index ? "w-3 bg-white" : "w-[5px] bg-white/50"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

export default CarouselIndicators