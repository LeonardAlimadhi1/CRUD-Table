import React, { useState } from "react";
import { useUsers, useDeleteUser } from "../../api/api";
import ActionButton from "../../Components/buttons/actionButton/actionButton";
import "./CRUDTable.css";
import AddPopup from "../../Components/addPopup/addPopup";
import EditPopup from "../../Components/editPopup/editPopup";
import { ReactComponent as AddIcon } from "../../Assets/addIcon.svg";
import SimpleButton from "../../Components/buttons/simpleButton/simpleButton";

const CRUDTable = () => {
  const { isLoading, data, isError } = useUsers();
  const deleteMutation = useDeleteUser();
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [userData, setUserData] = useState(null);

  const onHide = () => {
    setIsAdd(false);
    setIsEdit(false);
  };

  if (isError) {
    return <h2>Error...</h2>;
  }
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="pageContainer">
      {isAdd ? (
        <AddPopup isVisible onHide={onHide} />
      ) : isEdit ? (
        <EditPopup isVisible userData={userData} onHide={onHide} />
      ) : null}

      <div className="buttonContainer">
        <SimpleButton
          Text={"Create New User"}
          Icon={true}
          onClick={() => setIsAdd(true)}
        >
          <AddIcon className="imgStyle" />
        </SimpleButton>
      </div>
      <div className="tableContainer">
        <div className="headerContainer">
          <span className="tableCell">Id</span>
          <span className="tableCell">Name</span>
          <span className="tableCell">Email</span>
          <span className="tableCell">Phone</span>
          <span className="tableCell">Actions</span>
        </div>
        <div className="bodyContainer">
          {data.map((user, index) => (
            <div key={index} className="tableRow">
              <div className="tableCell">{user.id}</div>
              <div className="tableCell">{user.name}</div>
              <div className="tableCell">{user.email}</div>
              <div className="tableCell">{user.phone}</div>
              <div className="tableCell">
                <div className="actionButtonContainer">
                  <ActionButton
                    isEdit
                    onClick={() => {
                      setUserData(user);
                      setIsEdit(true);
                    }}
                  />
                  <ActionButton
                    isEdit={false}
                    onClick={() => deleteMutation(user.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CRUDTable;
