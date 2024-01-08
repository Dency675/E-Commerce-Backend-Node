import express from "express";
import { Request, Response } from "express";
import supplierRegistration, {
  supplierProfile,
} from "../controllers/suppierController/supplierRegistration.ts";

const router = express.Router();

router.get("/supplierProfile", (req: Request, res: Response) => {
  supplierProfile(req, res);
});

router.post("/supplierRegistration", (req: Request, res: Response) => {
  supplierRegistration(req, res);
});

export default router;
