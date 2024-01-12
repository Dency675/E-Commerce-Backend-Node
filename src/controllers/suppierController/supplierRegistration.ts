import { Op } from "sequelize";
import EcSuppliers from "../../model/ec_suppliers";
import { Request, Response } from "express";

const supplierRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { full_name, e_mail, password, profile_pic } = req.body;

    if (!full_name || !e_mail || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const newSupplier = await EcSuppliers.create({
      full_name,
      e_mail,
      password,
      profile_pic: Buffer.from(profile_pic),
    });
    console.log(newSupplier);
    res.status(201).json(newSupplier);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const supplierProfile = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   // const { name, age } = req.query;
//   // res.send(`${name} , ${age} `);

//   const { full_name, e_mail, password, profile_pic } = req.body;
//   console.log(
//     `hi hello ...............${full_name} , ${e_mail} ,${password},&${profile_pic}`
//   );

//   const found = await EcSuppliers.findAll({
//     where: { e_mail: { [Op.in]: ["Aljo@gmail.com"] } },
//     raw: true,
//   });
//   console.log(found);

//   // res.send(`${full_name} , ${e_mail} ,${password},&${profile_pic}`);
//   res.send(found);
//   //   return found;
// };

const supplierProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // const { e_mail } = req.body;
    const { userID } = req.body.jwt_decoded;
    console.log(userID);

    const found = await EcSuppliers.findOne({
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

export default supplierRegistration;
export { supplierProfile };
