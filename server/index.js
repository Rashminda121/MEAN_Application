const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// schema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);

// read
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

// save data
app.post("/create", async (req, res) => {
  //   console.log(req.body);
  const data = new userModel(req.body);
  await data.save();

  res.send({ success: true, message: "data saved successfully!", data: data });
});

// update data
app.put("/update", async (req, res) => {
  //   console.log(req.body);
  const { _id, ...rem } = req.body;

  const data = await userModel.updateOne({ _id: _id }, rem);

  res.send({
    success: true,
    message: "data updated successfully!",
    data: data,
  });
});

// delete data
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  //   console.log(id);

  const data = await userModel.deleteOne({ _id: id });

  res.send({
    success: true,
    message: "data deleted successfully!",
    data: data,
  });
});

// mongoose connect
mongoose
  .connect("mongodb://localhost:27017/crudoperation")
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => console.log("sever is running!"));
  })
  .catch((err) => console.log(err));
