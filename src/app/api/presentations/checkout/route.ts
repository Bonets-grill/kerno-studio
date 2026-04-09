import { stripe } from '@/lib/stripe'
import { calculateSessionPrice } from '@/lib/cost-tracker'
import { getSession } from '@/lib/presentation-sessions'

export async function POST(req: Request) {
  const { sessionId, customerEmail } = await req.json() as {
    sessionId: string
    customerEmail: string
  }

  const session = getSession(sessionId)
  if (!session) {
    return Response.json({ error: 'Session not found' }, { status: 404 })
  }

  if (!session.html) {
    return Response.json({ error: 'Presentation not generated yet' }, { status: 400 })
  }

  const price = calculateSessionPrice(sessionId)

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Presentación: ${session.brief?.title || 'Presentación AI'}`,
            description: 'Presentación interactiva premium generada con IA',
          },
          unit_amount: price.priceCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/presentations/success?session_id={CHECKOUT_SESSION_ID}&pres_id=${sessionId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/presentations?cancelled=true`,
    metadata: {
      presentationSessionId: sessionId,
      type: 'presentation',
      costUsd: String(price.costUsd),
      priceUsd: String(price.priceUsd),
    },
  })

  return Response.json({
    url: stripeSession.url,
    costUsd: price.costUsd,
    priceUsd: price.priceUsd,
    priceCents: price.priceCents,
  })
}
