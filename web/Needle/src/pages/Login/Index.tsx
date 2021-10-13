import { AxiosResponse } from "axios";
import "./Index.scss";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { postData } from "../../services/axios";
import logo from "./../../resources/images/Needle.png";
import { Image } from 'antd';
import { useContext } from 'react';
import { AppContext } from "../../hooks/useGlobalContext";
import { Constant } from "../../services/Constant";
const layout = {
  wrapperCol: {
    sm: {
      span: 4,
      offset: 10,
    },
  },
};

export function Login(props: any) {
  let history = useHistory();
  const { setToken } = useContext(AppContext);
  const onFinish = async (values: any) => {
    const data = {
      numberPhone: values.phone,
      password: values.password,
    };
   await postData(Constant.URLBASE+"/api/account/login", data)
      .then((response: AxiosResponse) => {
        localStorage.setItem("token", response.data.token);
        const token = localStorage.getItem("token");
        setToken(token);
        history.push("/home");
      })
      .catch((error) => {
        message.error("Invalid username or password .");
      });
  };
  return (
    <div >
      <br></br>
      <div className="center">
      <Image
      width="auto"
      className="logo-img"
      src={logo}
    />
      </div>

      <div className="login-title center">Log In</div>

      <div>
        <Form
          {...layout}
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please input your phone number!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Phone"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="center">
            <Button type="primary" danger htmlType="submit">
              <p>
                Log in <i className="fas fa-sign-in-alt"></i>
              </p>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Login;
