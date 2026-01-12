import {diskStorage} from "multer"
import { extname } from "path"
export const multerOption = {
    storage: diskStorage({
        destination:"./public",
        filename:(req,file,cb)=>{
         const fileName =  Date.now() + extname(file.originalname) 
         cb(null,fileName)
        }
    })
}