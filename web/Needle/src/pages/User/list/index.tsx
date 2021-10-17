import { Table, Input, Button, message } from "antd";
import React from "react";
import "antd/dist/antd.css";
import { getData } from "../../../services/axios";
import { Constant } from "./../../../services/Constant";
import { DetailModal } from "../detail/DetailModal";
import { ConfirmModel } from "./../detail/ConfirmModel";
import { ICurrentRoute } from "../../../models/ICurrentRoute";
import { AppContext } from "../../../hooks/useGlobalContext";
import { useHistory } from "react-router";

export const UserManager = () => {
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [dataFilter, setDataFilter] = React.useState<any>([]);
  const [listIdSelected, setListIdSelected] = React.useState<any[]>([]);
  const [selectData, setSelectData] = React.useState<any[]>([]);
  const [phoneDetail, setphoneDetail] = React.useState<any>();
  const [isReload, setIsReload] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isConfirmModel, setISConfirmModel] = React.useState(false);
  const { setCurrentRoute } = React.useContext(AppContext);
  const { push } = useHistory();
  React.useEffect(() => {
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/SignUpForVaccines/list",
      firstRoute: "Quản lý tiêm vaccine",
      secondRoute: "Danh sách đăng ký tiêm",
    };

    setCurrentRoute(currentRoute);
    (async () => {
      await getData(
        Constant.URLBASE + "/api/SignUpForVaccines/get-list-vaccinated-person"
      )
        .then((res) => {
          setDataSource(res.data);
        })
        .catch(() => {
          message.error("Get fails");
        });
    })();
  }, [isReload]);

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

  React.useEffect(() => {
    setListIdSelected([]);
    selectData.forEach((e: any) => {
      setListIdSelected([...listIdSelected, e.id]);
    });
  }, [selectData]);

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectData(selectedRows);
    },

    onSelect: (record: any, selected: any, selectedRows: any) => {
      setSelectData(selectedRows);
    },

    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      setSelectData(selectedRows);
    },
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const handleModalConfirmClose = () => {
    setISConfirmModel(false);
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
          setISConfirmModel(true);
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
      <Button
        style={{ marginLeft: "12px" }}
        danger
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
        rowSelection={{ ...rowSelection }}
        dataSource={!dataFilter.length ? dataSource : dataFilter}
      />
      <div>
        <DetailModal
          phoneDetail={phoneDetail}
          handleModalClose={handleModalClose}
          isModalVisible={isModalVisible}
        />
        <ConfirmModel
          isModalVisible={isConfirmModel}
          setISConfirmModel={setISConfirmModel}
          isReload={isReload}
          setIsReload={setIsReload}
          listIdVaccinatePerson={listIdSelected}
          setListIdSelected={setListIdSelected}
          handleModalClose={handleModalConfirmClose}
        />
      </div>
    </>
  );
};
