require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db/models");
const fileMiddleware = require('./middlewares/file');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require('./db/models')
const path = require("path");
const app = express();
const PORT = process.env.PORT ?? 3002;

const session = require("express-session");
const FileStore = require("session-file-store")(session);


const sessionConfig = {
  store: new FileStore(),
  key: process.env.COOKIE_NAME,
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  httpOnly: true,
  cookie: { expires: 24 * 60 * 60e3 },
};


app.use(session(sessionConfig));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
    res.locals.userName = req.session.userName;
  }
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.post('/registration',  fileMiddleware.single('image'), async (req, res) => {
  
  console.log('=========', req.body);//++
  // console.log('=====+++++', req.file);//++

  try {
    const {name, gender, password, email, birth} = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(name, 'name');//++
  let image;
  if(req.file?.filename){
    image = 'http://localhost:3001/images/' + req.file.filename
  } else {
    image = 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600'
  }
  const checkUserEmail = await User.findOne({where: {email: email.toLowerCase()}});
  const checkUserName = await User.findOne({where: {name: name}});

  if(checkUserEmail){
   const message = "A user with this email address already exists. Login or register with a different email address.";
   console.log(error)
   res.json({message})
  } else if(checkUserName){
    const message = "A user with this username already exists. Login or register with another username.";
    console.log(error)
    res.json({message})
  } else {
    
    const newUser = await User.create({
      name,
      birth,
      gender,
      password:hashedPassword,
      email:email.toLowerCase(),
      image,
    })

console.log(newUser.name, 'newUser.name');//--
    req.session.userId = newUser.id;
    req.session.userName = newUser.name;
  
  //   const message = {
  //     to: newUser.email,
  //     subject:"Регистрация почтового адреса",
  //     text: `
  //     Поздравляем вы успешно зарегистрированы!
  //     Ваш логин в личном кабинете : ${newUser.name}
  //     Ваш пароль :  ${password}.
  //     `,
  //   }
  // //  mailer(message);
  
  
    console.log(newUser, 'newUser');//++
    const userInfo = [newUser.id, newUser.name, newUser.email];
   
   return res.status(201).json({userInfo});
  }


  } catch (error) {
    console.log(error.message);
      res.sendStatus(406);
  }
  
})


app.listen(PORT, async () => {
  console.log("Сервер слушает порт", PORT);
  try {
    await sequelize.authenticate();
    console.log("Подключение к БД успешно");
  } catch (error) {
    console.log("Не удалось подключиться к БД");
    console.log(error.message);
  }
});
