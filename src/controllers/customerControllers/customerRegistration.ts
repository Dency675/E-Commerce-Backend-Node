import { Op } from "sequelize";
import EcCustomers from "../../model/ec_customers";
import { Request, Response } from "express";

const customerRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { full_name, e_mail, password, profile_pic } = req.body;

    if (!full_name || !e_mail || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const newCustomer = await EcCustomers.create({
      full_name,
      e_mail,
      password,
      profile_pic: Buffer.from(profile_pic),
    });
    console.log(newCustomer);
    res.status(201).json(newCustomer); // 201 for resource creation success
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const customerProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userID } = req.body.jwt_decoded;
    console.log(userID);
    // const { e_mail } = req.body;

    // if (!e_mail) {
    //   res.status(400).json({ message: "Email is missing" });
    //   return;
    // }

    const found = await EcCustomers.findOne({
      where: { id: userID },
      attributes: ["e_mail", "full_name"],
      raw: true,
    });

    if (!found) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    console.log(found);
    res.status(200).json(found);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  //   return found;
};

export default customerRegistration;
export { customerProfile };
