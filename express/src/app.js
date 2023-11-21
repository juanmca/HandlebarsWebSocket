import express, { urlencoded } from "express";

import { router as routerProducts } from "./routes/products.router.js";
import { router as routerCarts } from "./routes/carts.router.js";

import { join } from "path";
import __dirname from "./utils.js";

import { engine } from "express-handlebars";
import { router as vistasRouter } from "./routes/vistas.router.js";

import { Server } from "socket.io";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

let archivoViews = join(__dirname, "./views");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", archivoViews);

let archivoPublic = join(__dirname, "/public");
app.use(express.static(archivoPublic)); //http://localhost:8080/assets/img/producto.png

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

app.use("/", vistasRouter);

const server = app.listen(PORT, () => {
  console.log(`Server on line en puerto ${PORT}`);
});

export const io = new Server(server); // Da inicio a socket.io BACKEND
io.on("connection", (socket) => {
  console.log(`se conecto un cliente con id ${socket.id}`);
});
