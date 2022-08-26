import env from 'dotenv';
import path from 'path';


import express from "express";
import Stripe from "stripe";
env.config()

const stripeSK = process.env.STRIPE_SECRET_KEY as string

const stripe = new Stripe(stripeSK, {
    apiVersion: '2022-08-01',
    typescript: true
})

const app = express()
app.use(express.json())

app.get("/config", (_, res): void=> {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
})