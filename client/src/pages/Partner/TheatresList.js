import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { getAllTheatres } from "../../calls/theatres";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TheatreFormModal from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal"
import ShowModal from "./ShowModal";
function TheatresList() {
  const [theatres, setTheatres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const getData = async () => {
    dispatch(showLoading());
    const response = await getAllTheatres();
    const allTheatres = response.data;
    setTheatres(
        allTheatres.map((item) => {
        return { ...item, key: `theatre${item._id}` };
      })
    );
    dispatch(hideLoading());
  };

  const tableHeadings = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (status, data) => {
        if(data.isActive){
            return "Approved"
        }
        return "Pending/Blocked"
      }
    },
    {
      title: "Action",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedTheatre(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTheatre(data);
              }}
            >
              <DeleteOutlined />
            </Button>
            {
              data.isActive && (
                <Button onClick={() => {
                  setIsShowModalOpen(true);
                  setSelectedTheatre(data);
                }}>+ Shows</Button>
              )
            }
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Theatre
        </Button>
      </div>
      <Table dataSource={theatres} columns={tableHeadings} />;
      { isModalOpen && (
        <TheatreFormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTheatre = {selectedTheatre}
          formType={formType}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}

      {
        isDeleteModalOpen && (
          <DeleteTheatreModal
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            selectedTheatre = {selectedTheatre}
            setSelectedTheatre={setSelectedTheatre}
            getData={getData}
          />
        )
      }

      {
        isShowModalOpen && (
          <ShowModal
            isShowModalOpen={isShowModalOpen}
            setIsShowModalOpen={setIsShowModalOpen}
            selectedTheatre = {selectedTheatre}
            setSelectedTheatre={setSelectedTheatre}
            getData={getData}
          />
        )
      }

    </>
  );
}

export default TheatresList;
