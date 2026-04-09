import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return Response.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return Response.json({ error: 'Webhook signature failed' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { projectId, type } = session.metadata || {}

    if (projectId && type) {
      // TODO: Update payment record in Supabase
      // await supabase.from('payments').update({ paid: true }).eq('project_id', projectId).eq('type', type)
      console.log(`Payment confirmed: project=${projectId}, type=${type}, amount=${session.amount_total}`)
    }
  }

  return Response.json({ received: true })
}
