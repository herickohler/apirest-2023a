const express = require("express");
const app = express();

app.use(express.json());

let users = [];
let products = [];
let userId = 1;
let productId = 1;

// Endpoints de usuários
app.get("/users", (req, res) => res.json(users));

app.post("/users", (req, res) => {
  const { name, cpf, email } = req.body;
  if (!name || name.length < 3 || name.length > 150) return res.status(400).json({ message: "Nome inválido" });
  if (!cpf || cpf.length !== 11 || !/^\d+$/.test(cpf)) return res.status(400).json({ message: "CPF inválido" });
  if (!email || !email.includes("@") || !email.split("@")[1].includes(".")) return res.status(400).json({ message: "Email inválido" });
  users.push({ id: userId++, name, cpf, email });
  res.status(201).json({ message: "Usuário cadastrado com sucesso" });
});

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  const { name, cpf, email } = req.body;
  if (!name || name.length < 3 || name.length > 150) return res.status(400).json({ message: "Nome inválido" });
  if (!cpf || cpf.length !== 11 || !/^\d+$/.test(cpf)) return res.status(400).json({ message: "CPF inválido" });
  if (!email || !email.includes("@") || !email.split("@")[1].includes(".")) return res.status(400).json({ message: "Email inválido" });
  Object.assign(user, { name, cpf, email });
  res.json({ message: "Usuário atualizado com sucesso" });
});

app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Usuário não encontrado" });
  users.splice(index, 1);
  res.json({ message: "Usuário removido com sucesso" });
});

// Endpoints de produtos
app.get("/products", (req, res) => res.json(products));

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || name.length < 3 || name.length > 100) return res.status(400).json({ message: "Nome inválido" });
  if (!price || price <= 0) return res.status(400).json({ message: "Preço inválido" });
  products.push({ id: productId++, name, price });
  res.status(201).json({ message: "Produto cadastrado com sucesso" });
});

app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Produto não encontrado" });
  res.json(product);
});

app.put("/products/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Produto não encontrado" });
  const { name, price } = req.body;
  if (!name || name.length < 3 || name.length > 100) return res.status(400).json({ message: "Nome inválido" });
  if (!price || price <= 0) return res.status(400).json({ message: "Preço inválido" });
  Object.assign(product, { name, price });
  res.json({ message: "Produto atualizado com sucesso" });
});

app.delete("/products/:id", (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Produto não encontrado" });
  products.splice(index, 1);
  res.json({ message: "Produto removido com sucesso" });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));