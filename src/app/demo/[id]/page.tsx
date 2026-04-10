import { getDemo } from '@/lib/demo-store'

export default async function DemoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const demo = getDemo(id)

  if (!demo) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#0a0a0f',
          color: '#fff',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Demo no encontrado
          </h1>
          <p style={{ color: '#888' }}>Este link ha expirado o no existe.</p>
          <a
            href="https://kerno-studio.vercel.app"
            style={{
              color: '#00f0ff',
              marginTop: '1rem',
              display: 'inline-block',
            }}
          >
            &larr; Volver a Kerno Studio
          </a>
        </div>
      </div>
    )
  }

  return (
    <html>
      <head>
        <title>{demo.name} — Demo | Kerno Studio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <iframe
          srcDoc={demo.html}
          style={{ width: '100vw', height: '100vh', border: 'none' }}
          sandbox="allow-scripts allow-same-origin"
          title={demo.name}
        />
      </body>
    </html>
  )
}
