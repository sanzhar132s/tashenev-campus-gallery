import type { CSSProperties } from 'react'

// TextRoll, adapted from Skiper UI (https://skiper-ui.com/v1/skiper58).
export function TextRoll({ children }: { children: string }) {
  return <>
    <span className="sr-only">{children}</span>
    <span className="text-roll" aria-hidden="true">
      {Array.from(children, (letter, i) =>
        <span key={i} className="roll-letter" data-letter={letter}
          style={{ '--delay': `${i * 15}ms` } as CSSProperties}>{letter}</span>
      )}
    </span>
  </>
}
