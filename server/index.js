import app from "./app.js";
import connectToDB from "./config/dbConfig.js";
const PORT = process.env.PORT;
connectToDB();
app.listen(PORT, () => {
  console.log("Server started at port", PORT);
});
