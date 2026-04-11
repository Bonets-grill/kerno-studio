import Anthropic from '@anthropic-ai/sdk'
import Groq from 'groq-sdk'

export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})
