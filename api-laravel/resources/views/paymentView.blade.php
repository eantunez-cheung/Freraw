<!DOCTYPE html>
<html>

<head>
    <meta charset="utf8" />
    <title>Stripe payment</title>
    <!-- <link rel="stylesheet" href="css/paymentView.css" /> -->
    <style>
        :root {
            --light-grey: #F6F9FC;
            --dark-terminal-color: #0A2540;
            --accent-color: #635BFF;
            --radius: 3px;
        }

        body {
            padding: 20px;
            font-family: 'Raleway';
            display: flex;
            justify-content: center;
            font-size: 1.2em;
            color: var(--dark-terminal-color);
        }

        main {
            width: 480px;
        }

        form>* {
            margin: 10px 0;
        }

        button {
            background-color: var(--accent-color);
        }

        button {
            background: var(--accent-color);
            border-radius: var(--radius);
            color: white;
            border: 0;
            padding: 12px 16px;
            margin-top: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: block;
        }

        button:hover {
            filter: contrast(115%);
        }

        button:active {
            transform: translateY(0px) scale(0.98);
            filter: brightness(0.9);
        }

        button:disabled {
            opacity: 0.5;
            cursor: none;
        }

        input,
        select {
            display: block;
            font-size: 1.1em;
            width: 100%;
            margin-bottom: 10px;
        }

        label {
            display: block;
        }

        a {
            color: var(--accent-color);
            font-weight: 900;
        }

        small {
            font-size: .6em;
        }

        fieldset,
        input,
        select {
            border: 1px solid #efefef;
        }

        #payment-form {
            border: #F6F9FC solid 1px;
            border-radius: var(--radius);
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 30px 50px -20px rgb(50 50 93 / 25%), 0 30px 60px -30px rgb(0 0 0 / 30%);
        }

        #messages {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New';
            display: none;
            /* hide initially, then show once the first message arrives */
            background-color: #0A253C;
            color: #00D924;
            padding: 20px;
            margin: 20px 0;
            border-radius: var(--radius);
            font-size: 0.7em;
            overflow: scroll;
        }
    </style>
</head>

<body>
    <div id="main">
        <div id="container">
            <div id="panel">
                <form id="payment-form">
                    <label for="name">Nom du titulaire de la carte</label>
                    <input type="text" id="name" />
                    <input type="hidden" value="{{$amount}}" id="amount" />
                    <input type="hidden" value="{{$basketId}}" id="basketId" />
                    <input type="hidden" value="{{$userId}}" id="userId" />
                    <label for="card-element">Card</label>
                    <div id="card-element"></div>
                    <button>Payer {{$amount}}€</button>
                </form>
                <div id="messages" role="alert"></div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="https://js.stripe.com/v3/"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const {
                publishableKey
            } = await fetch('http://127.0.0.1:4242/config').then((r) => r.json());
            if (!publishableKey) {
                addMessage(
                    'No publishable key returned from the server. Please check `.env` and try again'
                );
                alert('Please set your Stripe publishable API key in the .env file');
            }

            const stripe = Stripe(publishableKey)
            var elements = stripe.elements();
            var cardElement = elements.create('card', {
                hidePostalCode: true
            })
            cardElement.mount('#card-element')

            const from = document.querySelector('#payment-form')
            let submitted = false

            from.addEventListener('submit', async (e) => {
                addMessage('Submitting details to the backend')
                e.preventDefault()

                if (submitted) return
                submitted = true
                from.querySelector('button').disabled = true

                const amount = document.querySelector('#amount')
                const basketId = document.querySelector('#basketId')
                const userId = document.querySelector('#userId')
                const {
                    error: backendError,
                    clientSecret
                } = await fetch('http://127.0.0.1:4242/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        paymentMethodType: 'card',
                        currency: 'eur',
                        amount: amount.value * 100
                    })
                }).then(r => r.json())
                if (backendError) {
                    addMessage(backendError.message)
                    submitted = false
                    from.querySelector('button').disabled = false
                    alert(backendError.message)
                    return
                }

                addMessage('PaymentIntent created')

                const nameInput = document.querySelector('#name')
                const {
                    error: stripeError,
                    paymentIntent
                } = await stripe.confirmCardPayment(
                    clientSecret, {
                        payment_method: {
                            card: cardElement,
                            billing_details: {
                                name: nameInput.value,
                            }
                        }
                    }
                )
                if (stripeError) {
                    addMessage(stripeError.message)
                    submitted = false
                    from.querySelector('button').disabled = false
                    alert(stripeError.message)
                    return
                }

                addMessage(`PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`)
                if (paymentIntent.status === "succeeded") {
                    const {
                        payment
                    } = await fetch('http://127.0.0.1:8000/api/payment_succeeded', {
                        method: "POST",
                        body: JSON.stringify({
                            "basketId": basketId.value,
                            "userId": userId.value
                        })
                    }).then(response => response.json())
                    if (payment === "succes") {
                        alert("Paiement réussi")
                    } else if (payment === "failed") {
                        alert("Une erreur est survenue veuillez réessayer plus tard.\nSi le problème persiste, veuiller contacter un responsable.")
                    }
                }
            })
        })

        const addMessage = (message) => {
            const messageDiv = document.querySelector('#messages')
            messageDiv.style.display = 'block'
            messageDiv.innerHTML += '>' + message + '<br>'
            console.log('StripeSampleDebug', message)
        }
    </script>
</body>

</html>