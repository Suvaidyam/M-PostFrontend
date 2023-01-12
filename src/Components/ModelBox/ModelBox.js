import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import "./model.css";
import { Modal } from "react-responsive-modal";
import { AiOutlineEye } from "react-icons/ai";
import SetEnviroment from "../Home/RightBar/SetEnviroment/SetEnviroment";
const ModelBox = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className=" rounded-md scrollbar-hide">
      <button onClick={onOpenModal}>
        <AiOutlineEye />
      </button>
      <Modal open={open} onClose={onCloseModal} center>
        <SetEnviroment />
      </Modal>
    </div>
  );
};
export default ModelBox;
