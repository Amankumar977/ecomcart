import mongoose from "mongoose";
let connectToDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export default connectToDB;
