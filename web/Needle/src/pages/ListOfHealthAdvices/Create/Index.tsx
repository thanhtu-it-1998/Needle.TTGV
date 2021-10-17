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
    required: "${label} Không được để trống!",
  };

  const layout = {
    labelCol: { span: 2 },
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
              message.success("Thành công");
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
      <span className="session-title">Tạo mới danh mục bài viết</span>
      <br /><br /><br />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" danger htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
