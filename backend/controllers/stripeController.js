import Stripe from "stripe";
import {Cart} from "../models/cartModel.js";

const stripe=Stripe(process.env.STRIPE_SK);

export const createPayment = async (req, res) => {
    try {
      const userId = req.userId;  // Assuming you're using `verifyToken` middleware
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
  
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }
  
      const line_items = cart.items.map(item => {
        const product = item.product; // Accessing the product object from the populated cart item
  
        if (!product || isNaN(product.price)) {
          console.error("Invalid product:", product);
          return null; // Skip invalid items
        }
  
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name, 
              description: product.description || "No description available",
            },
            unit_amount: Math.round(product.price * 100), // Convert to integer (cents)
          },
          quantity: item.quantity,
        };
      }).filter(item => item !== null); // Remove any invalid items
  
      if (line_items.length === 0) {
        return res.status(400).json({ error: "Invalid cart items" });
      }
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      });
  
      res.json({ url: session.url });
    } catch (error) {
      console.error("Payment creation error:", error);
      res.status(500).json({ error: error.message });
    }
  };