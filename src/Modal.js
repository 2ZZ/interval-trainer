import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          padding: "50px",
          borderRadius: "5px",
          width: "50%",
          height: "70%",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </div>
    </div>
  );
};

export default Modal;
