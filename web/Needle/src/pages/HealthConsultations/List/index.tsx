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
  const [idDetail, setIdDetail] = useState<any>();

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
            message.success("Thành công");
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

  React.useEffect(() => {
    if (idDetail) {
      (async () => {
        await getData(Constant.URLBASE + "/api/HealthConsultations/" + idDetail)
          .then((res) => {
            setDetail(res.data);
            setIsModalVisible(true);
          })
          .catch(() => {
            message.error("Get fails");
          });
      })();
    }
  }, [idDetail]);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const showModal = (idDetail: any) => {
    setIdDetail(idDetail);
    setIsModalVisible(true);

  };
  const FilterByNameInput = (
    <Input
      placeholder="Tiêu đề"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = dataSource.filter((entry) =>
          entry.nameVaccine.toLowerCase().includes(currValue.toLowerCase())
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
      title: "Ngày tạo ",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      dataIndex: "",
      key: "",
      render: (record: any) => (
        <>
          <Button type="link" danger onClick={() => showModal(record.id)}>
            Chi tiết
          </Button>
          <Button type="link" danger onClick={() => handleEditClick(record.id)}>
            Cập nhập
          </Button>
          <Popconfirm
            title="Are you sure to delete this vaccine?"
            onConfirm={() => confirm(record.id)}
            onCancel={cancel}
            okText="Xóa"
            okType="danger"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            cancelText="Hủy"
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const handleEditClick = (id: any) => {
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/healthConsultation/list",
      firstRoute: "Quản lý bài viết",
      secondRoute: "Cập nhập",
    };

    setCurrentRoute(currentRoute);
    push("/healthConsultation/edit/" + id);
  };
  const handleCreateClick = () => {
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/healthConsultation/list",
      firstRoute: "Quản lý bài viết",
      secondRoute: "Tạo mới",
    };

    setCurrentRoute(currentRoute);
    push("/healthConsultation/create");
  };
  return (
    <div>
      <span className="session-title">Quản lý bài viết</span>
      <br />
      <br />
      <Button
        type="primary"
        onClick={handleCreateClick}
        danger
        icon={<PlusOutlined />}
        size="large"
      >
        Tạo mới
      </Button>
      <br />
      <br />
      <Table
        columns={columns}
        key="id"
        pagination={{ pageSize: 5 }}
        dataSource={dataSource}
      />
        <Modal
          title={detail?.title}
          footer={false}
          visible={isModalVisible}
          onCancel={handleModalClose}
        >
              <span className="session-title">{detail?.listOfHealthAdvice?.title}</span>

          <br />
          <Image width={200} src={detail?.image} />

          <p>{detail?.context}</p>
        </Modal>
    </div>
  );
};
