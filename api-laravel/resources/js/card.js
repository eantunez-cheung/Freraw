document.addEventListener('DOMContentLoaded', async () => {
    const { publishableKey } = await fetch('http://127.0.0.1:4242/config').then((r) => r.json());
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

        if(submitted) return
        submitted = true
        from.querySelector('button').disabled = true

        const { error: backendError, clientSecret } = await fetch('http://127.0.0.1:4242/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentMethodType: 'card',
                currency: 'eur',
                amount: 500
            })
        }).then(r => r.json())
        if(backendError) {
            addMessage(backendError.message)
            submitted = false
            from.querySelector('button').disabled = false
            return
        }

        addMessage('PaymentIntent created')

        const nameInput = document.querySelector('#name')
        const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(
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
            return
        }
        
        addMessage(`PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`)
    })
})

const addMessage = (message) => {
    const messageDiv = document.querySelector('#messages')
    messageDiv.style.display = 'block'
    messageDiv.innerHTML += '>' + message + '<br>'
    console.log('StripeSampleDebug', message)
}