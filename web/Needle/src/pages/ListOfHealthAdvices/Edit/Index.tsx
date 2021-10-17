import { Form, Input, InputNumber, Button } from "antd";
import React from "react";
import { getData, postData, putData } from "../../../services/axios";
import { Constant } from "../../../services/Constant";
import { IVaccine } from "./../../../models/IVaccine";
import { useHistory ,useParams } from "react-router-dom";
import { message } from "antd";
export const HealthAdviceEdit = () => {
  const [newData, setNewData] = React.useState<IVaccine>();
  const [oldData, setOldData] = React.useState<any>();

  const { push } = useHistory();
  const { id }: any = useParams();

  const onFinish = (data: any) => {
    setNewData(data);
  };
  const validateMessages = {
    required: "${label} không được để trống!",
  };

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
  };

  React.useEffect(()=>{
    if (id&&!oldData) {
      (async()=>{
        await getData(Constant.URLBASE+"/api/ListOfHealthAdvices/"+id).then((res) => {
         setOldData(res.data)
         console.log(res.data);
         
       })
       .catch(() => {
         message.error("get failed .");
       });
      })();
    }
  });

  React.useEffect(() => {
    if (newData) {
      (async () => {
        const data = {
          ...newData,
          id:id
        };
        await putData(Constant.URLBASE + "/api/ListOfHealthAdvices/"+id, data)
          .then((res) => {
              message.success("Thành công");
              push("/HealthAdvices/list");
          })
          .catch(() => {
            message.error("Add failed .");
          });
      })();
    }
  }, [newData,push,id]);


  return (
    <div>
      <span className="session-title">Cập nhật Vaccine</span>
      <br /><br /><br />

    {oldData&&  <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={{
          title:oldData.title,
          description:oldData.description
        }}
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
            Cập nhập
          </Button>
        </Form.Item>
      </Form>}
    </div>
  );
};
