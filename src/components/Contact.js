import React, { useEffect, useState } from 'react'
import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import PageContainer from './PageContainer'
import MuiAlert from "@mui/material/Alert";
import { Box } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import SuccessModal from './modals/SuccessModal';
import Spinner from "./Spinner/Spinner"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Contact() {
  let params = useParams();
  const navigate = useNavigate();
  const [contactData, setContactData] = useState({
    id: Date.now()
  });
  const [contactList, setContactList] = useState([])
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();

  useEffect(() => {
    let localData = window.localStorage.contactList;
    let data = localData === undefined ? [] : JSON.parse(localData);

    setContactList([...data]);
    if (params.id) {
      let getData = data?.filter(obj => obj.id == params.id)[0];
      console.log(getData)
      setContactData(getData)
    }
    setTimeout(() => setLoader(false), 50)
  }, []);


  const snackbarHandler = (message, status, isTrue) => {
    setMessage(message);
    setStatus(status);
    setOpen(isTrue);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setContactData({
      ...contactData,
      [name]: value
    })
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    toBase64(file).then(base64 => {
      setContactData({
        ...contactData,
        profilePic: base64
      })
    })
  };


  const handleSave = () => {
    console.log(contactData);
    let listData = [];
    let filterData = [...contactList];
    const { name, phone, type, } = contactData;

    if (!name || !phone || !type) {
      return snackbarHandler("Please fill all the mandatory fields.", "error", true)
    } else if (phone.length != 10) {
      return snackbarHandler("Phone number must be 10 degit.", "error", true)
    }


    if (params.id) {
      filterData = filterData?.filter(obj => obj.id != params.id);
    }
    listData = [...filterData, contactData];
    window.localStorage.contactList = JSON.stringify(listData);
    setShowSuccessModal(true);
  };


  return (loader ? <Spinner /> :
    <PageContainer title={params.id ? params.mode === "view" ? "View Contact" : "Edit Contact" : "Add Contact"}>
      <Grid container spacing={2}>
        <Grid md={4} item xs={11} lg={4}>
          <TextField
            disabled={params.mode === "view"}
            fullWidth
            label="Name"
            name="name"
            size="small"
            value={contactData.name}
            onChange={handleChange}
            required={true}
            sx={{
              "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
                color: 'red',
              },
            }}
          />
        </Grid>
        <Grid md={4} item xs={11} lg={4}>
          <TextField
            disabled={params.mode === "view"}
            fullWidth
            label="Phone"
            name="phone"
            size="small"
            value={contactData.phone}
            onChange={handleChange}
            required={true}
            type="number"
            InputLabelProps={{
              shrink: true,
              maxLength: 10
            }}
            sx={{
              "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
                color: 'red',
              },
            }}
          />
        </Grid>
        <Grid md={4} item xs={11} lg={4} />
        <Grid md={4} item xs={11} lg={4}>
          <FormControl fullWidth size="small" disabled={params.mode === "view"}
            sx={{
              "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
                color: "red",
              },
            }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              label="Type"
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              name='type'
              value={contactData?.type || null}
              onChange={handleChange}
            >
              <MenuItem value={0}><em>None</em></MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Office">Office</MenuItem>

            </Select>
          </FormControl>
        </Grid>
        <Grid md={4} item xs={11} lg={4}>
          <FormControlLabel
            disabled={params.mode === "view"}
            id="IsWhatsapp"
            label="IsWhatsapp"
            name="isWhatsapp"
            labelPlacement="start"
            control={
              <Checkbox
                checked={Boolean(contactData.isWhatsapp)}
                onChange={(e) => handleChange({ target: { value: e.target.checked, name: "isWhatsapp" } })}
              />
            }
          />
        </Grid>
        <Grid md={4} item xs={11} lg={4} />
        <Grid md={4} item xs={11} lg={4}>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicUpload}
          />
        </Grid>
        <Grid item sm={12}>
          <img disabled={params.mode === "view"}
            src={contactData.profilePic}
            alt="profile"
            style={{ width: "200px", maxHeight: "180px", objectFit: "cover" }}
          />
        </Grid>

        <Grid sm={8} item sx={{ display: "flex", justifyContent: "flex-end", paddingBottom: "2em" }}>
          <Button
            color="primary"
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => navigate(-1)}
          >
            {params.mode === "view" ? "Close" : "Cancel"}
          </Button>

          <Button
            //disabled={submitted}
            variant="contained"
            onClick={handleSave}
            disabled={params.mode === "view"}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      {showSuccessModal && (
        <SuccessModal
          onCloseUrl="/"
          title={params.id ? "Contact Updated" : "New Contact Created"}
          sub_title={
            params.id
              ? "Successfully updated Contact record."
              : "Successfully created new Contact record."
          }
        />
      )}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={status}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>


    </PageContainer>
  )
}
