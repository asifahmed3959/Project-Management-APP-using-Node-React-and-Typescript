import express from "express";

const app = express();

const userRoutes = require("./routes/UserRoutes");
const workorderRoutes = require("./routes/WorkOrderRoutes");

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", workorderRoutes);

app.listen(4000);










