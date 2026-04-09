'use client'

import { useState, useRef, useCallback } from 'react'

interface VoiceButtonProps {
  onResult: (transcript: string) => void
  disabled?: boolean
}

export default function VoiceButton({ onResult, disabled }: VoiceButtonProps) {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const toggle = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz.')
      return
    }

    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = document.documentElement.lang || 'es'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
      setListening(false)
    }

    recognition.onerror = () => {
      setListening(false)
    }

    recognition.onend = () => {
      setListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }, [listening, onResult])

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled}
      className={`px-3 py-3 rounded-xl border transition-all disabled:opacity-50 ${
        listening
          ? 'border-red-500 bg-red-500/10 text-red-400 animate-pulse'
          : 'border-border hover:border-neon-cyan/50 text-muted hover:text-foreground'
      }`}
      title={listening ? 'Detener' : 'Hablar'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    </button>
  )
}
