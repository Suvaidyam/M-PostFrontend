import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import "./model.css";
import { Modal } from "react-responsive-modal";
import { AiOutlineEye } from "react-icons/ai";
import SetEnviroment from "../Home/RightBar/SetEnviroment/SetEnviroment";
const ModelBox = ({ set }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => {
    setOpen(true);
    set(true);
  };
  const onCloseModal = () => setOpen(false);

  return (
    <div className=" rounded-md scrollbar-hide">
      <button
        className={`hover:bg-blue-200 w-8 h-8 flex justify-center items-center
                             cursor-pointer rounded-md  group ${
                               open === true ? "bg-blue-200" : null
                             }`}
        onClick={onOpenModal}
      >
        <AiOutlineEye />
      </button>
      <Modal open={open} onClose={onCloseModal} center>
        <SetEnviroment />
      </Modal>
    </div>
  );
};
export default ModelBox;
