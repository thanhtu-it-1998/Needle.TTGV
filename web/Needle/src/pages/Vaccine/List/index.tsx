import React, { useState } from "react";
import { Modal, Input, Table, message, Button } from "antd";
import "antd/dist/antd.css";
import { IVaccine } from "./../../../models/IVaccine";
import { getData } from "../../../services/axios";
import { Constant } from "./../../../services/Constant";
import { PlusOutlined } from "@ant-design/icons";
import { AppContext } from "../../../hooks/useGlobalContext";
import { useHistory } from "react-router-dom";
import { ICurrentRoute } from "../../../models/ICurrentRoute";

export const ListVaccine = () => {
  const [dataSource, setDataSource] = useState<IVaccine[]>([]);
  const [value, setValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState("Some contents...");
  const { setCurrentRoute } = React.useContext(AppContext);
  const { push } = useHistory();

  React.useEffect(() => {
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/vaccine/list",
      firstRoute: "Quản lý Vaccines",
      secondRoute: "Danh sách",
    };

    setCurrentRoute(currentRoute);
    if (dataSource.length === 0) {
      (async () => {
        await getData(Constant.URLBASE + "/api/Vaccines")
          .then((res) => {
            setDataSource(res.data);
          })
          .catch(() => {
            message.error("Get list vaccine fails");
          });
      })();
    }
  }, [dataSource,setCurrentRoute]);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const showModal = (des: any) => {
    setDescription(des);
    setIsModalVisible(true);
  };
  const FilterByNameInput = (
    <Input
      placeholder="Tên Vaccine"
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

  const columns = [
    {
      title: FilterByNameInput,
      dataIndex: "nameVaccine",
      key: "nameVaccine",
    },
    {
      title: "Số lượng",
      dataIndex: "qty",
      key: "qty",
      sorter: {
        compare: (a: any, b: any) => a.qty - b.qty,
        multiple: 1,
      },
    },
    {
      dataIndex: "",
      key: "",
      render: (record: any) => (
        <>
          <Button
            type="link"
            danger
            onClick={() => showModal(record.description)}
          >
            Chi tiết
          </Button>
          <Button type="link" danger onClick={() => handleEditClick(record.id)}>
            Cập nhập
          </Button>
        </>
      ),
    },
  ];
  const handleEditClick = (id: any) => {
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/vaccine/list",
      firstRoute: "Quản lý Vaccines",
      secondRoute: "Cập nhâpj",
    };

    setCurrentRoute(currentRoute);
    push("/vaccine/edit/" + id);
  };
  const handleCreateClick = () => {
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/vaccine/list",
      firstRoute: "Quản lý Vaccines",
      secondRoute: "Tạo mới",
    };

    setCurrentRoute(currentRoute);
    push("/vaccine/create");
  };
  return (
    <div>
      <span className="session-title">Danh sách Vaccine</span>
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
        title="Mô tả"
        footer={false}
        visible={isModalVisible}
        onCancel={handleModalClose}
      >
        <p>{description}</p>
      </Modal>
    </div>
  );
};
