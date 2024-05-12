const express = require("express");
const cors = require("cors");
const path = require("path");
var jwt = require("jsonwebtoken");
const multer = require("multer");
// const productController = require('./controllers/productController');
// const userController = require('./controllers/userController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
const bodyParser = require("body-parser");
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8000;
const mongoose = require("mongoose");
// mongoose.connect('mongodb+srv://naimu:naimu123@cluster0.t6uhb.mongodb.net/?retryWrites=true&w=majority')

app.get("/", (req, res) => {
  res.send("hello...");
});
mongoose.connect(
  "mongodb+srv://anam23:anamnewdb08@cluster0.kimmomy.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

let schema = new mongoose.Schema({
  pname: String,
  pdesc: String,
  price: String,
  category: String,
  pimage: String,
  pcity: String,
  addedBy: mongoose.Schema.Types.ObjectId,
  pLoc: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
    },
  },
});
schema.index({ pLoc: "2dsphere" });
const Products = mongoose.model("Products", schema);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  mobile: String,
  username: String,
  cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

// Add a pre hook to handle cascading delete
userSchema.pre("remove", function (next) {
  // Remove associated products when a user is deleted
  Products.deleteMany({ userid: this._id })
    .then(() => next())
    .catch((err) => next(err));
});

const Users = mongoose.model("Users", userSchema);

app.post("/addproduct", upload.single("pimage"), (req, res) => {
  const plat = req.body.plat;
  const plong = req.body.plong;
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const category = req.body.category;
  const pimage = req.file.path;
  const pcity = req.body.pcity;
  const addedBy = req.body.userId;
  const product = new Products({
    pname: pname,
    pdesc: pdesc,
    price: price,
    category: category,
    pimage: pimage,
    pcity: pcity,
    addedBy: addedBy,
    pLoc: {
      type: "Point",
      coordinates: [plat, plong],
    },
  });
  product
    .save()
    .then(() => {
      res.send({ message: "saved successfully file" });
    })
    .catch(() => {
      res.send({ message: "fishy err" });
    });
  return;
});

app.post("/liked-products", (req, res) => {
  let productId = req.body.id;
  let userId = req.body.userId;
  // console.log("Request Body:", req.body);

  Users.updateOne({ _id: userId }, { $addToSet: { cartItems: productId } })
    .then(() => {
      res.send({ message: "liked success." });
    })
    .catch(() => {
      res.send({ message: "server err" });
    });
});

app.get("/get-products", (req, res) => {
  Products.find()
    .then((result) => {
      // console.log("Filtered products:", result);
      res.send({
        message: "Successfully retrieved products",
        products: result,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: "Server error", error: err });
    });
});
app.post("/my-product", (req, res) => {
  const userId = req.body.userId;

  Products.find({ addedBy: userId })
    .then((result) => {
      res.send({ message: "success", products: result });
    })
    .catch((err) => {
      res.send({ message: err });
    });
});
app.get("/get-product/:id", (req, res) => {
  const productId = req.params.id;
  //   console.log(productId)
  Products.findById(productId)
    .then((result) => {
      if (result) {
        res.status(200).json({ product: result });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch((err) => {
      console.error("Error fetching product:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/liked-products/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await Users.findById(userId).populate("cartItems");

    if (user) {
      res.status(200).json({ cartItems: user.cartItems });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/remove-product", async (req, res) => {
  const productIdToRemove = req.body.productId;

  try {
    // Check if product ID is provided
    if (!productIdToRemove) {
      return res
        .status(400)
        .send({ message: "Bad request. Missing product ID." });
    }

    // Use Mongoose to find and remove the product
    const removedProduct = await Products.findOneAndDelete({
      _id: productIdToRemove,
    });
    console.log("id removes is", productIdToRemove);
    if (!removedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.send({ message: "Product removed successfully", removedProduct });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/remove-from-cart", async (req, res) => {
  const userId = req.body.userId;
  const productIdToRemove = req.body.productId;
  if (!userId || !productIdToRemove) {
    return res
      .status(400)
      .send({ message: "Bad request. Missing user ID or product ID." });
  }

  const updatedUser = await Users.findByIdAndUpdate(
    userId,
    { $pull: { cartItems: productIdToRemove } },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).send({ message: "User not found" });
  }

  res.send({ message: "Item removed from cart", updatedUser });
});
app.post("/signup", (req, res) => {
  console.log("boy is here", req.body);

  const email = req.body.email;
  const password = req.body.password;
  const mobile = req.body.phone;
  const username = req.body.name;
  const user = new Users({
    email: email,
    password: password,
    mobile: mobile,
    username: username,
  });
  user
    .save()
    .then(() => {
      console.log("User registered successfully");
      res.status(200).send({ message: "User registered successfully" });
    })
    .catch((error) => {
      console.error("Error registering user:", error);
      res
        .status(500)
        .send({ message: "Registration failed. Please try again later." });
    });
});
// app.get('/my-profile/:userId', userController.myProfileById)
// app.get('/get-user/:uId', userController.getUserById)

app.get("/get-user/:uId", (req, res) => {
  const _userId = req.params.uId;
  Users.findOne({ _id: _userId })
    .then((result) => {
      res.send({
        message: "success.",
        user: {
          email: result.email,
          mobile: result.mobile,
          username: result.username,
        },
      });
    })
    .catch(() => {
      res.send({ message: "server err user not found" });
    });
});
app.post("/update-profile", async (req, res) => {
  const { password, mobileNumber, email, name } = req.body;
  const userId = req.body.userId;
  console.log(req.body);
  try {
    // Update user profile in the database
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        password: password,
        mobile: mobileNumber,
        email: email,
        username: name,
      },
      { new: true }
    );
    console.log(updatedUser);
    // Handle the response as needed
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({ email: email })
    .then((result) => {
      if (!result) {
        res.send({ message: "not exist" });
      } else {
        if (result.password == password) {
          const token = jwt.sign(
            {
              data: result,
            },
            "MYKEY",
            { expiresIn: "1h" }
          );
          res.send({
            message: "find success.",
            token: token,
            userId: result._id,
          });
        }
        if (result.password != password) {
          res.send({ message: "password wrong" });
        }
      }
    })
    .catch(() => {
      res.send({ message: "server err" });
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
