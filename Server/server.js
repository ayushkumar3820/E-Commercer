import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectedDB from "./src/database/data.js";
import router from "./src/Router/user.js";
import swaggerDocs from "./swagger.js";
import routerUpload from "./src/Router/uploadrouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
ConnectedDB();
app.use("/api", router);
app.use("/api",routerUpload)


app.get("/", (req, res) => {
  res.send("Ayush Kumar");
});

swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});
