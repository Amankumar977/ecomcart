import { useEffect } from "react";
import axios from "axios";
function App() {
  useEffect(() => {
    let checkCors = async () => {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}`);
      console.log(response.data.message);
    };
    checkCors();
  }, []);
  return <></>;
}

export default App;
