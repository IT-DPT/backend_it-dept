const express =require('express');
const app = express();
require("dotenv").config();
const cors = require('cors')
const mongoose =require('mongoose')
const PORT =3000 ;
const url = "mongodb+srv://connectitdept:x2FnvrxDpPLhLaUe@cluster0.zpkisx0.mongodb.net/?retryWrites=true&w=majority "
const fileUpload = require('express-fileupload');
const admin = require("./routes/Admin");
const student=require('./routes/Student')
const auth =require('./routes/Auth')
const faculty=require('./routes/Faculty')
app.use(
  cors({
    origin: "*",
  })
);

// app.use(cors({
//   origin: "*",
// }));

app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
  })
);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.set("strictQuery", false);

mongoose.connect(url,options)
  .then(() => {
    console.log("Connected to MongoDB");
  
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


app.use("/api/v1",admin);
app.use("/api/v2",student);
app.use("/api/v3",auth)
app.use("/api/v4",faculty)

app.listen(PORT,()=>{
    console.log('Running......',PORT);
})