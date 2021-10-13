import { Form, Input, InputNumber, Button } from "antd";
import React from "react";
import { postData } from "../../../services/axios";
import { Constant } from "../../../services/Constant";
import { IVaccine } from "./../../../models/IVaccine";
import { useHistory } from "react-router-dom";
import { message } from "antd";
export const VaccineCreate = () => {
  const [newVaccine, setNewVaccine] = React.useState<IVaccine>();
  const { push } = useHistory();

  const onFinish = (vaccine: IVaccine) => {
    setNewVaccine(vaccine);
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be bigger ${min} ",
    },
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  React.useEffect(() => {
    if (newVaccine) {
      (async () => {
        const data = {
          ...newVaccine,
        };
        await postData(Constant.URLBASE + "/api/Vaccines", data)
          .then((res) => {
            if (res.status === 201) {
              message.success("Add success .");
              push("/vaccine/list");
            }
          })
          .catch(() => {
            message.error("Add failed .");
          });
      })();
    }
  }, [newVaccine]);
  return (
    <div>
      <span className="session-title">Add Vaccine</span>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="nameVaccine" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="qty"
          label="Quantity"
          rules={[{ required: true, type: "number", min: 0 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize  />
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
