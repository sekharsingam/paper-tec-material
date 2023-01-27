import { Card, IconButton, MenuItem } from "@mui/material";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeliveries,
  updateDelivery,
} from "src/app/features/delivery/deliveryAPI";
import { ActionPopover, CustomSearchToolbar, PageContainer } from "src/common";
import TableList from "src/common/TableList";
import Iconify from "src/components/iconify";
import Label from "src/components/label";
import { ChangeOrderStatusDialog } from "src/sections/dashboard/all-orders";
import { DEBOUNCE_TIME, STATUS } from "src/utils/constants";

export default function DeliveriesPage() {
  const [searchValue, setSearchValue] = useState("");
  const [openChangeStatusDialog, setChangeStatusDialogOpen] = useState(false);
  const [openPopover, setPopoverOpen] = useState(null);
  const [selectedDeliveryForAction, setSelectedDeliveryForAction] =
    useState(null);
  const dispatch = useDispatch();

  const { deliveries } = useSelector((state) => state.delivery);

  useEffect(() => {
    dispatch(getDeliveries(searchValue));
  }, [dispatch, searchValue]);

  const onRefresh = () => {
    dispatch(getDeliveries(searchValue));
  };

  const onSearchChange = (e) => {
    dispatch(
      debounce(() => {
        setSearchValue(e.target.value);
      }, DEBOUNCE_TIME)
    );
  };

  const handleOpenMenu = (event, order) => {
    setPopoverOpen(event.currentTarget);
    setSelectedDeliveryForAction(order);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(null);
    setSelectedDeliveryForAction(null);
  };

  const onChangeOrderStatus = ({ status }) => {
    dispatch(
      updateDelivery({
        deliveryId: selectedDeliveryForAction.deliveryId,
        status,
      })
    );
    handleCloseChangeStatusDialog();
  };

  const handleCloseChangeStatusDialog = () => {
    setChangeStatusDialogOpen(false);
    setPopoverOpen(null);
  };

  const DELIVERIES_TABLE_COLUMNS = [
    { id: "deliveryId", label: "Delivery Id" },
    {
      id: "deliveryDate",
      label: "Delivery Date",
      dataFormat: (cell, row) => {
        const stillUtc = moment.utc(cell).toDate();
        return <span>{moment(stillUtc).local().format("YYYY-MM-DD")}</span>;
      },
    },
    { id: "orderId", label: "Order Id " },
    { id: "rollWeight", label: "Roll Weight Utilize" },
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

  const TUMERIC_DELIVERIES_TABLE_COLUMNS = [
    { id: "deliveryId", label: "Delivery Id" },
    {
      id: "deliveryDate",
      label: "Delivery Date",
      dataFormat: (cell, row) => {
        const stillUtc = moment.utc(cell).toDate();
        return <span>{moment(stillUtc).local().format("YYYY-MM-DD")}</span>;
      },
    },
    { id: "orderId", label: "Order Id " },
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
      <PageContainer title={"Deliveries"}>
        <Card>
          <CustomSearchToolbar
            onRefresh={onRefresh}
            onSearchChange={onSearchChange}
          />
          <TableList
            size={"small"}
            data={deliveries}
            columns={TUMERIC_DELIVERIES_TABLE_COLUMNS}
            noDataText={"No Deliveries"}
          />
        </Card>
      </PageContainer>

      <ActionPopover open={openPopover} onClose={handlePopoverClose}>
        <MenuItem onClick={() => setChangeStatusDialogOpen(true)}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Change Status
        </MenuItem>
      </ActionPopover>

      {openChangeStatusDialog && (
        <ChangeOrderStatusDialog
          open={openChangeStatusDialog}
          statuses={[
            STATUS.IN_PROGRESS,
            STATUS.READY_FOR_DELIVERY,
            STATUS.DELIVERED,
          ]}
          onConfirm={onChangeOrderStatus}
          onCancel={handleCloseChangeStatusDialog}
        />
      )}
    </>
  );
}
