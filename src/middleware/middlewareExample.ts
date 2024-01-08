import { Response, Request, NextFunction } from "express";

interface CustomerRequest extends Request {
  customerProperty?: string;
}
export const middleFirstExample = async (
  req: CustomerRequest,
  res: Response,
  next: NextFunction
) => {
  //   req.customerProperty = "aaa";
  req["customerProperty"] = "This is custom property added to the request";
  // const customerProperty = req.customerProperty || "not available";
  // const customerProperty = req.customerProperty ? req.customerProperty:'aaa';
  // const customerProperty = req.customerProperty ?? 'aaa';

  // console.log("hello from middleware");
  next();
};

export const middleSecondExample = async (
  req: CustomerRequest,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
  res.setHeader("Content-Type", "application/json");
  //   res.setHeader("Content-Type", "text/html");
  next();
};
