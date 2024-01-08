import { Op } from "sequelize";
import EcSuppliers from "../../model/ec_suppliers";
import { Request, Response } from "express";

const supplierRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { full_name, e_mail, password, profile_pic } = req.body;
    if (!full_name) {
      res.status(425).json({ message: "name is missing" });
    }

    const newSupplier = await EcSuppliers.create({
      full_name,
      e_mail,
      password,
      profile_pic: Buffer.from(profile_pic),
    });
    console.log(newSupplier);
    res.send(newSupplier);
  } catch (error: any) {
    console.log(error);
    res.status(425).json({ message: "data is missing" });
  }
};

const supplierProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  // const { name, age } = req.query;
  // res.send(`${name} , ${age} `);

  const { full_name, e_mail, password, profile_pic } = req.body;
  console.log(
    `hi hello ...............${full_name} , ${e_mail} ,${password},&${profile_pic}`
  );

  const found = await EcSuppliers.findAll({
    where: { e_mail: { [Op.in]: ["Aljo@gmail.com"] } },
    raw: true,
  });
  console.log(found);

  // res.send(`${full_name} , ${e_mail} ,${password},&${profile_pic}`);
  res.send(found);
  //   return found;
};
export default supplierRegistration;
export { supplierProfile };
