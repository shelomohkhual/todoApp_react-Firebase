import axios from "axios";

export default axios.create({
  responseType: "json",
  crossdomain: true,
});
