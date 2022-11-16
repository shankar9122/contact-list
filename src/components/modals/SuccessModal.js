import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, Grid, IconButton } from '@mui/material';
import FeatherIcon from 'feather-icons-react'
import { useNavigate } from 'react-router-dom'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    padding: 0
};


export default function SuccessModal({ openModal, title, sub_title, onCloseUrl }) {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
        navigate(onCloseUrl || -1)
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <Box p={3} textAlign="center" position={"relative"}>
                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <FeatherIcon icon='check' style={{
                                    color: "white",
                                    backgroundColor: `#249F5D`,
                                    padding: 8,
                                    borderRadius: '50%',
                                    marginRight: 10
                                }} size={38} />
                            </Box>
                            <Box position={"absolute"} right={4}>
                                <IconButton onClick={handleClose}>
                                    <FeatherIcon icon='x' size={22} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Typography variant='h5' fontWeight={700} sx={{ mt: 2 }}>
                            {title || 'New user Created'}
                        </Typography>
                        <Typography variant='body2' sx={{ mt: 2, color: "##6F727A" }}>
                            {sub_title || " Successfully Created new employee Record."}
                        </Typography>
                    </Box>
                    <Grid container p={3} sx={{ bgcolor: "#F7F7F9 " }} justifyContent="flex-end">
                        <Button variant='contained' onClick={handleClose} sx={{ mr: 2, fontWeight: 'bold' }} >Okay</Button>
                        {/* <Button onClick={handleDelete} variant='contained' color='error'>Delete</Button> */}
                    </Grid>
                </Card>
            </Modal>
        </div>
    );
}