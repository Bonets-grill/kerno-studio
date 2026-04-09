'use client'

import { useEffect } from 'react'

interface SalesAgentProps {
  agentId: string
}

export default function SalesAgent({ agentId }: SalesAgentProps) {
  useEffect(() => {
    // Don't load twice
    if (document.querySelector('elevenlabs-convai')) return

    // Load script
    const script = document.createElement('script')
    script.src = 'https://elevenlabs.io/convai-widget/index.js'
    script.async = true
    document.head.appendChild(script)

    // Create widget element
    const widget = document.createElement('elevenlabs-convai')
    widget.setAttribute('agent-id', agentId)
    document.body.appendChild(widget)

    return () => {
      widget.remove()
    }
  }, [agentId])

  return null
}
