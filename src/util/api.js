import axios from "axios";

export default axios.create({
  proxy: "https://us-central1-todoapp-95974.cloudfunctions.net/api",
});
