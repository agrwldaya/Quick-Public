import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const HandlePayment = async (req, res) => {
    try {
        const { product } = req.body;
        console.log(product)
        const line_items = [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.contentType
                    },
                    unit_amount: product.price * 100  
                },
                quantity: 1
            }
        ];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        });
         console.log("Stripe session created:", session.id); // 👈 ADD THIS
        res.json({ id: session.id });
        
    } catch (error) {
        console.error("Error creating payment session:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { HandlePayment };
