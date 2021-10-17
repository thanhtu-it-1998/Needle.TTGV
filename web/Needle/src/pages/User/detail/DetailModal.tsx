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
          <p>1. Trong vòng 14 ngày ,có tiếp xúc với người bệnh hoặc nghi ngờ mắc Covid : <b>{detailMedicalDeclaration?.standardOne===true?"Có":"Không"}</b> </p>
          <p>2. Trong 14 ngày có tiếp xúc với người từ nước có dịch Covid :  <b>{detailMedicalDeclaration?.standardTwo===true?"Có":"Không"}</b></p>
          <p>3. Trong 14 ngày có tiếp xúc với người có biểu hiện ho-sốt-khó thở-đau họng : <b>{detailMedicalDeclaration?.standardThree===true?"Có":"Không"}</b></p>
          <p><b>Trong 14 ngày gần đây :  </b></p>
          <p>1: Sốt : <b>{detailMedicalDeclaration?.standardFour===true?"Có":"Không"}</b></p>
          <p>2: Ho : <b>{detailMedicalDeclaration?.standardFive===true?"Có":"Không"}</b></p>
          <p>3: Khó thở : <b>{detailMedicalDeclaration?.standardSix===true?"Có":"Không"}</b></p>
          <p>4: Viêm phổi : <b>{detailMedicalDeclaration?.standardSeven===true?"Có":"Không"}</b></p>
          <p>5: Đau họng : <b>{detailMedicalDeclaration?.standardEight===true?"Có":"Không"}</b></p>
          <p>6: Mệt mỏi : <b>{detailMedicalDeclaration?.standardNine===true?"Có":"Không"}</b></p>
          <p>7: Giảm hoặc mất khứu giác : <b>{detailMedicalDeclaration?.standardTen===true?"Có":"Không"}</b></p>
          <p>8: Các triệu chứng khác : <b>{detailMedicalDeclaration?.standardEleven}</b></p>
          <p><b>Hiện đang mắc bệnh :  </b></p>
          <p>1: Gan mãn tính : <b>{detailMedicalDeclaration?.standardTwelve===true?"Có":"Không"}</b></p>
          <p>2: Máu mãn tính : <b>{detailMedicalDeclaration?.standardThirteen===true?"Có":"Không"}</b></p>
          <p>3: Phổi mãn tính : <b>{detailMedicalDeclaration?.standardFourteen===true?"Có":"Không"}</b></p>
          <p>4: Thận mãn tính : <b>{detailMedicalDeclaration?.standardFifteen===true?"Có":"Không"}</b></p>
          <p>5: Tim mạch : <b>{detailMedicalDeclaration?.standardSixteen===true?"Có":"Không"}</b></p>
          <p>6: Huyết áp cao : <b>{detailMedicalDeclaration?.standardSeventeen===true?"Có":"Không"}</b></p>
          <p>7: HIV hoặc suy giảm miễn dịch : <b>{detailMedicalDeclaration?.standardEighteen===true?"Có":"Không"}</b></p>
          <p>8: Người ghép tạng hặc tủy , sương : <b>{detailMedicalDeclaration?.standardNineteen}</b></p>
          <p>9: Tiểu đường : <b>{detailMedicalDeclaration?.standardTwenty===true?"Có":"Không"}</b></p>
          <p>10: Ung thư : <b>{detailMedicalDeclaration?.standardTwentyOne===true?"Có":"Không"}</b></p>
          <p>11: Đang trong giai đoạn thai kỳ : <b>{detailMedicalDeclaration?.standardTwentyTwo===true?"Có":"Không"}</b></p>
         
        </Modal>
      </Modal>
    </>
  );
};
