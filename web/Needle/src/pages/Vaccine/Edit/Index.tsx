import { Form, Input, InputNumber, Button } from "antd";
import React from "react";
import { getData, putData } from "../../../services/axios";
import { Constant } from "../../../services/Constant";
import { IVaccine } from "./../../../models/IVaccine";
import { useHistory ,useParams } from "react-router-dom";
import { message } from "antd";
export const VaccineEdit = () => {
  const [newVaccine, setNewVaccine] = React.useState<IVaccine>();
  const [oldVaccine, setOldVaccine] = React.useState<any>();

  const { push } = useHistory();
  const { id }: any = useParams();

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
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
  };

  React.useEffect(()=>{
    if (id&&!oldVaccine) {
      (async()=>{
        await getData(Constant.URLBASE+"/api/Vaccines/"+id).then((res) => {
         setOldVaccine(res.data)
         console.log(res.data);
         
       })
       .catch(() => {
         message.error("get failed .");
       });
      })();
    }
  });

  React.useEffect(() => {
    if (newVaccine) {
      (async () => {
        const data = {
          ...newVaccine,
          id:id
        };
        await putData(Constant.URLBASE + "/api/Vaccines/"+id, data)
          .then((res) => {
              message.success("Cập nhâp thành công");
              push("/vaccine/list");
          })
          .catch(() => {
            message.error("Add failed .");
          });
      })();
    }
  }, [newVaccine,push,id]);


  return (
    <div>
      <span className="session-title">Cập nhập Vaccine</span>
      <br /><br /><br />

    {oldVaccine&&  <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={{
          nameVaccine:oldVaccine.nameVaccine,
          qty:oldVaccine.qty,
          description:oldVaccine.description
        }}
        validateMessages={validateMessages}
      >
        <Form.Item name="nameVaccine" label="Name" rules={[{ required: true }]}>
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
            Cập nhập
          </Button>
        </Form.Item>
      </Form>}
    </div>
  );
};
