import { message } from "antd";
import { useHistory } from "react-router-dom";

export const useAuthen = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");

  if (!token) {
    message.warning("You must login to continue.");
    history.push("/login");
  }
};
