import { Op } from "sequelize";
import EcCustomers from "../../model/ec_customers";
import { Request, Response } from "express";

const customerRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { full_name, e_mail, password, profile_pic } = req.body;
    if (!full_name) {
      res.status(425).json({ message: "name is missing" });
    }

    const newCustomer = await EcCustomers.create({
      full_name,
      e_mail,
      password,
      profile_pic: Buffer.from(profile_pic),
    });
    console.log(newCustomer);
    res.send(newCustomer);
  } catch (error: any) {
    console.log(error);
    res.status(425).json({ message: "data is missing" });
  }
};

const customerProfile = async (req: Request, res: Response): Promise<void> => {
  const { full_name, e_mail, password } = req.body;
  console.log(`hi hello ...............${full_name} , ${e_mail} ,${password}`);

  const found = await EcCustomers.findAll({
    where: { e_mail },
    raw: true,
  });
  console.log(found);

  res.send(found);
  //   return found;
};

export default customerRegistration;
export { customerProfile };
