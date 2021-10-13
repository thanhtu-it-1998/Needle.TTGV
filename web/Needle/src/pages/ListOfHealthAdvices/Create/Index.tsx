import { Form, Input, InputNumber, Button } from "antd";
import React from "react";
import { postData } from "../../../services/axios";
import { Constant } from "../../../services/Constant";
import { useHistory } from "react-router-dom";
import { message } from "antd";
export const HealthAdviceCreate = () => {
  const [newData, setNewData] = React.useState<any>();
  const { push } = useHistory();

  const onFinish = (data: any) => {
    setNewData(data);
  };
  const validateMessages = {
    required: "${label} is required!",
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  React.useEffect(() => {
    if (newData) {
      (async () => {
        const data = {
          ...newData,
        };
        await postData(Constant.URLBASE + "/api/ListOfHealthAdvices", data)
          .then((res) => {
              message.success("Add success .");
              push("/HealthAdvices/list");
          })
          .catch(() => {
            message.error("Add failed .");
          });
      })();
    }
  }, [newData]);
  return (
    <div>
      <span className="session-title">Edit Health Advice</span>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" danger htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
