'use client'

import { useEffect, useRef } from 'react'
import { useI18n } from '@/lib/i18n/context'

interface SalesAgentProps {
  agentId: string
}

export default function SalesAgent({ agentId }: SalesAgentProps) {
  const { lang } = useI18n()
  const injectedRef = useRef(false)

  useEffect(() => {
    if (injectedRef.current) return
    injectedRef.current = true

    // Load script
    if (!document.querySelector('script[data-el-convai]')) {
      const script = document.createElement('script')
      script.src = 'https://elevenlabs.io/convai-widget/index.js'
      script.async = true
      script.type = 'text/javascript'
      script.setAttribute('data-el-convai', '1')
      document.head.appendChild(script)
    }

    // Create widget
    if (!document.querySelector('elevenlabs-convai')) {
      const widget = document.createElement('elevenlabs-convai')
      widget.setAttribute('agent-id', agentId)
      widget.setAttribute('style', 'position:fixed;bottom:20px;right:20px;z-index:9999')

      // Listen for client tool calls from the widget
      widget.addEventListener('elevenlabs-convai:call', ((e: CustomEvent) => {
        const { tool_name, parameters } = e.detail || {}
        if (tool_name === 'send_to_chat' && parameters?.project_summary) {
          sendToChat(parameters.project_summary)
        }
      }) as EventListener)

      document.body.appendChild(widget)
    }

    // Also listen on window for the event (some widget versions use window)
    const handleToolCall = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail?.tool_name === 'send_to_chat' && detail?.parameters?.project_summary) {
        sendToChat(detail.parameters.project_summary)
      }
    }
    window.addEventListener('elevenlabs-convai:call', handleToolCall)

    return () => {
      window.removeEventListener('elevenlabs-convai:call', handleToolCall)
    }
  }, [agentId, lang])

  return null
}

function sendToChat(projectSummary: string) {
  // Scroll to chat section
  const chatSection = document.getElementById('chat')
  if (chatSection) {
    chatSection.scrollIntoView({ behavior: 'smooth' })
  }

  // Dispatch custom event that ChatWidget listens for
  window.dispatchEvent(
    new CustomEvent('kerno:agent-summary', {
      detail: { message: projectSummary },
    })
  )
}
