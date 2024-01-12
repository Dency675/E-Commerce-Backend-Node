import { client } from "../../services/mongodb";
import { Db } from "mongodb";
import { Request, Response } from "express";

let db: Db = client.db("e_commerce");

const addProduct = async (req: Request, res: Response): Promise<void> => {
  const {
    productName,
    productCategory,
    productStock,
    productPhoto,
    ...otherData
  } = req.body;

  const { registrationId, client_type } = req.body.jwt_decoded;

  try {
    if (!productName || !productCategory || !productStock || !productPhoto) {
      res.status(400).json({ error: "Please provide all required fields." });
      return;
    }

    const productCollection = db.collection("products");
    const productDocument = {
      supplier_id: { registration_id: registrationId, client_type },
      productName,
      productCategory,
      productStock,
      productPhoto: Buffer.from(productPhoto, "base64"),
      ...otherData,
    };

    delete productDocument.jwt_decoded;

    await productCollection.insertOne(productDocument);
    res.status(200).json({ message: "Insertion successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
};

export default addProduct;
