import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ModalDashboard = ({
  open,
  handleOpenModal,
  handleRemoveOrder,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const box = {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: "10px",
  };

  const btn = {
    margin: "0px 10px 0px 10px"
  }


  return (
    <Modal
      open={open}
      onClose={handleOpenModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{ borderBottom: 1 }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Are you sure?
        </Typography>
        <Typography sx={{ mt: 2 }} id="modal-modal-description">
          Do you want to permanently delete this order?
        </Typography>
        <Box sx={box}>
          <Button
            sx={btn}
            onClick={handleRemoveOrder}
            variant="contained"
            href="#contained-buttons"
          >
            Yes
          </Button>
          <Button
           sx={btn}
            onClick={handleOpenModal}
            variant="contained"
            href="#contained-buttons"
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDashboard;
