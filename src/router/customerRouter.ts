import express from "express";
import { Request, Response } from "express";
import customerRegistration, {
  customerProfile,
} from "../controllers/customerControllers/customerRegistration.ts";
import { verifyToken } from "../middleware/verifyJWT.ts";
import resetPassword from "../controllers/authentication/resetPassword.ts";
import addCart from "../controllers/carts/addCart.ts";
import editCart from "../controllers/carts/updateCart.ts";

const router = express.Router();
router.get("/customerProfile", verifyToken, (req: Request, res: Response) => {
  customerProfile(req, res);
});

router.post("/customerRegistration", (req: Request, res: Response) => {
  customerRegistration(req, res);
});

router.patch("/resetPassword", verifyToken, (req: Request, res: Response) => {
  resetPassword(req, res);
});

router.post("/addCart", verifyToken, (req: Request, res: Response) => {
  addCart(req, res);
});

router.post("/editCart", verifyToken, (req: Request, res: Response) => {
  editCart(req, res);
});

export default router;
