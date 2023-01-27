// @mui
import {
  Card,
  Divider,
  IconButton,
  MenuItem
} from "@mui/material";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDelivery } from "src/app/features/delivery/deliveryAPI";
import {
  deleteOrder,
  getOrders,
  getOrdersByCustomer,
  updateOrder
} from "src/app/features/orders/ordersAPI";
import {
  ActionPopover,
  CustomSearchToolbar,
  DeleteDialog,
  PageContainer
} from "src/common";
import TableList from "src/common/TableList";
import Label from "src/components/label";
import {
  ChangeOrderStatusDialog,
  CreateDeliveryDialog,
  EditOrderDialog,
  OrderPaymentInfoDialog
} from "src/sections/dashboard/all-orders";
import { DEBOUNCE_TIME, ROLE_ADMIN, STATUS } from "src/utils/constants";
// components
import Iconify from "../components/iconify";

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

  const ORDER_TABLE_HEAD = [
    {
      id: "orderDate",
      label: "Order Date",
      dataFormat: (cell, row) => {
        const stillUtc = moment.utc(cell).toDate();
        return <span>{moment(stillUtc).local().format("YYYY-MM-DD")}</span>;
      },
    },
    { id: "orderId", label: "Order Id " },
    { id: "customerId", label: "Customer Id " },
    {
      id: "rollWeight",
      label: "Roll Weight | Remaining",
      dataFormat: (cell, row) => (
        <span>{`${row.rollWeight} | ${row.remainingRollWeight}`}</span>
      ),
    },
    { id: "rollSize", label: "Roll Size" },
    { id: "cupSize", label: "Cup Size" },
    { id: "paperSupplier", label: "Paper Supplier" },
    {
      id: "status",
      label: "Status",
      dataFormat: (cell, row) => <Label color={"info"}>{cell}</Label>,
    },
    { id: "" },
  ];

  const TUMERIC_ORDER_TABLE_COLUMNS = [
    {
      id: "orderDate",
      label: "Order Date",
      dataFormat: (cell, row) => {
        const stillUtc = moment.utc(cell).toDate();
        return <span>{moment(stillUtc).local().format("YYYY-MM-DD")}</span>;
      },
    },
    { id: "orderId", label: "Order Id" },
    { id: "productType", label: "Product Type" },
    { id: "packingSize", label: "Packing Size" },
    { id: "quantity", label: "Quantity" },
    {
      id: "status",
      label: "Status",
      dataFormat: (cell, row) => <Label color={"info"}>{cell}</Label>,
    },
    {
      id: "",
      label: "",
      dataFormat: (cell, row) => (
        <IconButton
          size="large"
          color="inherit"
          onClick={(e) => handleOpenMenu(e, row)}
        >
          <Iconify icon={"eva:more-vertical-fill"} />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <PageContainer title={"All Orders"}>
        <Card>
          <CustomSearchToolbar
            onRefresh={onRefresh}
            onSearchChange={onSearchChange}
          />
          <TableList  
            size={"small"}
            data={orders}
            columns={TUMERIC_ORDER_TABLE_COLUMNS}
            noDataText={"No Orders"}
          />
        </Card>
      </PageContainer>

      <ActionPopover open={openPopover} onClose={handlePopoverClose}>
        <MenuItem onClick={() => setCreateDeliveryDialogOpen(true)}>
          <Iconify icon={"eva:plus-circle-fill"} sx={{ mr: 2 }} />
          Create Delivery
        </MenuItem>

        <MenuItem onClick={() => setEditDialogOpen(true)}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        {/* <MenuItem onClick={() => setChangeStatusDialogOpen(true)}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Change Status
        </MenuItem> */}

        <MenuItem onClick={() => setOrderPaymentInfoDialogOpen(true)}>
          <Iconify icon={"fluent:payment-20-filled"} sx={{ mr: 2 }} />
          Payment Info
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </ActionPopover>

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
