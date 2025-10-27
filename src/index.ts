import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { router } from "./shared/routes";
import { errorHandler } from "./shared/middlewares/errorHandler";

dotenv.config();

const PORT = process.env.PORT || 3333;
const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on port ${PORT} `));
