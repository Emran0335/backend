*** Lesson - 18 ***
// rest api deployed at heroku.....

// index.js
// Create a REST api without database

// we will focus on MVC architecture
// routes demo
/*
    1. / users -> GET(read) -> { id, username, email }
    2. /users/ -> POST(create) -> {username, email}
    3. /users/:id -> PUT(update) -> update the user
    4. /users/:id -> DELETE(delete) -> delete the user
*/
require("dotenv").config();
const app = require("./app")
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

console.log('Hello');

// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users.route");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// for users route to get the users data from ./routes/users.route.js
app.use("/users", usersRouter);

// to send message to getRoute to see on the browser. It can also use res.send("hello") to show string message or it can use res.sendFile(__dirname + "/index.html") or res.sendFile(path.join(__dirname + "../views/contact.html"))
// this is a home route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

// to show message for the invalid route
app.use((req, res, next) => {
    res.status(404).json({
        message: "404 is Found!"
    })
    next();
})

// to show message for the http server err
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something are broken!",
  });
  next();
});
// app is exported but it can be imported using require().
module.exports = app

// routes folder -> users.route.js
// we donot use app. But we use router from express.Router().
//const express = require("express");
//const router = express.Router()
const router = require("express").Router();
const { getAllUser, createUser, updateUser, deleteUser } = require("../controllers/users.controller");


// we should not use "/users" as it is used in controllers/users.controller. So we should use "/".
router.get("/", getAllUser);

// store data, we need to use post(). If we want to pass some data, we need to use post() from "controller/users.controller.js" route.
router.post("/", createUser);

// to update user, we need to use put(). If we want to update data, we need to depend on id.
router.put("/:id", updateUser);

// to delete user, we need to use delete(). If want to delete data, we need to depend on id.
router.delete("/:id", deleteUser)

module.exports = router

// controllers folder - > users.controller.js
// we can not push data to const. So, instead of const, let wil be used.
let users = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");

const getAllUser = (req, res) => {
  res.status(200).json({ users });
};

// create user
const createUser = (req, res) => {
  const newUser = {
    id: uuidv4(),
    username: req.body.username,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(users);
};

// update user -> with put()
const updateUser = (req, res) => {
  // id is got from params
  const userid = req.params.id;
  // data will also come from req.body to update
  const { username, email } = req.body;

  // to update, we need filter method to select the mathced user and map() will be used to update user's username and user's email.
  users
    .filter((user) => user.id === userid)
    .map((selectedUser) => {
      selectedUser.username = username; // username and email will come from postman body.
      selectedUser.email = email;
    });
  res.status(200).json(users);
};

// delete user -> with delete()
const deleteUser = (req, res) => {
  // id is got from params("/:id")
    const userid = req.params.id;
    // const { username, email } = req.body;
    const filteredUsers = users.filter((user) => user.id !== userid); // if matched, matched is returned, it not matched with others, others are returned.
    res.status(200).json(filteredUsers); // users value will be changed to filteredUsers
}

module.exports = { getAllUser, createUser, updateUser, deleteUser };

// models folder -> users.model.js
const { v4: uuidv4 } = require("uuid");

const users = [
  {
    id: uuidv4(),
    username: "emran hossain",
    email: "emranhossain@gmail.com",
  },
  {
    id: uuidv4(),
    username: "ruhul amin",
    email: "ruhulamin@gmail.com",
  },
];

module.exports = users;

// views folder -> index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
</head>
<body>
    <h1> Welcome to REST API Server!</h1>
</body>
</html>

//.env file
PORT=4000
//.gitignore file
node_modules





*** Lesson - 19 ***
mongobd

// .env file
DB_URL=mongodb+srv://emranhossain:emran0335@cluster0.kcmswj2.mongodb.net/mongodb



// index.js
const app = require("./app");
const config = require("./config/config");

const PORT = config.app.port;

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});

// app.js
const express = require("express");
const cors = require("cors");
// come from db.js
require("./config/db");

const app = express();

// import from user.route.js
const userRouter = require("./routes/user.route");

// to get data from other server i.e. cross
app.use(cors());

// to get data from the form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
Routing planning
1. api/users : GET
2. api/users/:id : GET
3. api/users/ : POST (create new user)
4. api/users/:id : PATCH (update any user)
5. api/users/:id : DELETE (delete any user)
*/

// all are imported
app.use("/api/users", userRouter);


// home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});

// for error handling. Actually route not found error
app.use((req, res, next) => {
    res.status(404).json({
        message: "404 not found!"
    })
    next();
})

// server error handling
app.use((err, req, res, next) => {
    res.status(500).json({
        message: "something went wrong for the server!"
    })
})

module.exports = app;

// routes folder -> user.route.js
const express = require("express");
const router = express.Router();

// all imported file
const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require("../controllers/user.controller");
/*
Routing planning
1. api/users : GET
2. api/users/:id : GET
3. api/users/ : POST (create new user)
4. api/users/:id : PATCH (update any user)
5. api/users/:id : DELETE (delete any user)
*/

router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.post("/", createUser);
// I can also use put() method to update the user. But it is not good to use put() mehtod ot update only one user. So, patch() method can be used in this regard.
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

//controller folder -> user.controller.js
// from npm package
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");

// mongoose Schema must be followed i.e. userSchema from user.model.js
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User({
      id: uuidv4(),
      name: req.body.name,
      age: Number(req.body.age), // age will come as string. So, Number() is needed!
      // date is not needed as it is not required! It will work by default.
    });
    // to save newUser, we need asychronous await and save() method.
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    user.name = req.body.name;
    user.age = Number(req.body.age); // it needs to be converted to number data-type. By default, request body takes everything as string data-type.
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ id: req.params.id });
    res.status(200).json({
      message: "user is deleted!",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};

// models folder -> user.models.js
const mongoose = require("mongoose");

// If we want to get data from mongodb, we need schema.
const userSchema = mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  createdOn: {
    type: Date,
    default: Date.now, // it will created by default;
  },
});


// noSql database
// data now follows the above rule

module.exports = mongoose.model("User", userSchema);

// views folder -> index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Welcome to the server!</h1>
  </body>
</html>

// config folder -> config.js
require("dotenv").config();

const dev = {
  app: {
    port: process.env.PORT || 4000,
  },
  db: {
    url: process.env.DB_URL || "mongodb://localhost:27017/userDemoDb",
  },
};

module.exports = dev;

// config folder - db.js
// mongoose will come from npm package mongoose
const mongoose = require("mongoose");
// come from config.js
const config = require("./config");

const dbURL = config.db.url;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("mongobd atlas is connected!");
  })
  .catch((error) => {
      console.log(error);
      process.exit(1)
  });




*** Lesson - 20 ***

// If we want to send file of image to the server, we need to install multer package from npm package manager.
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form action="/register" method="post" enctype="multipart/form-data">
      <div>
        <input type="file" name="image" />
      </div>
      <br>
      <button type="submit">Register</button>
    </form>
  </body>
</html>

// index.js
const express = require("express");
const multer = require("multer");
const app = express();

const PORT = 8005;

// If we want to show image file into the server, we need to install multer npm package.
// file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

app.get("/register", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

// upload.single(image: is given from the input file name of the index.html)
app.post("/register", upload.single("image") ,(req, res) => {
  res.status(200).send("file is being uploaded!");
});

app.get("/test", (req, res) => {
  res.status(200).send("testing api");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// uploads -> It is a file and all images will be stored here in this folder.
