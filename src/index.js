const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
port = 8080;
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/api/healthcheck", (_, res) => {
  res.status(200).send("OK");
});

app.get("/api/users", async (_, res) => {
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
});

app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return res.status(200).json(user);
});

app.post("/api/users", async (req, res) => {
  const data = req.body;
  const userCreated = await prisma.user.create({
    data: {
      fullname: data.fullname,
      adress: data.adress,
      email: data.email,
      phone: data.phone,
      role: data.role,
    },
  });

  return res.status(201).json(userCreated);
});

app.put("/api/users/:id", async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const user = await prisma.user.update({
    where: { id },
    data: {
      fullname: data.fullname,
      adress: data.adress,
      email: data.email,
      phone: data.phone,
      role: data.role,
    },
  });
  return res.status(201).json(user);
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: { id },
  });
  return res.status(201).json(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
