import express from "express";
import { Request, Response } from "express";
import login, { customerProfile } from "../controllers/authentication/login.ts";
import { verifyToken } from "../middleware/verifyJWT.ts";

const router = express.Router();
router.get("/viewProfile", (req: Request, res: Response) => {
  customerProfile(req, res);
});

router.post("/postData", (req: Request, res: Response) => {
  login(req, res);
});

export default router;
