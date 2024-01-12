import { Request, Response } from "express";
import EcCart from "../../model/ec_cart";

const addCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const cartItems = req.body; // Assuming req.body is an array of objects
    console.log(cartItems);
    const { client_type, registrationId } = req.body.jwt_decoded;

    if (!Array.isArray(cartItems) || client_type !== "customer") {
      res.status(400).json({ error: "Bad request" });
      return;
    }

    for (const item of cartItems) {
      const { product_id, quantity } = item;

      if (!product_id || !quantity) {
        res.status(400).json({
          error: "Bad request - Each item should have productID and quantity",
        });
        return;
      }

      await EcCart.create(
        { product_id: product_id, registration_id: registrationId, quantity },
        { raw: true }
      );
    }

    res.status(200).json({ message: "Data inserted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export default addCart;

