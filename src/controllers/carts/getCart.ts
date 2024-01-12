import { Request, Response } from "express";
import EcCart from "../../model/ec_cart";

const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { registrationId } = req.body.jwt_decoded;

    const cartItems = await EcCart.findAll({
      where: { registration_id: registrationId },
      raw: true,
    });

    res.status(200).json({ cartItems });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export default getCart;
