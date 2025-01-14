
import Stripe from "stripe";
const stripe = new Stripe(process.env.Secret_key);

const HandlePayment = async (req, res) => {
    try {
        const { product } = req.body;
         

        const line_items = [{
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.contentType  
                },
                unit_amount: product.price * 100  // Amount in paise
            },
            quantity: 1
        }];
         
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],  
            line_items: line_items,  
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        });
        
         
        res.json({
            id: session.id
        });
    } catch (error) {
        console.error('Error creating payment session:', error.message, error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { HandlePayment };
 