import React from 'react'
import FeatherIcon from "feather-icons-react";
import { Box, Button, Card, Grid, IconButton, Modal, Typography } from '@mui/material';

const DeleteModal = ({open, onDelete, onClose}) => {

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: 2,
        padding: 0,
      };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={modalStyle}>
                <Box p={3}>
                    <Typography
                        id="modal-modal-title"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                        variant="h2"
                        component="h6"
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <FeatherIcon
                                icon="trash-2"
                                style={{
                                    color: "#F32D2D",
                                    backgroundColor: `#FFDBDB`,
                                    padding: 8,
                                    borderRadius: "50%",
                                    marginRight: 10,
                                }}
                                size={30}
                            />{" "}
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "20px",
                                    lineHeight: "28px",
                                }}
                                component="span"
                            >
                                {" "}
                                Delete Artifacts{" "}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton onClick={onClose}>
                                <FeatherIcon icon="x" size={22} />
                            </IconButton>
                        </Box>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to continue?
                    </Typography>
                    <Typography sx={{ mt: 2, color: "#F32D2D" }}>
                        This action is permanent and cannot be undone
                    </Typography>
                </Box>
                <Grid
                    container
                    p={3}
                    sx={{ bgcolor: "#F7F7F9 " }}
                    justifyContent="flex-end"
                >
                    <Button
                        onClick={onClose}
                        sx={{ mr: 2, color: "black", fontWeight: "bold" }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={onDelete} variant="contained" color="error">
                        Delete
                    </Button>
                </Grid>
            </Card>
        </Modal>
    )
}

export default DeleteModal