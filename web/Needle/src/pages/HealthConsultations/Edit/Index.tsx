import { Form, Input, Select, Button, Image } from "antd";
import React from "react";
import { getData, putData } from "../../../services/axios";
import { Constant } from "../../../services/Constant";
import { useHistory,useParams } from "react-router-dom";
import { message } from "antd";
export const HealthConsultationEdit = () => {
  const [newData, setNewData] = React.useState<any>();
  const [oldData,setOldData] = React.useState<any>();
  const [listOfHealthAdvice, setListOfHealthAdvice] = React.useState<any>();
  const [linkImage, setLinkImage] = React.useState<any>();
  const { push } = useHistory();
  const { id }: any = useParams();
  const onFinish = (data: any) => {
    setNewData(data);
    
  };
  const validateMessages = {
    required: "${label} is required!",
  };

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
  };
  const { Option } = Select;



  function onSearch(val: any) {
    console.log("search:", val);
  }
  React.useEffect(() => {
    if (newData) {
      (async () => {
        const data = {
          ...newData,
          status:true,
          createdDate:new Date(),
          id:id
        };
        await putData(Constant.URLBASE + "/api/HealthConsultations/"+id, data)
          .then((res) => {
            message.success("Update success .");
            push("/healthConsultation/list");
          })
          .catch(() => {
            message.error("Update failed .");
          });
      })();
    }
  }, [newData]);

  React.useEffect(() => {
    if (!oldData) {
      (async () => {
        await getData(Constant.URLBASE + "/api/HealthConsultations/"+id)
          .then((res) => {
            setOldData(res.data);
          })
          .catch(() => {
            message.error("Get list Health Advice fails");
          });
      })();
    }
  
});

  React.useEffect(() => {
      if (!listOfHealthAdvice) {
        (async () => {
          await getData(Constant.URLBASE + "/api/ListOfHealthAdvices")
            .then((res) => {
              setListOfHealthAdvice(res.data);
            })
            .catch(() => {
              message.error("Get list Health Advice fails");
            });
        })();
      }
    
  });

  const handleDisplayImage = (e: any) => {
    setLinkImage(e.target.value);
  };
  return (
    <div>
    <span className="session-title">Cập nhập bài viết</span>
    <br /><br /><br />

    {listOfHealthAdvice&&oldData && (
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={{
          title:oldData.title,
          image:oldData.image,
          idListOfHealthAdvice:oldData.idListOfHealthAdvice,
          context:oldData.context
        }}
      >
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="idListOfHealthAdvice"
          label="Danh mục bài viết"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="Chọn danh mục"
            optionFilterProp="children"
            onSearch={onSearch}
            filterOption={(input: any, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <>
              {listOfHealthAdvice.map((element:any) => (
                <Option value={element.id}>{element.title}</Option>
              ))}
            </>
          </Select>
        </Form.Item>

        <Form.Item name="image" label="Hình ảnh" rules={[{ required: true }]}>
          <Input onChange={handleDisplayImage} placeholder="Nhập liên kết hình ảnh" />
        </Form.Item>
        {<Image width={200} src={!linkImage?oldData.image:linkImage} />}
        <Form.Item
          name="context"
          label="Nội dung"
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize={{ minRows: 6 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" danger htmlType="submit">
            Cập nhập
          </Button>
        </Form.Item>
      </Form>
    )}
  </div>
  );
};
