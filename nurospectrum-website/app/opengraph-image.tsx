import { ImageResponse } from 'next/og'

export const alt = 'Nurospectrum — a Nigeria that works with and for neurodivergent minds'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          color: '#1D1A2F',
          background: 'linear-gradient(135deg, #F5F7F5 0%, #FFFFFF 65%, #F7E7BF 100%)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, fontWeight: 700 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              background: '#0F6B4F',
              boxShadow: '20px 0 0 #3A3FA8, 40px 0 0 #E9B02A, 60px 0 0 #C23A7B',
              marginRight: 65,
            }}
          />
          Nurospectrum
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 1000 }}>
          <div style={{ fontSize: 70, lineHeight: 1.05, fontWeight: 700, letterSpacing: -2 }}>
            A Nigeria that works with and for neurodivergent minds.
          </div>
          <div style={{ fontSize: 30, color: '#55546B' }}>
            Education, community and practical support. Every mind is welcome here.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {['#0F6B4F', '#3A3FA8', '#E9B02A', '#C23A7B'].map((color) => (
            <div key={color} style={{ width: 110, height: 10, borderRadius: 5, background: color }} />
          ))}
        </div>
      </div>
    ),
    size,
  )
}
