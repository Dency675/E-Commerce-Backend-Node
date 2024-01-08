import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import EcCustomers from "../../model/ec_customers";
import EcSuppliers from "../../model/ec_suppliers";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { client_type, e_mail, password } = req.body;
    if (client_type == "customer") {
      const found = await EcCustomers.findOne({
        where: { e_mail },
        raw: true,
      });

      console.log(bcrypt.compareSync(password, found?.password as string));

      if (bcrypt.compareSync(password, found?.password as string)) {
        const token = jwt.sign(
          {
            //payloads
            userID: found?.registration_id,
            client_type,
          },
          "your-secret-key",
          { expiresIn: "24h" } //token expiration time
        );
        // res.send(`message : login successfully`);
        res.json(token);
      } else {
        res.status(401).json({ message: `authentication failed` });
      }
    } else if ("supplier") {
      let found = await EcSuppliers.findOne({
        where: { e_mail: { e_mail } },
        raw: true,
      });

      console.log(bcrypt.compareSync(password, found?.password as string));

      if (bcrypt.compareSync(password, found?.password as string)) {
        res.send(`message : login s successfully`);
      } else {
        res.status(401).json({ message: `authentication failed` });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const customerProfile = async (req: Request, res: Response): Promise<void> => {
  const { client_type } = req.body;
  let found = {};
  if (client_type == "customer") {
    found = await EcCustomers.findAll({
      where: {},
      raw: true,
    });
  } else if (client_type == "supplier") {
    found = await EcSuppliers.findAll({
      where: {},
      raw: true,
    });
  }
  console.log(found);

  res.send(found);
};

export default login;
export { customerProfile };
