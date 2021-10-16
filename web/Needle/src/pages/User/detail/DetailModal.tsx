import { Button, message, Modal, Table } from "antd";
import React from "react";
import { getData } from "../../../services/axios";
import { Constant } from "../../../services/Constant";

export const DetailModal = (prop: any) => {
  const [detailData, setDetailData] = React.useState<any>();
  const [medicalDeclaration, setMedicalDeclaration] = React.useState<any[]>([]);
  const [detailMedicalDeclaration, setDetailMedicalDeclaration] =
    React.useState<any>();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  React.useEffect(() => {
    if (prop.phoneDetail) {
      (async () => {
        await getData(
          Constant.URLBASE +
            "/api/SignUpForVaccines/get-vaccinated-person?numberPhone=" +
            prop.phoneDetail
        )
          .then((res) => {
            setDetailData(res.data.vaccinatedPerson);
            setMedicalDeclaration(res.data.medicalDeclaration);
          })
          .catch(() => {
            message.error("Get fails");
          });
      })();
    }
  }, [prop.phoneDetail]);

  const columns = [
    {
      title: "Sign Up For Vaccines",
      render: (record: any) => (
        <>
          <Button
            onClick={() => {
              setDetailMedicalDeclaration(record);
              setIsModalVisible(true);
            }}
            type="link"
          >
            Sign Up Injection {record.numberNeedle}
          </Button>
        </>
      ),
    },
  ];
  const handleModalClose = ()=>{
    setIsModalVisible(false);
  }
  return (
    <>
      <Modal
        title="Details"
        footer={false}
        visible={prop.isModalVisible}
        onCancel={prop.handleModalClose}
      >
        <Table
          rowKey="phoneNumber"
          columns={columns}
          dataSource={medicalDeclaration}
        />

        <p>Full Name : {detailData?.fullName}</p>
        <p>Date of birth : {detailData?.dob}</p>
        <p>Gender : {detailData?.gender === 0 ? "Male" : "Female"}</p>
        <p>Phone Number : {detailData?.phoneNumber}</p>
        <p>Insurance Card Number: {detailData?.insuranceCardNumber}</p>
        <p>Identity Card Number : {detailData?.identityCardNumber}</p>
        <p>Email : {detailData?.email}</p>
        <p>City : {detailData?.city}</p>
        <p>District : {detailData?.district}</p>
        <p>Ward : {detailData?.ward}</p>
        <p>Address : {detailData?.address}</p>
        <p>Status : {detailData?.status === true ? "True" : "False"}</p>
        <p>Code : {detailData?.code}</p>
        <Modal
          title="Health Declaration"
          footer={false}
          visible={isModalVisible}
          onCancel={handleModalClose}
        >
          <p>1.Trong vòng 14 ngày ,có tiếp xúc với người bệnh hoặc nghi ngờ mắc Covid : <b>{detailMedicalDeclaration?.standardOne===true?"Có":"Không"}</b> </p>

        </Modal>
      </Modal>
    </>
  );
};
