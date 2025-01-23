const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const blogRoutes = require("../routes/blogroutes");

//express app
const app = express();

const dbURI = `mongodb+srv://blogger:${process.env.PASSWORD}@butterfly-blog.bfydr.mongodb.net/blogs?retryWrites=true&w=majority&appName=Butterfly-blog`;

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3004))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//copied and pasted them in blogroutes.js
app.use("/blogs", blogRoutes);

app.get("/about", (req, res) => {
  console.log(req.url);
  res.render("about", { title: "About" });
});

//404 pages
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
