import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import {
  OrderListHead,
} from "src/sections/@dashboard/all-orders";
import {
  deleteOrder,
  getOrders,
} from "src/app/features/orders/ordersAPI";
import { useDispatch, useSelector } from "react-redux";
import { CustomSearchToolbar, DeleteDialog } from "src/shared";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "phone", label: "Phone", alignRight: false },
  { id: "address", label: "address", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function AllCustomers() {
  const [openPopover, setPopoverOpen] = useState(null);
  const [selectedCustomerForAction, setSelectedOrderForAction] = useState(null);
  const [openDeleteDialog, setDeleteDialogOpen] = useState(false);

  const handleOpenMenu = (event, order) => {
    setPopoverOpen(event.currentTarget);
    setSelectedOrderForAction(order);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(null);
    setSelectedOrderForAction(null);
    console.log("Popover closed");
  };

  const onDeleteOrder = () => {
    handlePopoverClose();
    handleCloseDeleteDialog();
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const customers = []
  return (
    <>
      <Helmet>
        <title> All Customers | Paper Tech </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            All Customers
          </Typography>
        </Stack>

        <Card>
          <CustomSearchToolbar />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="small">
                <OrderListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {customers.map((row) => {
                    const {
                      id,
                      name,
                      email,
                      phone,
                      address,
                    } = row;

                    return (
                      <TableRow hover key={id}>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{phone}</TableCell>
                        <TableCell align="left">{address}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(e) => handleOpenMenu(e, row)}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {customers.length === 0 && <TableCell colSpan={TABLE_HEAD.length} align="center">
                    {"No Customers"}
                  </TableCell>}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>

      <Popover
        open={Boolean(openPopover)}
        anchorEl={openPopover}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <DeleteDialog
        open={openDeleteDialog}
        title={'Delete'}
        contentText={'Are you sure want to delete?'}
        handleConfirm={onDeleteOrder}
        handleCancel={handleCloseDeleteDialog}
      />
    </>
  );
}
