'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface VoiceButtonProps {
  onResult: (transcript: string) => void
  disabled?: boolean
}

export default function VoiceButton({ onResult, disabled }: VoiceButtonProps) {
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const transcriptRef = useRef('')

  useEffect(() => {
    setSupported(
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    )
  }, [])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    setListening(false)
    // Send accumulated transcript
    if (transcriptRef.current.trim()) {
      onResult(transcriptRef.current.trim())
      transcriptRef.current = ''
    }
  }, [onResult])

  const start = useCallback(() => {
    if (!supported) {
      alert('Tu navegador no soporta reconocimiento de voz. Prueba con Chrome.')
      return
    }

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognitionClass()
    recognition.lang = document.documentElement.lang || 'es'
    recognition.continuous = true
    recognition.interimResults = true

    transcriptRef.current = ''

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let final = ''
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript + ' '
        }
      }
      if (final) {
        transcriptRef.current = final.trim()
      }
    }

    recognition.onerror = () => {
      setListening(false)
    }

    recognition.onend = () => {
      // Only auto-send if still in listening mode (user didn't manually stop)
      if (listening && transcriptRef.current.trim()) {
        onResult(transcriptRef.current.trim())
        transcriptRef.current = ''
      }
      setListening(false)
    }

    recognitionRef.current = recognition
    try {
      recognition.start()
      setListening(true)
    } catch {
      setListening(false)
      alert('No se pudo iniciar el reconocimiento de voz.')
    }
  }, [supported, onResult, listening])

  const toggle = useCallback(() => {
    if (listening) {
      stop()
    } else {
      start()
    }
  }, [listening, stop, start])

  if (!supported) return null

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
      title={listening ? 'Parar y enviar' : 'Hablar'}
    >
      {listening ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      )}
    </button>
  )
}
