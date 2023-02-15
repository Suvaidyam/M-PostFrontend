import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import CreateWorkSpace from "../Header/CreateWorkSpace/CreateWorkSpace";
import "./model.css";
import { Modal } from "react-responsive-modal";
const WorkSpacePopup = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className=" rounded-md scrollbar-hide">
      <button onClick={onOpenModal}>Create WorkSpace</button>
      <Modal open={open} onClose={onCloseModal} center>
        <CreateWorkSpace />
      </Modal>
    </div>
  );
};
export default WorkSpacePopup;
