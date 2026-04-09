'use client'

import { useEffect } from 'react'

interface SalesAgentProps {
  agentId: string
}

export default function SalesAgent({ agentId }: SalesAgentProps) {
  useEffect(() => {
    // Inject script into head (only once)
    if (!document.querySelector('script[data-el-convai]')) {
      const script = document.createElement('script')
      script.src = 'https://elevenlabs.io/convai-widget/index.js'
      script.async = true
      script.type = 'text/javascript'
      script.setAttribute('data-el-convai', '1')
      document.head.appendChild(script)
    }

    // Inject widget into body (only once)
    if (!document.querySelector('elevenlabs-convai')) {
      const widget = document.createElement('elevenlabs-convai')
      widget.setAttribute('agent-id', agentId)
      widget.setAttribute('style', 'position:fixed;bottom:20px;right:20px;z-index:9999')
      document.body.appendChild(widget)
    }
  }, [agentId])

  return null
}
