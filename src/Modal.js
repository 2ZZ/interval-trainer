import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";

const Modal = ({ isOpen, onClose, children, isMobile }) => {
  if (!isOpen) return null;

  return (
    <Box
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
      <Box
        style={{
          position: "relative",
          backgroundColor: "white",
          padding: isMobile ? "10px" : "40px",
          paddingTop: isMobile ? "40px" : "40px",
          borderRadius: "5px",
          width: isMobile ? "95%" : "50%",
          height: isMobile ? "95%" : "70%",
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

        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Select Workout
        </Typography>

        {children}
      </Box>
    </Box>
  );
};

export default Modal;
