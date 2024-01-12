import express from "express";
import { Request, Response } from "express";
import supplierRegistration, {
  supplierProfile,
} from "../controllers/suppierController/supplierRegistration.ts";
import { verifyToken } from "../middleware/verifyJWT.ts";
import resetPassword from "../controllers/authentication/resetPassword.ts";
import addProduct from "../controllers/products/addProducts.ts";
import editProduct from "../controllers/products/editProducts.ts";
import getProducts, {
  uniqueProducts,
  getUniqueProduct,
} from "../controllers/products/getProducts.ts";
import getProductSupplier from "../controllers/products/getProductsSuppliers.ts";

const router = express.Router();

router.get("/supplierProfile", verifyToken, (req: Request, res: Response) => {
  supplierProfile(req, res);
});

router.post("/supplierRegistration", (req: Request, res: Response) => {
  supplierRegistration(req, res);
});

router.patch("/resetPassword", verifyToken, (req: Request, res: Response) => {
  resetPassword(req, res);
});

router.post("/addProduct", verifyToken, (req: Request, res: Response) => {
  addProduct(req, res);
});

router.post("/editProduct", verifyToken, (req: Request, res: Response) => {
  editProduct(req, res);
});

router.get("/getProducts", verifyToken, (req: Request, res: Response) => {
  getProducts(req, res);
});

router.get("/getUniqueProduct", verifyToken, (req: Request, res: Response) => {
  getUniqueProduct(req, res);
});

router.get(
  "/getProductSupplier",
  verifyToken,
  (req: Request, res: Response) => {
    getProductSupplier(req, res);
  }
);

//path params
router.get(
  "/uniqueProducts/:_id",
  verifyToken,
  (req: Request, res: Response) => {
    uniqueProducts(req, res);
  }
);

export default router;
