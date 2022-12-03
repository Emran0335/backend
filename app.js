// node module must be installed to learn backend

*** Lesson -1 ***

// how to import and export module file
// s1 is going to import from student.js
const s1 = require("./student"); // s1 can be named anything
console.log(s1.getAge());

// howt ot export file to another file
const getName = () => {
    return 'Emran Hossain'
}

const getAge = () => {
    return '34'
}

// exports.getName = getName
// exports.getAge = getAge
// getName, getAge must me same. But exports.getName or exports.getAge -> getName, and getAge can be named anything.

module.exports = { // this is the another example of exporting module.
    getName,
    getAge
}

*** Lesson - 2 ***

// Use to fs file in nodejs
// these are all asyncronous functons and they all take a callback function as parameter.

const fs = require("fs");
/*
fs.writeFile("demo1.txt", "this is a sample text", (err) => { // first file name, second text data(content)
  if (err === true) {
    console.log(err);
  } else {
    console.log("successful");
  }
});

// let override the demo1.txt file with this meassage -> I am Emran Hossain and I want to build up my career as a software engineer.

fs.writeFile(
  "demo1.txt",
  "I am Emran Hossain and I want to be a software engineer.",
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("successful!");
    }
  }
);

// fs.appendFile(): this method will append somthing with the original one.

fs.appendFile(
  "demo1.txt",
  "I am working hard to learn something new !",
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("successful!");
    }
  }
);

// fs.readFile(): this method will wirte the file but it needs encoding('utf-8), and callback function with err and data parameter.

fs.readFile("demo1.txt",'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

// fs.rename(): this method rename the file. It takes two parameters -> one is for the existing file and the other is the for the file that is going to override the existing one.

fs.rename("demo1.txt", "demo2.txt", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("successful!");
  }
});

// fs.unlink(): this method deletes the existing file.

fs.unlink("demo2.txt", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("successful!");
  }
});

*/
// fs.exists(): this method checks if the file is found or not.

fs.exists("demo2.txt", (result) => {
  if (result) {
    console.log("file is found.");
  } else {
    console.log("file is not found!");
  }
});

*** Lesson -3 ***

// built-in-modules or printed modules
// os, path

// const os = require('os');

// this is an another way to import methods from os. This is called destructure.
const { totalmem, freemem } = require("os");

// console.log(os.userInfo());
// console.log(os.homedir());
// console.log(os.hostname());
// console.log(os.totalmem());
// console.log(os.freemem());
// console.log(totalmem());
// console.log(freemem());

// path module
// console.log(__dirname);
// console.log(__filename);
const path = require("path");
// console.log(path);
const extensionName = path.extname("index.js")
console.log(extensionName);  // .js

// const joinName = path.join(__dirname + '/lesson4');
// console.log(joinName);


*** Lesson - 4 ***

// for request there are some common methods - get(), post(), delete(), put(), head()

// In response we will get status code and data (including head and body)

// HTTP Status Code
/*
1. Informational response (100 - 199);
2. Successful Response (200 - 299);
3. Redirects (300 - 399);
4. Client Errors (400 - 499);
5. Server Errors (500 - 599);
*/
const http = require("http");
const port = 3000;
const hostName = "127.0.0.1";

const myServer = http.createServer((req, res) => {
  //res.end("Hello! I am your first server. Look at me!"); // htm code can also work such as '<h1>Hello</h1>'
    res.writeHead(202, {'Content-Type': 'text/html'}) // how to set status code
    res.write('<h1>Hello</h1>');
    res.write('<h1>Hello</h1>');
    res.write('<h1>Hello</h1>');
    res.write('<h1>Hello</h1>');
    res.end(); // we have to end the response.
});

// From Server Side -> server.js

myServer.listen(port, hostName, () => {
  console.log(`Server is running at http://${hostName}: ${port}`);
});

// for request there are some common methods - get(), post(), delete(), put(), head()

// In response we will get status code and data (including head and body)

// HTTP Status Code
/*
1. Informational response (100 - 199);
2. Successful Response (200 - 299);
3. Redirects (300 - 399);
4. Client Errors (400 - 499);
5. Server Errors (500 - 599);
*/
const http = require("http");
const port = 3000;
const hostName = "127.0.0.1";

const myServer = http.createServer((req, res) => {
  //res.end("Hello! I am your first server. Look at me!"); // htm code can also work such as '<h1>Hello</h1>'
    res.writeHead(202, {'Content-Type': 'text/html'}) // how to set status code
    res.write('<h1>Hello</h1>');
    res.write('<h1>Hello</h1>');
    res.write('<h1>Hello</h1>');
    res.write('<h1>Hello</h1>');
    res.end(); // we have to end the response.
});

myServer.listen(port, hostName, () => {
  console.log(`Server is running at http://${hostName}: ${port}`);
});


*** Lesson - 5 ***

// random-fruits-name(this is an npm package) npm package has been install in dev dependency

const getRandomFruitsName = require("random-fruits-name");
console.log(getRandomFruitsName());

// how to ignore node_modules file -> gitignore file
node_modules /


*** Lesson - 6 ***

// nodemon package has been installed here.
// "start": "nodemon index.js" must be written in the package.json file.

// index.js
const http = require('http');
const fs = require('fs');
const PORT = 3000;
const hostName = '127.0.0.1';

const server = http.createServer((req, res) => {
    // handleReadFile function helps to escape from code repetition
    const handleReadFile = (fileDirection, statusCode) => {
        fs.readFile(`${fileDirection}`, (err, data) => {
          res.writeHead(statusCode, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        });
    }
  if (req.url === "/") {
    //   fs.readFile("./views/index.html", (err, data) => {
    //     res.writeHead(200, { "Content-Type": "text/html" });
    //     res.write(data);
    //     res.end();
    //   });
      handleReadFile("./views/index.html", 200);
  } else if (req.url === "/about") {
    //   fs.readFile("./views/about.html", (err, data) => {
    //     res.writeHead(200, { "Content-Type": "text/html" });
    //     res.write(data);
    //     res.end();
    //   });
      handleReadFile("./views/about.html", 200);
  } else if (req.url === "/contact") {
    //   fs.readFile("./views/contact.html", (err, data) => {
    //     res.writeHead(200, { "Content-Type": "text/html" });
    //     res.write(data);
    //     res.end();
    //   });
      handleReadFile("./views/contact.html", 200);
  } else {
    //   fs.readFile("./views/err.html", (err, data) => {
    //     res.writeHead(404, { "Content-Type": "text/html" });
    //     res.write(data);
    //     res.end();
    //   });
      handleReadFile("./views/err.html", 404);
  }
})

server.listen(PORT, hostName, () => {
    console.log(`Server is running at http://${hostName}: ${PORT}`);
})

// views folder
// about.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Route</title>
  </head>
  <body>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <h1>About Page</h1>
  </body>
</html>
// contact.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Route</title>
  </head>
  <body>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <h1>Contact Page</h1>
  </body>
</html>
// err.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Route</title>
  </head>
  <body>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <h1> 404 Error is Found!</h1>
  </body>
</html>
//index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Route</title>
  </head>
  <body>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <h1>Home Page</h1>
  </body>
</html>

*** Lesson - 7 ***

// express folder - learning express
// index.js
const app = require("./app");
const PORT = 3000;


app.listen(PORT, () => {
  console.log(`The server is running at http://localhost: ${PORT}`);
});
// app.js
const express = require("express");
// to get the Router() from express
const router = express.Router();
const app = express();
const userRouter = require("./routes/users.route"); // it is router from users.route.js
/*
// http methods...(these are also called RESTful API)
1. C -> create -> POST
2. R -> read -> GET
2. U -> update -> PUT
2. D -> read -> DELETE

app.get("/", (req, res) => {
    res.send("I am a get request at home route.");
    res.end();
})
app.get("/about", (req, res) => {
  res.send("I am a get request at about route.");
  res.end();
});
app.get("/contact", (req, res) => {
  res.send("I am a get request at contact route.");
  res.end();
});
app.get("/error", (req, res) => {
  res.send("I am a get request at error route.");
  res.end();
});

app.get("/", (req, res) => {
  res.send("I am a get request at home route.");
  res.end();
});
app.get("/register", (req, res) => {
  res.send("I am a get request at register route.");
  res.end();
});
app.get("/login", (req, res) => {
  res.send("I am a get request at login route.");
  res.end();
});
// if page is not foumd!
app.use((req, res) => {
    res.send("<h1>404 not found!</h1>");
    res.end();
})
*/
// if i want to use user router
app.use("/api/user/", userRouter); // just to write like this http://localhost:3000/api/user/login, it will work fine.


app.use("/", (req, res) => { // get or use is same.
  res.send("I am a get request at home route.");
  res.end();
});

app.use((req, res) => {
  res.send("<h1>404 not found!</h1>");
  res.end();
});
/*
// we can just get the response of the get property. The browser can only response to the get property. If we want to see the other property such as post, put, delete, we have to use postman.
app.get("/", (req, res) => {
    res.send("I am a get request at home route.")
    res.end();
})
app.post("/", (req, res) => {
  res.send("I am a post request at home route.");
  res.end();
});
app.put("/", (req, res) => {
  res.send("I am a put request at home route.");
  res.end();
});
app.delete("/", (req, res) => {
  res.send("I am a delete request at home route.");
  res.end();
});
*/
module.exports = app;


*** Lesson - 8 ***

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
    <header>
      <h1>User Information</h1>
      <div>
        <form action="/user" method="POST">
          <div>
            <label for="name">Name: </label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label for="age">Age:</label>
            <input type="text" id="age" name="age" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </header>
  </body>
</html>

// index.js
/*
// query parameter
const express = require("express")

const app = express();
const PORT = 3000

// we use get() to read data from the server.
app.get("/", (req, res) => {
    // const id = req.query.id;
    // const age = req.query.age;
    // req.query can be destructured
    const {id, age} = req.query;
    res.send(`<h1>Student's id is: ${id}, and Student's age is: ${age}</h1>`);
})

app.listen(PORT, (() => {
    console.log(`Server is running at http://locaclhost:${PORT}`);
}))

// how to send params from browser http
const express = require("express");

const app = express();
const PORT = 3000;
// http://localhost:3000/userId/102/userAge/34. we have to follow this to send id and age from browser http;
app.get("/userId/:id/userAge/:age", (req, res) => {
    const id = req.params.id;
    const age = req.params.age;
    res.send(`<h1>Student's Id is ${id} and age is ${age}.</h1>`)
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const express = require("express")
const app = express();

const PORT = 3000;

// header id and name will be sent through the postman app.
app.get("/", (req, res) => {
    const id = req.header("id")
    const name = req.header("name")
    res.send(`<h1>Student's Id is: ${id}, and name is: ${name}</h1>`)
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
// x-www-form-urlendcoded key value will sent through postman.
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// raw and json will be sent from body through postman
app.use(bodyParser.json());

app.get("/user", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const PORT = 3000;

// we will use post() to create data to the server.
// we use postman to send data to the server through postman app.

app.post("/user", (req, res) => {
  // raw and json will be sent from body through postman
  // x-www-form-urlendcoded key value will sent through postman.
  const name = req.body.name;
  const age = req.body.age;
  res.send(`<h1>My name is ${name} and I am ${age}.</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http:localehost:${PORT}`);
});


*** Lesson - 10 ***


// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Register</title>
  </head>
  <body>
    <h1>Registration</h1>
    <form action="/register" method="POST">
      <div>
        <label for="fullName">Full Name: </label>
        <input type="text" id="name" name="fullName" />
      </div>
      <button type="submit">Register</button>
    </form>
  </body>
</html>

// index.js
const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3001;

const app = express();

// for changing data to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/register", (req, res) => {
  res.send("HELLO");
});

app.listen(PORT, () => {
    console.log(`Server is running at http:localehost:${PORT}`);

});


*** Lesson - 11 ***


// index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
</head>
<body>
    <header>
        <h1>Calculator</h1>
    </header>
    <main>
        <nav>
            <ul>
                <li><a href="/">Home Page</a></li>
                <li><a href="/triangle">Triangle Page</a></li>
                <li><a href="/circle">Circle Page</a></li>
            </ul>
        </nav>
    </main>
</body>
</html>

// triangle.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Triangle</title>
  </head>
  <body>
    <header>
      <h1>Triangle</h1>
      <nav>
        <ul>
          <li><a href="/">Home Page</a></li>
          <li><a href="/triangle">Triangle Page</a></li>
          <li><a href="/circle">Circle Page</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <form action="/triangle" method="POST">
        <div>
          <label for="triangle">Base: </label>
          <input type="text" id="base" name="base" />
        </div>
        <div>
          <label for="triangle">Hight: </label>
          <input type="text" id="height" name="height" />
        </div>
        <button type="submit">Calculate</button>
      </form>
    </main>
  </body>
</html>

// circle.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Circle</title>
  </head>
  <body>
    <header>
      <h1>Circle Page</h1>
      <nav>
        <ul>
          <li><a href="/">Home Page</a></li>
          <li><a href="/triangle">Triangle Page</a></li>
          <li><a href="/circle">Circle Page</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <form action="/circle" method="POST">
        <div>
          <label for="circle">Circle:</label>
          <input type="text" id="radius" name="radius" />
        </div>
        <button type="submit">Calculate</button>
      </form>
    </main>
  </body>
</html>

//index.js

const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3002;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/");
});
app.get("/triangle", (req, res) => {
  res.sendFile(__dirname + "/triangle.html");
});
app.get("/circle", (req, res) => {
  res.sendFile(__dirname + "/circle.html");
});

app.post("/triangle", (req, res) => {
  const base = req.body.base;
  const height = req.body.height;
  const area = 0.5 * base * height;
  res.send(`<h1>The area of a Triangle is : ${area}</h1>`);
});

app.post("/circle", (req, res) => {
  const radius = req.body.radius;
  const area = Math.PI * radius * radius;
  res.send(`<h1>The area of a Circle is : ${area}</h1>`);
});

app.listen(PORT, () => {
  console.log(`<h1>Server is running at http:localhost:${PORT}</h1>`);
});



*** Lesson - 12 ***

//index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>I am header</h1>
</body>
</html>

//index.js

const express = require("express");
const app = express();

const PORT = 3003;

// id must be a digit.
/*
What does the regex [0 - 9]+ do?
In this example, [0-9] matches any SINGLE character between 0 and 9 (i.e., only a digit), where dash ( - ) denotes the range. The + , known as occurrence indicator (or repetition operator), it indicates one or more occurrences ( 1+ ) of the previous sub-expression. In this case, [0-9]+ matches one or more digits.

// [0-9] means only one digit from 0 to 9.
// [0-9]+ means one or more digit from 0 to 9.
// [0-9]{3} means the combination of only three digit is a must, not more or not less.

app.get("/product/:id([0-9]{3})", (req, res) => {
  res.send(`<h2> ID = ${req.params.id}</h2>`);
});

*/
app.get("/product/:id([0-9]+)", (req, res) => {
  res.send(`<h2> ID = ${req.params.id}</h2>`);
});

app.get("/product/:title([a-zA-Z0-9]+)", (req, res) => {
  res.send(`<h2> Title = ${req.params.title}</h2>`);
});

// If no route is matched, then we can use wild card route to send message..
// * is used for wild card
app.use("*", (req, res) => {
    res.status(404).send({
        message: "404 not found!" // send can send json data...
    })
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localehost:${PORT}`);
});



*** Lesson - 13 ***

.env file

# space cannot be allowed. #(Hash) is used as comment.
# this is a server port number.

# but it should not be sent to the github as security purpose. In this case, we should use gitigore file to protect it from being sent to github repository.

PORT=3004

// index.js

/*

What is .env file?
-> .env file full forom environment file.
-> secret/hidden file - only you can access to it.

Why .env file?
-> to store private environment variables for your application. Example -
    1. http PORT to listen the server
    2. Database URL
    3. API keys etc.
-> GitLab/Heroku support the usage of environment variables.

*/

/*

Step 1: create an .env file in the root directory

Step 2: define environment varialbes(S) using uppercase letters and underscore if more than one word. Example -
    PORT
    DATABASE_URL

Step 3: Assign the values without double quotation and space. Example -
    PORT=3000
    DATABASE_URL=mongodb+srv://medo:demo1234@cluster0.0t13q.mongodbe&w=majority

Step 4: We have to use comment using #(hash) sign. Example -
    # server port
    PORT=3000

Step 5: install dotenv package -> npm install dotenv

Step 6: require dotenv -> require("dotenv").config();

Step 7: Access the env variables from anywhere using process.env.VARIABLE. Example -
    process.env.PORT

Optional -> Dotenv Extension is a nice syntax which highlights .env file.

*/

require("dotenv").config();
const express = require("express");
const app = express();

// I am going to access to the environment variable from .env file and store it to the PORT variable here down below. And alternative port is also set to 3005
const PORT = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.send("Hello, I am home route.");
});

app.listen(PORT, () => {
  console.log(`Server is running at http:localhost:${PORT}`);
});


*** Lesson - 14 ***


//middleware
//index.js
const express = require("express");
const app = express();

const PORT = 3000;

const myMiddleware = (req, res, next) => {
    console.log("This is a Middleware Function!");
    req.currentTime = new Date(Date.now())
    // next() must be called, otherwise (req, res) of app.get() will not work
    next();
}

// common middleware for all route page. So
app.use(myMiddleware);
/*
// no need to write or call myMiddleware in the get mehtod.
app.get("/", myMiddleware, (req, res) => { // next method of middleware will help run app.get() -> res and req.
  console.log("I am home page. " + req.currentTime);
  res.send("<h1>I am home route</h1>");
});
*/

// no need to write or call myMiddleware in the get mehtod.
app.get("/", (req, res) => {
  // next method of middleware will help run app.get() -> res and req.
  console.log("I am home page. " + req.currentTime);
  res.send("<h1>I am home route</h1>");
});

app.get("/about", (req, res) => {
  // next method of middleware will help run app.get() -> res and req. If I do not use myMiddleware and reload the server page, undefined will be shown in the console
  console.log("I am about page. " + req.currentTime);
  res.send("<h1>I am about route</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// error handling route as middleware. Actually all routes are middleware.

app.use((req, res, next) => {
    res.send(`This is an error middleware. 404 bad url request`);
    next();
})

app.use((err, req, res, next) => {
  res.status(500).send(`This is an error middleware. 404 bad url request recommended for all.`);
});



*** Lesson -15 ***

//static Middleware

//index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./css/style.css" />
  </head>
  <body>
    <!-- ./public/images/emran.png does not work-->
    <div class="center">
      <img src="./images/emran.png" alt="logo" />
      <h1>Home Page</h1>
    </div>
  </body>
</html>

//css, and images will be stored in public folder to access.
//index.js
/*
1. Third party middleware -> body-parser, cookie-pareser etc.
2. Application-level middleware -> app.use(), app.METHOD() etc.
3. Router level middleware -> router.use(), router.METHOD() etc.
4. Error handling middleware.
5. Built-in middleware -> express.static, express.json, express.urlencoded etc.

*/

// static middleware works on to static file(img, style.css, etc).
const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    // to send html file, we need to use sendFile().
    res.sendFile(__dirname + "/index.html")
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



*** Lesson - 16 ***


//mvc -> model, view, and controller
// indexFirt.js
// MVC is not the part of nodejs, express.js
// MVC -> (Model, View, Controller)

/*

1. Separation of Concerns (soc) -> (which part is responsible for what)
2. Models (deals with database)
3. Views (what users sees)
4. Routes
5. Controllers (connection point between model and views)
6. Controllers have all the logic

*/

const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

const users = [
  {
    name: "Emran Hossain",
    age: 32,
  },
  {
    name: "Farjana Akter Maya",
    age: 22,
  },
  {
    name: "Nusaiba Jahan Sadifa",
    age: 1,
  },
];

const htmlForm = `
    <form method="POST" action="/users">
        <input type="text" name="name" placeholder="Please Enter Name..." />
        <br>
        <input type="number" name="age" placeholder="Please Enter Age..." />
        <br>
        <button type="submit">Save User</button>
    </form>
`;

app.get("/users", (req, res) => {
    res.send(htmlForm)
})

app.post("/users", (req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const user = {
        name,
        age
    };
    users.push(user);
    res.status(201).json({
        success: true,
        users,
    });
});

app.use((req, res, next) => {
    res.status(404).json({
        message: "resource not found!"
    })
})

app.listen(PORT, (req, res) => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// mvc-start from index.js
//index.js
const express = require("express");
const app = express();
const PORT = 3000;

// View file -> Router file -> Controller file -> Model file -> database -> seen in the http://localhost:3000/users or http://localhost:3000/products

const userRouter = require("./routes/users.route");
const productRouter = require("./routes/products.route");

app.use(express.urlencoded({ extended: true }));


app.use(userRouter);
app.use(productRouter);

app.use((req, res, next) => {
    res.status(404).json({
        message: "resource not found!"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

//now route file
//users.route.js
const express = require("express");

const { getUsers, postUsers } = require("../controllers/users.controller");

const router = express.Router();

router.get("/users", getUsers);

router.post("/users", postUsers);

module.exports = router;

//products.route.js
const express = require("express");

const { getProducts, postProducts } = require("../controllers/products.controller");

const router = express.Router();

router.get("/products", getProducts);

router.post("/products", postProducts);

module.exports = router;

//users.controller.js
const users = require("../models/users.model");
const path = require("path")

exports.getUsers = (req, res) => {
    res.sendFile(path.join(__dirname + "/../views/index.html"))
}

exports.postUsers = (req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const user = {
    name,
    age,
  };
  users.push(user);
  res.status(201).json({
    success: true,
    users,
  });
};

//products.controller.js
const products = require("../models/products.model");
const path = require("path")

// need path module to join the html file to send response.
exports.getProducts = (req, res) => {
    res.sendFile(path.join(__dirname + "/../views/product.html"))
}

exports.postProducts = (req, res) => {
  const name = req.body.name;
  const price = Number(req.body.price);
  const product = {
    name,
    price,
  };
  products.push(product);
  res.status(201).json({
    success: true,
    products,
  });
};

// Now model
// users.model.js
const users = [
  {
    name: "Emran Hossain",
    age: 32,
  },
  {
    name: "Farjana Akter Maya",
    age: 22,
  },
  {
    name: "Nusaiba Jahan Sadifa",
    age: 1,
  },
];

module.exports = users;

// products.model.js
const products = [
  {
    name: "salt",
    price: 32,
  },
  {
    name: "hilsa fish",
    price: 220,
  },
  {
    name: "tomatoes",
    price: 80,
  },
];

module.exports = products;

// html file need to get request.
// views folder
//user.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Users</title>
  </head>
  <body>
    <div>
      <form method="POST" action="/users">
        <input type="text" name="name" placeholder="Please Enter Name..." />
        <br />
        <input type="number" name="age" placeholder="Please Enter Age..." />
        <br />
        <button type="submit">Save User</button>
      </form>
    </div>
  </body>
</html>

//product.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Products</title>
  </head>
  <body>
    <div>
      <form method="POST" action="/products">
        <input type="text" name="name" placeholder="Please Enter Product..." />

        <br />
        <input type="number" name="price" placeholder="Please Enter Price..." />
        <br />
        <button type="submit">Save Product</button>
      </form>
    </div>
  </body>
</html>



*** Lesson - 17 ***

//cors is used to get data from another server through sending request...
// cors is an npm build-in module and it should be installed...

// index.js
const express = require("express");
const app = require("./app");


app.listen((PORT = 4000), () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

//app.js
// CORS -> Cross Origin Resource Sharing
const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

const userRouter = require("./routes/user.route");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(userRouter);

// routes not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "404 not found. This is bad request!",
  });
});

module.exports = app;

// routes folder
// user.route.js
const express = require("express");
const { getUser, createUser } = require("../controllers/user.controller");

const router = express.Router();

router.get("/users", getUser);
router.post("/users", createUser);

module.exports = router;

// controller folder
// user.controller.js
const path = require("path");
const users = require("../models/user.model");

// need path module to join the html file to send response.
exports.getUser = (req, res) => {
   res.sendFile(path.join(__dirname + "/../views/index.html"))
}

exports.createUser = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const user = {
        username,
        email
    };

    users.push(user);
    res.status(201).json({
        success: true,
        users,
    })
};

// model folder
// user.model.js
const users = [
  { username: "Emran Hossain", email: "emranhossain0335@gmail.com" },
  { username: "Nusaiba Jahan Sadifa", email: "nusaibajahan0335@gmail.com" },
];

module.exports = users;


// Views folder
//index.html(for user)
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Views</title>
  </head>
  <body>
    <div>
      <form action="/users" method="POST">
        <div>
          <label for="/">User Name</label>
          <input type="text" id="name" name="username" />
        </div>
        <div>
          <label for="/">User Email</label>
          <input type="email" id="name" name="email" />
        </div>
        <button type="submit">Submit Now</button>
      </form>
    </div>
  </body>
</html>
