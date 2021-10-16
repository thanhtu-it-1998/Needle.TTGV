import { Table, Input, Button, message, Modal } from "antd";
import React from "react";
import "antd/dist/antd.css";
import { getData } from "../../../services/axios";
import { Constant } from "./../../../services/Constant";
import { DetailModal } from "../detail/DetailModal";
import { ConfirmModel } from "./../detail/ConfirmModel";

export const UserManager = () => {
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [dataFilter, setDataFilter] = React.useState<any>([]);
  const [listIdSelected, setListIdSelected] = React.useState<any[]>([]);
  const [selectData, setSelectData] = React.useState<any[]>([]);
  const [phoneDetail, setphoneDetail] = React.useState<any>();

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isConfirmModel, setISConfirmModel] = React.useState(false);

  React.useEffect(() => {
    if (dataSource.length === 0) {
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
    }
  });

  const columns = [
    {
      title: "FullName",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Identity Card Number",
      dataIndex: "identityCardNumber",
      key: "identityCardNumber",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "City",
      dataIndex: "city",
      width: "30%",
      key: "city",
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
            Detail
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
        placeholder="Filter"
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
      <br /><br />
      <Button danger onClick={() => {
        setISConfirmModel(true)
      }}>Confirm sign up</Button>
      <br /><br />
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

          listIdVaccinatePerson={listIdSelected}
          handleModalClose = {handleModalConfirmClose}
        />
      </div>
    </>
  );
};
