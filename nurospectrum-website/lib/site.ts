import type { CSSProperties } from 'react'
import type { Tone } from '@/lib/api'

export const CREATIVE_DRIVE_URL =
  'https://drive.google.com/drive/folders/1e9xIfKWAfFcFmXlwqIvuq63I_8Vshlqx?usp=sharing'

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ha', label: 'Hausa' },
  { code: 'yo', label: 'Yorùbá' },
  { code: 'ig', label: 'Igbo' },
] as const

export const TONES: Tone[] = ['green', 'indigo', 'gold', 'rose']

/** Sets the --c custom property used by .path, .post, .res, .ev, .note. */
export const cv = (tone: Tone) => ({ '--c': `var(--${tone})` }) as CSSProperties

export type Resource = { t: string; by: string; n: string; u?: string }
