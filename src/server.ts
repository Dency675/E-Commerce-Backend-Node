import express, { NextFunction, Express } from "express"; //here express gives a function
import sequelize from "../src/config/sequelize-config.ts";
import supplierRouter from "./router/supplierRouter.ts";
import customerRouter from "./router/customerRouter.ts";
import loginRouter from "./router/loginRouter.ts";
import { Response, Request } from "express";
import {
  middleFirstExample,
  middleSecondExample,
} from "./middleware/middlewareExample.ts";
import { verifyToken } from "./middleware/verifyJWT.ts";

const app: Express = express(); //the return of express function is stored in app

const port = 3000 || process.env.port; //process.env.port takes value in the environment file and use that here

sequelize
  .sync({ force: false }) // Set force to true to drop and recreate tables on every application start
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.use(express.urlencoded({ extended: true })); //to accept the encoded url

app.use(express.json());

// middleware
// next function call the next endpoint
app.use((req, res, next: NextFunction) => {
  console.log("hello from middleware");
  next(); // continue to the next middleware or router handler
});

//
interface CustomerRequest extends Request {
  customerProperty?: string;
}
//

// app.use((req: Request, res: Response, next: NextFunction) => {
//   middleFirstExample(req, res, next);
// });

// app.use((req, res, next: NextFunction) => {
//   middleSecondExample(req, res, next);
// });

app.get("/middleware",middleFirstExample,middleSecondExample, (req: CustomerRequest, res: Response) => {
  const customerProperty = req.customerProperty || "Not Available";
  // console.log(`${customerProperty}`);
  res.send(`${customerProperty}`);
});

app.use("/", loginRouter);
app.use("/api/v1",middleFirstExample,middleSecondExample, supplierRouter);
app.use("/api/v2", customerRouter);

app.listen(port, () => {
  console.log(`The port ${port} running`);
});
