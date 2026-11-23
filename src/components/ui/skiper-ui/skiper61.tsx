import type { PointerEvent, ReactNode } from 'react'
import { m, useSpring } from 'framer-motion'

// SpringMouseFollow, adapted from Skiper UI (https://skiper-ui.com/v1/skiper61).
const spring = { mass: 0.1, damping: 10, stiffness: 131 }
const interactive = '(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)'

export function CampusMouseFollow({ children }: { children: ReactNode }) {
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)
  const opacity = useSpring(0, spring)

  function track(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || !matchMedia(interactive).matches) {
      opacity.jump(0)
      return
    }
    const bounds = event.currentTarget.getBoundingClientRect()
    const left = event.clientX - bounds.left
    const top = event.clientY - bounds.top
    if (event.type === 'pointerenter') {
      x.jump(left)
      y.jump(top)
    } else {
      x.set(left)
      y.set(top)
    }
    opacity.set(1)
  }
  return <div className="arch-frame" onPointerEnter={track} onPointerMove={track}
    onPointerLeave={() => opacity.set(0)} onPointerCancel={() => opacity.jump(0)}>
    {children}
    <m.span className="campus-follower" aria-hidden="true" style={{ x, y, opacity }} />
  </div>
}
