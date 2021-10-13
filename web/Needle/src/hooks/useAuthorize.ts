import { message } from "antd";
import { useHistory } from "react-router-dom";
export const useCheckIsAdmin = (role : string) => {
  const history = useHistory();
  const token = localStorage.getItem("token");



};
