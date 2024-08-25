# test-mui

React/MUI Data Table and Server-Side filtering, sorting and pagination:
    This is a test Project to experiment with React/MUI Data Table and Server-Side filtering, sorting and pagination

    We want to have an easy to use table with all the functions like sorting, filtering and pagination handled by the server.

    It's a common problem when dealing with large data sets.

    Having a good client side experience is easily achievable by using React because there is a React library for everything.

    I wouldn't implement my own Table filters* unless I have a really specific use case.

    Our first choice for library was MUI X Data Grid but turns out that to use multi filtering, you have to pay MONEY so we had to find another library.

    That was Material React Table V2, solid library, with great examples and documentation, very customizable!

Telegram bot:
    1 - Open the Telegram app on your device and search for the BotFather.

    2 - Start a chat with the BotFather and follow the instructions to create a new bot.

    3 - Once your bot is created, the BotFather will provide you with an API token. This token serves as the authentication mechanism for your bot. Make sure to keep it secure as it grants access to your bot’s functionality.

    4 - add BOT_ID = YOUR_AP_TOKEN_ID in /server .env file

Stripe:
    very good tutorial:
    How to integrate Stripe Checkout with Node.js - https://www.youtube.com/watch?v=cheDHoEazPs

    React Stripe.js and the Payment Element - https://www.youtube.com/watch?v=e-whXipfRvg
    https://github.com/matthewling-stripe/react-stripe-payment-element/tree/main

    in /server .env file add:
        BASE_URL = http://localhost:3000
        STRIPE_SECRET_KEY = your secret key
        STRIPE_PUBLISHABLE_KEY = your publishable key



