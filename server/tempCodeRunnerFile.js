import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";

// These two below code will allow us to set path properly
import path from "path";
import { fileURLToPath } from "url";


/* CONFIGURATIONS*/   //This will include all middleware configurations.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());

//Here below code is used to set the directory where we keep our assets like we are saving here images locally.
app.use("/assets",express.static(path.join(__dirname, 'public/assets')));



/* FILE STORAGE*/
//this info is from the github repo of multer.

//if anyone is uploade file on website it will store it on public/asset folder

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "public/assets");
    },
    filename:function(req,file,cb){
        cb(null, file.originalname);
    }

});

const upload = multer({storage});//help us to save it.

/* MONGOOSE SETUP */
const PORT =6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));