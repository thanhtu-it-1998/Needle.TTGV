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
    required: "${label} không được để trống!",
    types: {
      number: "${label} chỉ được nhập số!",
    },
    number: {
      range: "${label} phải lớn hơn ${min} ",
    },
  };

  const layout = {
    labelCol: { span: 2 },
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
              message.success("Thành công");
              push("/vaccine/list");
            }
          })
          .catch(() => {
            message.error("Add failed .");
          });
      })();
    }
  }, [newVaccine,push]);
  return (
    <div>
      <span className="session-title">Tạo mới Vaccine</span>
      <br /><br /><br />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="nameVaccine" label="Tên Vaccine" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="qty"
          label="Số lượng"
          rules={[{ required: true, type: "number", min: 0 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize  />
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
