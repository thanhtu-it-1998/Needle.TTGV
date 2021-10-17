import { Button, Input, message, Table } from "antd";
import { DetailModal } from "../detail/DetailModal";
import React from "react";
import { ICurrentRoute } from "../../../models/ICurrentRoute";
import { getData } from "../../../services/axios";
import { Constant } from "../../../services/Constant";
import { AppContext } from "../../../hooks/useGlobalContext";
import { useHistory } from "react-router";

export const Injected = () => {
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [dataFilter, setDataFilter] = React.useState<any>([]);
  const [phoneDetail, setphoneDetail] = React.useState<any>();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { setCurrentRoute } = React.useContext(AppContext);
  const [isReload,setIsReload] = React.useState(false)
  const { push } = useHistory();

  React.useEffect(() => {
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/SignUpForVaccines/list",
      firstRoute: "Quản lý tiêm vaccine",
      secondRoute: "Danh sách Đã tiêm",
    };

    setCurrentRoute(currentRoute);
        (async () => {
          await getData(
            Constant.URLBASE +
              "/api/SignUpForVaccines/get-list-vaccinated-person-end"
          )
            .then((res) => {
              setDataSource(res.data);
            })
            .catch(() => {
              message.error("Get fails");
            });
        })();
       
    
  },[isReload]);
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
            danger
            onClick={() => {
              setphoneDetail(record.phoneNumber);
              setIsModalVisible(true);
            }}
          >
            Chi tiết
          </Button>
        </>
      ),
    },
  ];
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
        onClick={() => {
          push("/vaccinationConfirm");
        }}
      >
        Xác nhận đã tiêm
      </Button>
      <br /><br />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={!dataFilter.length ? dataSource : dataFilter}
      />
      <DetailModal
        phoneDetail={phoneDetail}
        handleModalClose={handleModalClose}
        isModalVisible={isModalVisible}
      />
    </>
  );
};
