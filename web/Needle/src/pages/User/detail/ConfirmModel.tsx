import { message, Modal, Form, Select, Button, DatePicker } from "antd";
import React from "react";
import { getData, postData } from "../../../services/axios";
import { Constant } from "../../../services/Constant";

export const ConfirmModel = (props: any) => {
  const [vaccines, setVaccine] = React.useState<any>();
  const [areas, setAreas] = React.useState<any>();
  const [newData, setNewData] = React.useState<any>();
  const [injectionDate, setInjectionDate] = React.useState<any>();
  const { Option } = Select;
  React.useEffect(() => {
    (async () => {
      await getData(Constant.URLBASE + "/api/SignUpForVaccines/get-list-area")
        .then((res) => {
          setAreas(res.data);
        })
        .catch(() => {
          message.error("Get fails");
        });
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      await getData(
        Constant.URLBASE + "/api/SignUpForVaccines/get-list-vaccines"
      )
        .then((res) => {
          setVaccine(res.data);
        })
        .catch(() => {
          message.error("Get fails");
        });
    })();
  }, []);
  React.useEffect(() => {
    if (newData) {
        if (props.listIdVaccinatePerson.length !== 0 && new Date(injectionDate) > new Date) {
            newData &&
              (async () => {
                await postData(
                  Constant.URLBASE +"​/api/SignUpForVaccines/comfirm-subscriber-vaccines",
                  newData
                )
                  .then((res) => {
                    props.setIsReload(!props.isReload);
                    message.success("Success");
                    props.setISConfirmModel(false);
                    props.setListIdSelected([]);
                  })
                  .catch(() => {
                    message.error("Fails");
                  });
              })();
          }else{
              message.error("Select to continue && injectionDate in future");
          }
    }
  }, [newData]);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (value: any) => {
    var data = {
      ...value,
      injectionDate: injectionDate,
      idVaccinatePerson: props.listIdVaccinatePerson,
    };
    setNewData(data);
  };
  const validateMessages = {
    required: "${label} is required!",
  };
  return (
    <>
      {areas && vaccines && (
        <Modal
          title="Confirm sign up"
          footer={false}
          visible={props.isModalVisible}
          onCancel={props.handleModalClose}
        >
          <Form
            validateMessages={validateMessages}
            {...layout}
            onFinish={onFinish}
          >
            <Form.Item
              name="idVaccine"
              label="Vaccine"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a Vaccine"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children
                    .toString()
                    .toLowerCase()
                    .indexOf(input.toString().toLowerCase()) >= 0
                }
              >
                <>
                  {vaccines.map((element: any) => (
                    <Option
                      disabled={
                        element.qty < props.listIdVaccinatePerson.length
                          ? true
                          : false
                      }
                      value={element.id}
                    >
                      {element.nameVaccine}
                    </Option>
                  ))}
                </>
              </Select>
            </Form.Item>
            <Form.Item name="idArea" label="Area" rules={[{ required: true }]}>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a Area"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children
                    .toString()
                    .toLowerCase()
                    .indexOf(input.toString().toLowerCase()) >= 0
                }
              >
                <>
                  {areas.map((element: any) => (
                    <Option value={element.id}>
                      {element.address}-{element.ward},{element.district},
                      {element.city}
                    </Option>
                  ))}
                </>
              </Select>
            </Form.Item>
            <Form.Item
              name="numberNeedle"
              label="Number Needle"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value={1}>Mũi 1</Option>
                <Option value={2}>Mũi 2</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="injectionDate"
              label="injection Date"
              rules={[{ required: true }]}
            >
              <DatePicker
                onChange={(date: any, dateString: any) => {
                  setInjectionDate(dateString);
                }}
                
              />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" danger htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};
