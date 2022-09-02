<!DOCTYPE html>
<html>

<head>
    <meta charset="utf8" />
    <title>Stripe payment</title>
    <link rel="stylesheet" href="css/paymentView.css" />
</head>

<body>
    <div id="main">
        <div id="container">
            <div id="panel">
                <h1>Accept a payment</h1>
                <form id="payment-form">
                    <label for="name">Nom du titulaire de la carte</label>
                    <input type="text" id="name" />

                    <label for="card-element">Card</label>
                    <div id="card-element"></div>
                    <button>Pay</button>
                </form>
                <div id="messages" role="alert"></div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="https://js.stripe.com/v3/"></script>
    <script src="js/card.js"></script>
</body>

</html>