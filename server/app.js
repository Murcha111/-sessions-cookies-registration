require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db/models");
const fileMiddleware = require('./middlewares/file');

const { User } = require('./db/models')
const path = require("path");
const app = express();
const PORT = process.env.PORT ?? 3002;
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/',  fileMiddleware.single('image'), async (req, res) => {
  console.log('=========', req.body.email);
  console.log('=====+++++', req.file);
  try {
    const {name, gender, password, email, birth} = req.body;
    console.log(name, 'name');
  let image;
  if(req.file?.filename){
    image = 'http://localhost:3001/images/' + req.file.filename
  } else {
    image = 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600'
  }
  const newUser = await User.create({
    name,
    birth,
    gender,
    password,
    email,
    image,
  })
  console.log(newUser, 'newUser');
  res.status(201).json(newUser);
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
