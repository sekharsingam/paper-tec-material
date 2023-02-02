// @mui
import { Card, IconButton, MenuItem } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequestedOrders,
  orderApproval
} from "src/app/features/orders/ordersAPI";
import {
  ActionPopover,
  CustomSearchToolbar,
  PageContainer,
  RejectReasonDialog
} from "src/common";
import TableList from "src/common/TableList";
import Label from "src/components/label";
import { getStatusColor, STATUS } from "src/utils/constants";
// components
import Iconify from "../components/iconify";

// ----------------------------------------------------------------------

export default function RequestedOrdersPage() {
  const [openPopover, setPopoverOpen] = useState(null);
  const [selectedOrderForAction, setSelectedOrderForAction] = useState(null);
  const [openDeleteDialog, setDeleteDialogOpen] = useState(false);
  const [openRejectReasonDialog, setRejectReasonDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const { requestedOrders = [] } = useSelector((state) => state.order);

  useEffect(() => {
    getAllRequestedOrders();
  }, [searchValue]);

  const getAllRequestedOrders = () => {
    dispatch(getRequestedOrders(searchValue));
  };

  const handleOpenMenu = (event, order) => {
    setPopoverOpen(event.currentTarget);
    setSelectedOrderForAction(order);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(null);
    setSelectedOrderForAction(null);
  };

  const onRefresh = () => {
    getRequestedOrders();
  };

  const onApprovalOrder = (status) => {
    if (status === STATUS.REJECTED) {
      setRejectReasonDialogOpen(true);
      return;
    }
    onApproveOrRejectOrder(status, "");
  };

  const onApproveOrRejectOrder = (status, reason) => {
    dispatch(
      orderApproval({
        orderRequestId: selectedOrderForAction.orderRequestId,
        userId: JSON.parse(localStorage.user).customerId,
        status,
        reason,
      })
    );
    handlePopoverClose();
  };

  //   const onSearchChange = (e) => {
  //     dispatch(
  //       debounce(() => {
  //         setSearchValue(e.target.value);
  //       }, DEBOUNCE_TIME)
  //     );
  //   };

  const handleCloseRejectReasonDialog = () => {
    setRejectReasonDialogOpen(false);
  };

  const handleConfirmRejectReasonDialog = (reason) => {
    onApproveOrRejectOrder(STATUS.REJECTED, reason);
    handleCloseRejectReasonDialog();
  };

  const REQ_ORDERS_TABLE_COLUMNS = [
    {
      id: "orderDate",
      label: "Order Date",
      dataFormat: (cell, row) => {
        const stillUtc = moment.utc(cell).toDate();
        return <span>{moment(stillUtc).local().format("YYYY-MM-DD")}</span>;
      },
    },
    { id: "orderRequestId", label: "Order Request Id" },
    { id: "customerId", label: "Customer Id " },
    { id: "rollWeight", label: "Roll Weight" },
    { id: "rollSize", label: "Roll Size" },
    { id: "cupSize", label: "Cup Size" },
    { id: "paperSupplier", label: "Paper Supplier" },
    {
      id: "status",
      label: "Status",
      dataFormat: (cell, row) => (
        <Label color={getStatusColor(cell)}>{cell}</Label>
      ),
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

  const REQ_TUMERIC_ORDERS_TABLE_COLUMNS = [
    {
      id: "orderDate",
      label: "Order Date",
      dataFormat: (cell, row) => {
        const stillUtc = moment.utc(cell).toDate();
        return <span>{moment(stillUtc).local().format("YYYY-MM-DD")}</span>;
      },
    },
    { id: "orderRequestId", label: "Order Request Id" },
    { id: "customerId", label: "Customer Id " },
    { id: "productType", label: "Product Type" },
    {
      id: "packingSize",
      label: "Packing Size",
      dataFormat: (cell, row) => (
        <span>{`${cell} ${row.productType === "Honey" ? "ml" : "gms"}`}</span>
      ),
    },
    { id: "quantity", label: "Quantity" },
    {
      id: "status",
      label: "Status",
      dataFormat: (cell, row) => (
        <Label color={getStatusColor(cell)}>{cell}</Label>
      ),
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
      <PageContainer title={"Requested Orders"}>
        <Card>
          <CustomSearchToolbar
            onRefresh={onRefresh}
            // onSearchChange={onSearchChange}
          />
          <TableList
            size={"medium"}
            data={requestedOrders}
            columns={REQ_TUMERIC_ORDERS_TABLE_COLUMNS}
            noDataText={"No Orders"}
          />
        </Card>
      </PageContainer>

      <ActionPopover open={openPopover} onClose={handlePopoverClose}>
        {selectedOrderForAction &&
          selectedOrderForAction.status === STATUS.PENDING && (
            <>
              <MenuItem onClick={() => onApprovalOrder(STATUS.ACCEPTED)}>
                <Iconify
                  sx={{ color: "success.main", mr: 2 }}
                  icon={"material-symbols:check-circle"}
                  // sx={{ mr: 2 }}
                />
                Approve
              </MenuItem>
              <MenuItem onClick={() => onApprovalOrder(STATUS.REJECTED)}>
                <Iconify
                  icon={"mdi:close-circle"}
                  sx={{ color: "error.main", mr: 2 }}
                />
                Reject
              </MenuItem>
            </>
          )}
      </ActionPopover>

      <RejectReasonDialog
        open={openRejectReasonDialog}
        title={"Reason for Reject the Order"}
        onCancel={handleCloseRejectReasonDialog}
        onConfirm={handleConfirmRejectReasonDialog}
      />
    </>
  );
}
