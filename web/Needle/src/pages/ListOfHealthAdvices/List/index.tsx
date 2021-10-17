import React, { useState } from "react";
import { Input, Table ,message,Button, Popconfirm,Modal} from "antd";
import "antd/dist/antd.css";
import { deleteData, getData } from "../../../services/axios";
import { Constant } from './../../../services/Constant';
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { AppContext } from "../../../hooks/useGlobalContext";
import { useHistory } from 'react-router-dom';
import { ICurrentRoute } from "../../../models/ICurrentRoute";



export const ListHealthAdvice = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [idDelete,setIdDelete] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description,setDescription] = useState("Some contents...");
  const {
    setCurrentRoute,
  } = React.useContext(AppContext);
  const {push} = useHistory();



  React.useEffect(()=>{
    if (idDelete!==0) {
      (async()=>{
        await deleteData(Constant.URLBASE+"/api/ListOfHealthAdvices/"+idDelete).then(res=>{
            message.success("Thành Công");
            setDataSource([]);
        }).catch(()=>{
          message.error("Delete Health Advice fails");
        });
      })();
    }
  },[idDelete]);

  React.useEffect(()=>{
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/HealthAdvices/list",
      firstRoute: "Quản lý danh mục bài viết",
      secondRoute: "Danh sách",
    };

    setCurrentRoute(currentRoute);
         if (dataSource.length===0) {
          (async()=>{
            await getData(Constant.URLBASE+"/api/ListOfHealthAdvices").then(res=>{
                setDataSource(res.data);
            }).catch(()=>{
              message.error("Get list Health Advice fails");
            });
          })();     
         }  
  },[dataSource]);
 
  const handleModalClose = ()=>{
    setIsModalVisible(false);

  }
  const showModal = (des:any) => {
    setDescription(des);
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
          entry.title.toLowerCase().includes(currValue.toLowerCase())
        );
        setDataSource(filteredData);
      }}
    />
  );


  const confirm = (id:any) =>{
    setIdDelete(id)
  }
  
  const  cancel = (e:any)=> {
    console.log(e);
    message.error('Click on No');
  }
  const columns = [
    {
      title: FilterByNameInput,
      dataIndex: "title",
      key: "title",
    },
    {
    dataIndex: '',
    key: '',
    render: (record:any) =><> 
    <Button type="link" danger onClick={()=>showModal(record.description)}>Chi tiết</Button>
    <Button type="link" danger onClick={()=>handleEditClick(record.id)}>Cập nhập</Button>
    <Popconfirm
    title="Bạn chắc chán là muốn xóa danh mục này?"
    onConfirm={()=>confirm(record.id)}
    onCancel={cancel}
    okText="Xóa"
    okType="danger"
    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
    cancelText="Hủy"
  >
    <Button type="link" danger>Xóa</Button>
  </Popconfirm>
    </>,
    }
  ];
  const handleEditClick = (id:any) =>{
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/HealthAdvices/list",
      firstRoute: "Quản lý danh mục bài viết",
      secondRoute: "Cập nhập",
    };

    setCurrentRoute(currentRoute);
    push("/HealthAdvices/edit/"+id);
    }
  const handleCreateClick = ()=>{
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/HealthAdvices/list",
      firstRoute: "Quản lý danh mục bài viết",
      secondRoute: "Tạo mới",
    };

    setCurrentRoute(currentRoute);
    push("/HealthAdvices/create");

  }
    
  return (
    <div>
      <span className="session-title">Quản lý danh mục bài viết</span>
      <br /><br />
      <Button type="primary" onClick={handleCreateClick} danger icon={<PlusOutlined />} size="large">Tạo mới</Button>
      <br /><br />
      <Table columns={columns} 
      key="id"
      pagination={{pageSize:5}}
      dataSource={dataSource}
      />
      <Modal title="Mô tả" footer={false} visible={isModalVisible} onCancel={handleModalClose}>
        <p>{description}</p>
      </Modal>
      </div>
      
  );
}
