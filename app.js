import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import weatherRoutes from "./routes/weather.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;


// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


