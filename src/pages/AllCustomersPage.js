import { Card, Divider, IconButton, MenuItem } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveCustomer,
  deleteCustomer,
  getCustomers,
} from "src/app/features/customer/customerAPI";
import {
  ActionPopover,
  CustomSearchToolbar,
  DeleteDialog,
  PageContainer,
  RejectReasonDialog,
  TableList,
} from "src/common";
import Label from "src/components/label";
import { DEBOUNCE_TIME, getStatusColor, STATUS } from "src/utils/constants";
import Iconify from "../components/iconify";

export default function AllCustomersPage() {
  const [openPopover, setPopoverOpen] = useState(null);
  const [selectedCustomerForAction, setSelectedOrderForAction] = useState(null);
  const [openDeleteDialog, setDeleteDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openRejectReasonDialog, setRejectReasonDialogOpen] = useState(false);

  const { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers(searchValue));
  }, [dispatch, searchValue]);

  const handleOpenMenu = (event, order) => {
    setPopoverOpen(event.currentTarget);
    setSelectedOrderForAction(order);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(null);
    setSelectedOrderForAction(null);
  };

  const onApprovalCustomer = (status) => {
    if (status === STATUS.REJECTED) {
      setRejectReasonDialogOpen(true);
      return;
    }
    onApproveOrRejectCustomer(status, "");
  };

  const onApproveOrRejectCustomer = (status, reason) => {
    dispatch(
      approveCustomer({
        customerId: selectedCustomerForAction.customerId,
        status,
      })
    );
    handlePopoverClose();
  };

  const onDeleteCustomer = () => {
    dispatch(deleteCustomer(selectedCustomerForAction.customerId));
    handlePopoverClose();
    handleCloseDeleteDialog();
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const onRefresh = () => {
    dispatch(getCustomers(searchValue));
  };

  const onSearchChange = (e) => {
    dispatch(
      debounce(() => {
        setSearchValue(e.target.value);
      }, DEBOUNCE_TIME)
    );
  };

  const handleCloseRejectReasonDialog = () => {
    setRejectReasonDialogOpen(false);
  };

  const handleConfirmRejectReasonDialog = (reason) => {
    onApproveOrRejectCustomer(STATUS.REJECTED, reason);
    handleCloseRejectReasonDialog();
  };

  const getAddress = (address) => {
    return address
      ? `${address.lane} ${address.street} ${address.city} ${address.state} ${address.country} ${address.zipCode}`
      : "";
  };

  const CUSTOMER_TABLE_COLUMNS = [
    {
      id: "name",
      label: "Name",
      dataFormat: (cell, row) => (
        <span>{`${row.firstName} ${row.lastName}`}</span>
      ),
    },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    {
      id: "address",
      label: "Address",
      dataFormat: (cell, row) => getAddress(cell),
    },
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
      <PageContainer title={"All Customers"}>
        <Card>
          <CustomSearchToolbar
            onRefresh={onRefresh}
            onSearchChange={onSearchChange}
          />

          <TableList
            size={"medium"}
            data={customers}
            columns={CUSTOMER_TABLE_COLUMNS}
            noDataText={"No Customers"}
          />
        </Card>
      </PageContainer>

      <ActionPopover open={openPopover} onClose={handlePopoverClose}>
        {selectedCustomerForAction &&
          selectedCustomerForAction.status === STATUS.PENDING && (
            <>
              <MenuItem onClick={() => onApprovalCustomer(STATUS.APPROVED)}>
                <Iconify
                  sx={{ color: "success.main", mr: 2 }}
                  icon={"material-symbols:check-circle"}
                  // sx={{ mr: 2 }}
                />
                Approve
              </MenuItem>
              <MenuItem onClick={() => onApprovalCustomer(STATUS.REJECTED)}>
                <Iconify
                  icon={"mdi:close-circle"}
                  sx={{ color: "error.main", mr: 2 }}
                />
                Reject
              </MenuItem>
              <Divider sx={{ borderStyle: "dashed" }} />
            </>
          )}
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </ActionPopover>

      <DeleteDialog
        open={openDeleteDialog}
        title={"Delete"}
        contentText={"Are you sure want to delete?"}
        onConfirm={onDeleteCustomer}
        onCancel={handleCloseDeleteDialog}
      />

      <RejectReasonDialog
        open={openRejectReasonDialog}
        title={"Reason for Reject the Customer"}
        onCancel={handleCloseRejectReasonDialog}
        onConfirm={handleConfirmRejectReasonDialog}
      />
    </>
  );
}
