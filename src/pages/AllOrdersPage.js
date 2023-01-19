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
  EditOrderDialog,
  OrderListHead,
} from "src/sections/@dashboard/all-orders";
import {
  deleteOrder,
  getOrders,
  getOrdersByCustomer,
  updateOrder,
} from "src/app/features/orders/ordersAPI";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { CustomSearchToolbar, DeleteDialog } from "src/shared";
import { debounce } from "lodash";
import { DEBOUNCE_TIME, ROLE_ADMIN, STATUS } from "src/utils/constants";
import Label from "src/components/label";
import CreateDeliveryDialog from "src/sections/@dashboard/all-orders/CreateDeliveryDialog";
import { createDelivery } from "src/app/features/delivery/deliveryAPI";
import ChangeOrderStatusDialog from "src/sections/@dashboard/all-orders/ChangeOrderStatusDialog";
import OrderPaymentInfoDialog from "src/sections/@dashboard/all-orders/OrderPaymentInfoDialog";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "orderDate", label: "Order Date", alignRight: false },
  { id: "orderId", label: "Order Id ", alignRight: false },
  { id: "customerId", label: "Customer Id ", alignRight: false },
  { id: "rollWeight", label: "Roll Weight | Remaining", alignRight: false },
  { id: "rollSize", label: "Roll Size", alignRight: false },
  { id: "cupSize", label: "Cup Size", alignRight: false },
  { id: "paperSupplier", label: "Paper Supplier", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function AllOrdersPage() {
  const [openPopover, setPopoverOpen] = useState(null);
  const [selectedOrderForAction, setSelectedOrderForAction] = useState(null);
  const [openDeleteDialog, setDeleteDialogOpen] = useState(false);
  const [openEditDialog, setEditDialogOpen] = useState(false);
  const [openChangeStatusDialog, setChangeStatusDialogOpen] = useState(false);
  const [openCreateDeliveryDialog, setCreateDeliveryDialogOpen] =
    useState(false);
  const [openOrderPaymentInfoDialog, setOrderPaymentInfoDialogOpen] =
    useState(false);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    getCustomerOrders();
  }, [dispatch, searchValue]);

  const getCustomerOrders = () => {
    const user = JSON.parse(localStorage.user);
    if (user.role === ROLE_ADMIN) {
      dispatch(getOrders(searchValue));
      return;
    }
    dispatch(getOrdersByCustomer(user.customerId, searchValue));
  };

  const handleOpenMenu = (event, order) => {
    setPopoverOpen(event.currentTarget);
    setSelectedOrderForAction(order);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(null);
    setSelectedOrderForAction(null);
  };

  const onDeleteOrder = () => {
    dispatch(deleteOrder(selectedOrderForAction.orderId));
    handlePopoverClose();
    handleCloseDeleteDialog();
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const onCreateDelivery = (values) => {
    dispatch(
      createDelivery({ ...values, orderId: selectedOrderForAction?.orderId })
    );
    handlePopoverClose();
    handleCloseCreateDeliveryDialog();
  };

  const onEditOrder = (values) => {
    dispatch(
      updateOrder({ ...values, orderId: selectedOrderForAction?.orderId })
    );
    handlePopoverClose();
    handleCloseEditDialog();
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleCloseCreateDeliveryDialog = () => {
    setCreateDeliveryDialogOpen(false);
  };

  const onChangeOrderStatus = (status) => {
    console.log(status);
    handlePopoverClose();
    handleCloseChangeStatusDialog();
  };

  const handleCloseChangeStatusDialog = () => {
    setChangeStatusDialogOpen(false);
  };

  const handleCloseOrderPaymentInfoDialog = () => {
    setOrderPaymentInfoDialogOpen(false);
    handlePopoverClose();
  };

  const onRefresh = () => {
    getCustomerOrders();
  };

  const onSearchChange = (e) => {
    dispatch(
      debounce(() => {
        setSearchValue(e.target.value);
      }, DEBOUNCE_TIME)
    );
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
          mb={2}
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
          <CustomSearchToolbar
            onRefresh={onRefresh}
            onSearchChange={onSearchChange}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="small">
                <OrderListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {orders.map((row) => {
                    const {
                      id,
                      orderId,
                      orderDate,
                      customerId,
                      rollWeight,
                      rollSize,
                      cupSize,
                      remainingRollWeight,
                      paperSupplier,
                      status,
                    } = row;
                    const stillUtc = moment.utc(orderDate).toDate();

                    return (
                      <TableRow hover key={id}>
                        <TableCell align="left">
                          {moment(stillUtc).local().format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell align="left">{orderId}</TableCell>
                        <TableCell align="left">{customerId}</TableCell>
                        <TableCell align="left">{`${rollWeight} | ${remainingRollWeight}`}</TableCell>
                        <TableCell align="left">{rollSize}</TableCell>
                        <TableCell align="left">{cupSize}</TableCell>
                        <TableCell align="left">{paperSupplier}</TableCell>
                        <TableCell align="left">
                          <Label color={"info"}>{status}</Label>
                        </TableCell>

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

                  {orders.length === 0 && (
                    <TableRow hover>
                      <TableCell colSpan={TABLE_HEAD.length} align="center">
                        {"No Orders"}
                      </TableCell>
                    </TableRow>
                  )}
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
            width: 200,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => setCreateDeliveryDialogOpen(true)}>
          <Iconify icon={"eva:plus-circle-fill"} sx={{ mr: 2 }} />
          Create Delivery
        </MenuItem>

        <MenuItem onClick={() => setEditDialogOpen(true)}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => setChangeStatusDialogOpen(true)}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Change Status
        </MenuItem>

        <MenuItem onClick={() => setOrderPaymentInfoDialogOpen(true)}>
          <Iconify icon={"fluent:payment-20-filled"} sx={{ mr: 2 }} />
          Payment Info
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {openCreateDeliveryDialog && (
        <CreateDeliveryDialog
          open={openCreateDeliveryDialog}
          order={selectedOrderForAction}
          onConfirm={onCreateDelivery}
          onCancel={handleCloseCreateDeliveryDialog}
        />
      )}

      {openEditDialog && (
        <EditOrderDialog
          open={openEditDialog}
          orderData={selectedOrderForAction}
          onConfirm={onEditOrder}
          onCancel={handleCloseEditDialog}
        />
      )}

      {openDeleteDialog && (
        <DeleteDialog
          open={openDeleteDialog}
          title={"Delete"}
          contentText={"Are you sure want to delete?"}
          onConfirm={onDeleteOrder}
          onCancel={handleCloseDeleteDialog}
        />
      )}

      {openChangeStatusDialog && (
        <ChangeOrderStatusDialog
          open={openChangeStatusDialog}
          statuses={[
            STATUS.PROCESSING,
            STATUS.READY_FOR_DELIVERY,
            STATUS.OUT_FOR_DELIVERY,
            STATUS.COMPLETED,
          ]}
          onConfirm={onChangeOrderStatus}
          onCancel={handleCloseChangeStatusDialog}
        />
      )}

      {openOrderPaymentInfoDialog && (
        <OrderPaymentInfoDialog
          order={selectedOrderForAction}
          open={openOrderPaymentInfoDialog}
          onCancel={handleCloseOrderPaymentInfoDialog}
        />
      )}
    </>
  );
}
