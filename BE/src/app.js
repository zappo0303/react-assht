import express from 'express';
import { conectDB } from './config/db.js';
import AuthRouter from './routers/auth.js'
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from "cors";
import ProductRouter from './routers/ProductRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import RouterSize from './routers/Size.js';
import routerCart from './routers/cart.js';
import orderRouter from "./routers/order.js";
const app = express();
const port = process.env.PORT || 8080;
const server = express();

//  middleware
const MONGO_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/SoleStyleFootwear"
server.use(express.json());
server.use(cors());
server.use(morgan("dev"))
/// connect DB
conectDB(MONGO_URI);
//Router
server.use(`/api`, ProductRouter);
server.use(`/api/v1`, AuthRouter);
server.use(`/api/v1`, categoryRouter);
server.use(`/api/v1`, RouterSize);
server.use(`/api/v1`, routerCart);
server.use("/api/v1", orderRouter);

app.listen(port, () => console.log("Server is running with " + port));