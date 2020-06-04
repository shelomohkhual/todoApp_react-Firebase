import axios from "axios";

export default axios.create({
  baseURL: "https://us-central1-todoapp-95974.cloudfunctions.net/api",
});
