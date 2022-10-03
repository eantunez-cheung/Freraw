import express, { Request, Response, NextFunction } from "express";
import env from "dotenv";
import Stripe from "stripe";
import bodyParser from "body-parser";
import cors from "cors";

env.config({ path: './.env' })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-08-01",
    typescript: true
})

const app = express()
app.use(
    (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        if (req.originalUrl === "/webhook") {
            next()
        } else {
            bodyParser.json()(req, res, next)
        }
    }
)
app.use(cors({
    origin: 'http://127.0.0.1:8000'
}))

app.get('/', (_: Request, res: Response): void => {
    res.send("Stripe API")
})

app.get('/config', (_: Request, res: Response): void => {
    res.send({
        publishableKey: process.env.STRIPE_KEY
    })
})

app.post("/create-payment-intent", async (req: Request, res: Response): Promise<void> => {
    const { currency, amount, paymentMethodType, paymentMethodOptions }:
        { currency: string, amount: number, paymentMethodType: string, paymentMethodOptions?: object } = req.body

    const params: Stripe.PaymentIntentCreateParams = {
        amount,
        currency,
        payment_method_types: [paymentMethodType]
    }

    if (paymentMethodType === "acss_debit") {
        params.payment_method_options = {
            acss_debit: {
                mandate_options: {
                    payment_schedule: "sporadic",
                    transaction_type: 'personal'
                }
            }
        }
    } else if (paymentMethodType === "customer_balance") {
        params.payment_method_data = {
            type: 'customer_balance'
        } as any
        params.confirm = true
        params.customer = req.body.customerId || await stripe.customers.create().then(data => data.id)
    }
    if (paymentMethodOptions) {
        params.payment_method_options = paymentMethodOptions
    }

    try {
        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
            params
        )
        res.send({
            clientSecret: paymentIntent.client_secret,
            nextAction: paymentIntent.next_action
        })
    } catch (e) {
        res.status(400).send({
            error: {
                message: e,
            }

        })
    }
})

app.post("/webhook", bodyParser.raw({ type: 'application/json' }), async (req: Request, res: Response): Promise<void> => {
    let event: Stripe.Event
    const sig = req.headers['stripe-signature'] as string | string[]

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET as string
        )
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`)
        console.log(err)
        res.sendStatus(400)
        return
    }

    const data: Stripe.Event.Data = event.data
    const eventType: string = event.type
    let pi: Stripe.PaymentIntent

    switch (eventType) {
        case 'payment_intent.succeeded':
            pi = data.object as Stripe.PaymentIntent
            console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
            console.log("💰 Payment captured!");
            break;
        case 'payment_intent.payment_failed':
            pi = data.object as Stripe.PaymentIntent
            console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
            console.log("❌ Payment failed.");
            break;

        default:
            break;
    }
    res.sendStatus(200)
})


app.listen(4242, (): void => {
    console.log('listening to port 4242')
})