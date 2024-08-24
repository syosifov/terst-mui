const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.checkout = async (req, res, next) => {

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'book'
                    },
                    unit_amount: 50 * 100
                },
                quantity: 1
            },
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'T-Shirt'
                    },
                    unit_amount: 20 * 100
                },
                quantity: 2
            }
        ],
        mode: 'payment',
        shipping_address_collection: {
            allowed_countries: ['US', 'BR']
        },
        success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/cancel`
    })

    console.log(session);
    res.redirect(session.url)

}