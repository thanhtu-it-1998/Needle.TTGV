import React, { useState } from "react";
import { Modal, Input, Table, message, Button, Popconfirm, Image } from "antd";
import "antd/dist/antd.css";
import { deleteData, getData } from "../../../services/axios";
import { Constant } from "./../../../services/Constant";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { AppContext } from "../../../hooks/useGlobalContext";
import { useHistory } from "react-router-dom";
import { ICurrentRoute } from "../../../models/ICurrentRoute";

export const HealthConsultationList = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [idDelete, setIdDelete] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detail, setDetail] = useState<any>();
  const { setCurrentRoute } = React.useContext(AppContext);
  const [listOfHealthAdvice, setListOfHealthAdvice] = React.useState<any>();

  const { push } = useHistory();

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
  React.useEffect(() => {
    if (idDelete !== 0) {
      (async () => {
        await deleteData(
          Constant.URLBASE + "/api/HealthConsultations/" + idDelete
        )
          .then((res) => {
            message.success("Deleted Success ");
            setDataSource([]);
          })
          .catch(() => {
            message.error("Delete vaccine fails");
          });
      })();
    }
  }, [idDelete]);

  React.useEffect(() => {
    if (dataSource.length === 0) {
      (async () => {
        await getData(Constant.URLBASE + "/api/HealthConsultations")
          .then((res) => {
            setDataSource(res.data);
          })
          .catch(() => {
            message.error("Get list vaccine fails");
          });
      })();
    }
  }, [dataSource]);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const showModal = (des: any) => {
    setDetail(des);
    setIsModalVisible(true);
  };
  const FilterByNameInput = (
    <Input
      placeholder="title"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = dataSource.filter((entry) =>
          entry.nameVaccine.includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );

  const confirm = (id: any) => {
    setIdDelete(id);
  };

  const cancel = (e: any) => {
    console.log(e);
    message.error("Click on No");
  };
  const columns = [
    {
      title: FilterByNameInput,
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      dataIndex: "",
      key: "",
      render: (record: any) => (
        <>
          <Button type="link" danger onClick={() => showModal(record)}>
            Detail
          </Button>
          <Button type="link" danger onClick={() => handleEditClick(record.id)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this vaccine?"
            onConfirm={() => confirm(record.id)}
            onCancel={cancel}
            okText="Yes"
            okType="danger"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const handleEditClick = (id: any) => {
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/vaccine/list",
      firstRoute: "Manage Vaccines",
      secondRoute: "Edit",
    };

    setCurrentRoute(currentRoute);
    push("/vaccine/edit/" + id);
  };
  const handleCreateClick = () => {
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/healthConsultation/list",
      firstRoute: "Manage Health Consultations",
      secondRoute: "Create",
    };

    setCurrentRoute(currentRoute);
    push("/healthConsultation/create");
  };
  return (
    <div>
      <span className="session-title">Health Consultation List</span>
      <br />
      <br />
      <Button
        type="primary"
        onClick={handleCreateClick}
        danger
        icon={<PlusOutlined />}
        size="large"
      >
        Create
      </Button>
      <br />
      <br />
      <Table
        columns={columns}
        key="id"
        pagination={{ pageSize: 5 }}
        dataSource={dataSource}
      />
      {detail&&listOfHealthAdvice&& (
        <Modal
          title={detail.title}
          footer={false}
          visible={isModalVisible}
          onCancel={handleModalClose}
        >
          {listOfHealthAdvice.map((e:any)=>{
            console.log(e);
            
            (e.id===detail.idListOfHealthAdvice)&&
              <span className="session-title">{e.title}</span>
          })}
          
          <br />
          <Image width={200} src={detail.image} />

          <p>{detail.context}</p>
        </Modal>
      )}
    </div>
  );
};
