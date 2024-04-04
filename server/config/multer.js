import multer from "multer";
const storage = multer.diskStorage({});
let upload = multer({ storage: storage });
export default upload;
