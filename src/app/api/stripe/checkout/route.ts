import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const { projectName, amount, type, projectId, customerEmail } = await req.json() as {
    projectName: string
    amount: number // in cents
    type: 'deposit' | 'final'
    projectId: string
    customerEmail: string
  }

  const label = type === 'deposit'
    ? `${projectName} — Depósito 50%`
    : `${projectName} — Pago final 50%`

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: label,
            description: `Desarrollo: ${projectName}`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
    metadata: {
      projectId,
      type,
      projectName,
    },
  })

  return Response.json({ url: session.url })
}
