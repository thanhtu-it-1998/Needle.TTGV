import { Table, Input, Button, message, Modal, Popconfirm } from "antd";
import React from "react";
import "antd/dist/antd.css";
import { getData, postData } from "../../../services/axios";
import { Constant } from "./../../../services/Constant";
import { ICurrentRoute } from "../../../models/ICurrentRoute";
import { AppContext } from "../../../hooks/useGlobalContext";
import { useHistory } from "react-router";
import { Select } from "antd";
export const VaccinationConfirm = () => {
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [dataFilter, setDataFilter] = React.useState<any>([]);
  const [isReload, setIsReload] = React.useState(false);
  const [dataConfirm, setDataConfirm] = React.useState<any>();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [medicalDeclaration, setMedicalDeclaration] = React.useState<any[]>();
  const [idMedicalDeclaration, setIDMedicalDeclaration] = React.useState();
  const [injectIndex, setInjectIndex] = React.useState(1);
  const [phoneDetail, setphoneDetail] = React.useState<any>();
  const { setCurrentRoute } = React.useContext(AppContext);
  const { push } = useHistory();
  const { Option } = Select;
  React.useEffect(() => {
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/SignUpForVaccines/list",
      firstRoute: "Quản lý tiêm vaccine",
      secondRoute: "Xác nhận tiêm",
    };

    setCurrentRoute(currentRoute);
    (async () => {
      await getData(
        Constant.URLBASE +
          "/api/SignUpForVaccines/get-list-vaccinated-person-ready"
      )
        .then((res) => {
          setDataSource(res.data);
        })
        .catch(() => {
          message.error("Get fails");
        });
    })();
  }, [isReload]);
  React.useEffect(() => {
    if (phoneDetail) {
      (async () => {
        await getData(
          Constant.URLBASE +
            "/api/SignUpForVaccines/get-vaccinated-person?numberPhone=" +
            phoneDetail
        )
          .then((res) => {
            setMedicalDeclaration(res.data.medicalDeclaration);
            console.log(res.data.medicalDeclaration);
          })
          .catch(() => {
            message.error("Get fails");
          });
      })();
    }
  }, [phoneDetail]);
  React.useEffect(() => {
    if (dataConfirm) {
      (async () => {
        await postData(
          Constant.URLBASE + "/api/SignUpForVaccines/post-active-inforperson",
          dataConfirm
        )
          .then((res: any) => {
            setIsReload(!isReload);
          })
          .catch(() => {
            message.error("fails");
          });
      })();
    }
  },[]);
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      width: "auto",
    },
    {
      title: "Số CMND",
      dataIndex: "identityCardNumber",
      key: "identityCardNumber",
      width: "auto",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "auto",
    },
    {
      title: "Thành phố",
      dataIndex: "city",
      width: "auto",
      key: "city",
    },
    {
      title: "Quận / Huyện",
      dataIndex: "district",
      width: "auto",
      key: "district",
    },
    {
      dataIndex: "",
      key: "",
      render: (record: any) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setIsModalVisible(true);
              setphoneDetail(record.phoneNumber);
            }}
            danger
          >
            Xác nhận đã tiêm
          </Button>
        </>
      ),
    },
  ];
  function handleChange(value: any) {
    medicalDeclaration?.forEach((e) => {
      if (e.numberNeedle === value) {
        setIDMedicalDeclaration(e.id);
        setInjectIndex(value);
      }
    });
  }
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Input.Search
        placeholder="Nhập từ khóa : tìm kiếm theo tất cả các trường"
        enterButton
        onSearch={(e) => {
          const filteredData = dataSource.filter((o) =>
            Object.keys(o).some((k) =>
              String(o[k]).toLowerCase().includes(e.toLowerCase())
            )
          );
          setDataFilter(filteredData);
        }}
      />
      <br />
      <br />
      <Button
        danger
        onClick={() => {
          const currentRoute: ICurrentRoute = {
            firstRouteUrl: "/SignUpForVaccines/list",
            firstRoute: "Quản lý tiêm vaccine",
            secondRoute: "Danh sách đăng ký tiêm",
          };

          setCurrentRoute(currentRoute);
          push("/SignUpForVaccines/list");
        }}
      >
        Xác nhận đăng ký tiêm
      </Button>
      <Button
        style={{ marginLeft: "12px" }}
        danger
        type="default"
        onClick={() => {
          push("/injected");
        }}
      >
        Danh sách đã tiêm
      </Button>
      <br />
      <br />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={!dataFilter.length ? dataSource : dataFilter}
      />
      <Modal
        onCancel={handleModalClose}
        footer={false}
        title="Xác nhận đã tiêm"
        visible={isModalVisible}
      >
        <Select defaultValue={3} onChange={handleChange}>
          <Option value={3}>Đã tiêm</Option>
          <Option value={1}>Mũi 1</Option>
          <Option value={2}>Mũi 2</Option>
        </Select>
        <br />
        <br />
        <br />
        <Button
          danger
          onClick={() => {
            var data = {
              id: idMedicalDeclaration,
              numberNeedle: injectIndex,
              active: true,
            };
            if (idMedicalDeclaration) {
              setDataConfirm(data);
            } else {
              message.warning("Mũi tiêm chưa được đăng ký !");
              console.log(data);
            }
          }}
        >
          Xác nhận
        </Button>
      </Modal>
      <div></div>
    </>
  );
};
