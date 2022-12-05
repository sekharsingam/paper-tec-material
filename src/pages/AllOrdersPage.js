import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import {
  DeleteOrderDialog,
  EditOrderDialog,
  OrderListHead,
  OrderListToolbar,
} from "src/sections/@dashboard/all-orders";
import {
  deleteOrder,
  getOrders,
  updateOrder,
} from "src/app/features/orders/ordersAPI";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "orderDate", label: "Order Date", alignRight: false },
  { id: "customerName", label: "Customer Name", alignRight: false },
  { id: "rollWeight", label: "Roll Weight", alignRight: false },
  { id: "rollSize", label: "Roll Size", alignRight: false },
  { id: "cupSize", label: "Cup Size", alignRight: false },
  { id: "paperSupplier", label: "Paper Supplier", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function UserPage() {
  const [openPopover, setPopoverOpen] = useState(null);
  const [selectedOrderForAction, setSelectedOrderForAction] = useState(null);
  const [openDeleteDialog, setDeleteDialogOpen] = useState(false);
  const [openEditDialog, setEditDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

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
    dispatch(deleteOrder(selectedOrderForAction.orderId));
    handlePopoverClose();
    handleCloseDeleteDialog();
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const onEditOrder = (values) => {
    dispatch(updateOrder({ ...values, orderId: selectedOrderForAction?.id }));
    handleCloseEditDialog()
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> All Orders | Paper Tech </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            All Orders
          </Typography>
          {/* <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Order
          </Button> */}
        </Stack>

        <Card>
          <OrderListToolbar />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="small">
                <OrderListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {orders.map((row) => {
                    const {
                      id,
                      orderDate,
                      customerName,
                      rollWeight,
                      rollSize,
                      cupSize,
                      paperSupplier,
                    } = row;
                    const stillUtc = moment.utc(orderDate).toDate();

                    return (
                      <TableRow hover key={id}>
                        <TableCell align="left">
                          {moment(stillUtc).local().format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell align="left">{customerName}</TableCell>
                        <TableCell align="left">{rollWeight}</TableCell>
                        <TableCell align="left">{rollSize}</TableCell>
                        <TableCell align="left">{cupSize}</TableCell>
                        <TableCell align="left">{paperSupplier}</TableCell>
                        {/* <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell> */}

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
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
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
        <MenuItem onClick={() => setEditDialogOpen(true)}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <EditOrderDialog
        open={openEditDialog}
        handleConfirm={onEditOrder}
        handleCancel={handleCloseEditDialog}
      />

      <DeleteOrderDialog
        open={openDeleteDialog}
        handleConfirm={onDeleteOrder}
        handleCancel={handleCloseDeleteDialog}
      />
    </>
  );
}
