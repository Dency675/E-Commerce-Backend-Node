import { Request, Response } from "express";
import EcCart from "../../model/ec_cart";

const editCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_id, quantity } = req.body;
    const { registrationId } = req.body.jwt_decoded;

    if (!product_id || !quantity) {
      res
        .status(400)
        .json({ error: "Bad request - Provide product_id and quantity" });
      return;
    }

    const cartItem = await EcCart.findOne({
      where: { product_id, registration_id: registrationId },
      raw: true,
    });

    if (!cartItem) {
      res.status(404).json({ error: "Cart item not found or unauthorized" });
      return;
    }

    // Update the quantity of the existing cart item

    await EcCart.update(
      { quantity: quantity },
      {
        where: { product_id, registration_id: registrationId },
      }
    );

    res.status(200).json({ message: "Cart item updated successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export default editCart;
