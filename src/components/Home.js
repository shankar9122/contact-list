import { Grid, TableContainer, Table, TableHead, TableCell, Typography, TableBody, TableRow, Checkbox, IconButton, Tooltip, Toolbar, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FeatherIcon from "feather-icons-react";
import { Link, NavLink } from 'react-router-dom';
import PageContainer from './PageContainer'
import DeleteModal from "./modals/DeleteModal"


const headCells = [
  {
    id: 1,
    label: "S.No."
  },
  {
    id: 2,
    label: "Name"
  },
  {
    id: 3,
    label: "Phone"
  },
  {
    id: 4,
    label: "Type"
  },
  {
    id: 5,
    label: "Whatsapp"
  },
];

let data = [
  {
    id: 1,
    name: "Shankar",
    phone: "567898765435",
    type: "official",
    whatsapp: true
  },
  {
    id: 2,
    name: "Shankar",
    phone: "567898765435",
    type: "official",
    whatsapp: true
  }
]

export default function Home() {
  const [dataList, setDataList] = useState([])
  const [selected, setSelected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    let localData = window.localStorage.contactList;
    let data = localData === undefined ? [] : JSON.parse(localData);
    setDataList([...data]);
  }, []);


  const handleDelete = () => {
    console.log(selected);
    let data = [...dataList];
    data = data.filter(item => item.id != selected[0]);
    window.localStorage.contactList = JSON.stringify(data);
    setDataList([...data])
    setTimeout(() => setModalOpen(false), 10)
  }



  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClick = (event, id) => {
    event.preventDefault();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <PageContainer title={"Home"}>
      <Grid item sm={12}>
        <EnhancedTableToolbar
          handleModalOpen={handleModalOpen}
          selected={selected}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
              a: {
                whiteSpace: "nowrap !important",
              },
            }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <TableHead
              sx={{
                bgcolor: (theme) => theme.palette.secondary.light,
                "& .MuiTableCell-root": {
                  padding: "2px 10px !important",
                },
                th: {
                  whiteSpace: "nowrap !important",
                },
              }}
            >
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  padding={headCell.id && "checkbox"}
                >
                  <Typography variant="subtitle2">{headCell.label}</Typography>
                </TableCell>
              ))}
            </TableHead>
            <TableBody
              sx={{
                "& .MuiTableCell-root": {
                  padding: "2px 10px !important",
                },
              }}
            >
              {dataList.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    component={Link}
                    to={`/contact/${row.id}/edit`}
                    sx={{ textDecoration: 'none' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        disableRipple
                        onClick={(event) => handleClick(event, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputprops={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {row.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {row.type}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {row.whatsapp ? "Yes" : "No"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* --------------Delete Modal----------------- */}
      <DeleteModal
        open={modalOpen}
        onClose={handleModalClose}
        onDelete={handleDelete}
      />

    </PageContainer>
  )
};



const EnhancedTableToolbar = (props) => {
  const { numSelected, selected } = props;

  return (
    <Toolbar
      style={{ height: "2rem" }}
      sx={{
        py: 0,
        my: 0,
        minHeight:"10px !important",
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
        pl: { sm: 0 },
        pr: { xs: 1, sm: 1 },
        display: "flex",
        justifyContent: "space-between",
        justifyContent: 'end',
        "& button": {
          height: "2rem",
          width: "2rem",
          padding: 0.9,
        },
        "&.Mui-disabled": {
          pointerEvents: "auto",
        },
        th: {
          whiteSpace: "nowrap !important",
        },
      }}
    >
      <Box>
        <Tooltip title="Add Template">
          <NavLink to="/contact/add-contact">
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.13)",
                  color: "black",
                },
              }}
            >
              <FeatherIcon icon="plus" />
            </IconButton>
          </NavLink>
        </Tooltip>

        <Tooltip title="View Contact">
          <span>
            <NavLink
              to={
                numSelected === 1
                  ? `/contact/${selected[0]}/view`
                  : "#"
              }
            >
              <IconButton
                disabled={numSelected !== 1}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.13)",
                    color: "black",
                  },
                }}
              >
                <FeatherIcon icon="eye" />
              </IconButton>
            </NavLink>
          </span>
        </Tooltip>
        <Tooltip title="Edit Contact">
          <span>
            <NavLink
              to={
                numSelected === 1
                  ? `/contact/${selected[0]}/edit`
                  : "#"
              }
            >
              <IconButton
                disabled={numSelected !== 1}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.13)",
                    color: "black",
                  },
                }}
              >
                <FeatherIcon icon="edit-2" />
              </IconButton>
            </NavLink>
          </span>
        </Tooltip>

        <Tooltip title="Delete Template">
          <span>
            <IconButton
              disabled={numSelected !== 1}
              onClick={props.handleModalOpen}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.13)",
                  color: "black",
                },
              }}
            >
              <FeatherIcon icon="trash-2" />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Toolbar>
  );
};


