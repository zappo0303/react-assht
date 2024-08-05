import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import AuthRouter from './src/routers/auth.js'
import cors from "cors";
import ProductRouter from './src/routers/ProductRouter.js';
import { conectDB } from './src/config/db.js';
import categoryRouter from './src/routers/categoryRouter.js';
import RouterSize from './src/routers/Size.js';
import routerCart from './src/routers/cart.js';
import orderRouter from "./src/routers/order.js";
const server = express();
const app = express();
const port = process.env.PORT || 8080;
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