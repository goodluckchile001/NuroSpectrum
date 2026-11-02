import { TONES } from '@/lib/site'

const ROWS = [
  [8, 3, 14, 5, 9],
  [4, 12, 6, 10, 3],
  [11, 5, 8, 4, 13],
  [6, 9, 3, 12, 7],
]

/** Decorative woven bands of the four brand colours. */
export function Weave() {
  return (
    <div className="weave" aria-hidden="true">
      {ROWS.map((row, i) => {
        const total = row.reduce((a, b) => a + b, 0)
        let t = 0
        const stops = row.map((n, j) => {
          const from = (t / total) * 100
          t += n
          return `var(--${TONES[(i + j) % 4]}) ${from}% ${(t / total) * 100}%`
        })
        return <div key={i} style={{ background: `linear-gradient(90deg,${stops.join(',')})` }} />
      })}
    </div>
  )
}
