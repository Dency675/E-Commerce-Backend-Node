import { client } from "../../services/mongodb";
import { Request, Response } from "express";
import { Db, ObjectId } from "mongodb";

const db: Db = client.db("e_commerce");

const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.query);
    const { client_type } = req.body.jwt_decoded;
    if (client_type != "customer") {
      res.status(404).json({ error: "Bad request" });
    }
    const productCollection = db.collection("products");

    const result = await productCollection.find({}).toArray();

    console.log("result");
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "Internal Server Error" });
  }
};
export const getUniqueProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { product_id } = req.query;
    console.log(req.query);
    console.log(product_id);
    const { client_type } = req.body.jwt_decoded;
    if (!product_id || client_type != "customer") {
      res.status(404).json({ error: "Bad request" });
    }
    const productCollection = db.collection("products");

    const filter = new ObjectId(product_id as string);

    console.log("filter");
    console.log(filter);

    const result = await productCollection.find({ _id: filter }).toArray();

    console.log("result");
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "Internal Server Error" });
  }
};

export default getProduct;

export const uniqueProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { _id } = req.params;
  _id.replace(":", "");
  // Remove the colon from the parameter values

  console.log(_id);

  res.status(200).json({ _id });
};
