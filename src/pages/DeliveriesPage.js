import {
  Card,
  IconButton,
  MenuItem, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeliveries,
  updateDelivery
} from "src/app/features/delivery/deliveryAPI";
import {
  ActionPopover,
  CustomSearchToolbar,
  PageContainer,
  TableListHeader
} from "src/common";
import Iconify from "src/components/iconify";
import Label from "src/components/label";
import Scrollbar from "src/components/scrollbar";
import { ChangeOrderStatusDialog } from "src/sections/dashboard/all-orders";
import { DEBOUNCE_TIME, getStatusColor, STATUS } from "src/utils/constants";

const DELIVERIES_TABLE_HEAD = [
  { id: "deliveryId", label: "Delivery Id " },
  { id: "deliveryDate", label: "Delivery Date" },
  { id: "orderId", label: "Order Id " },
  { id: "rollWeight", label: "Roll Weight Utilize" },
  { id: "status", label: "Status" },
  { id: "" },
];

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

  return (
    <>
      <PageContainer title={"Deliveries"}>
        <Card>
          <CustomSearchToolbar
            onRefresh={onRefresh}
            onSearchChange={onSearchChange}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="small">
                <TableListHeader headLabel={DELIVERIES_TABLE_HEAD} />
                <TableBody>
                  {deliveries.map((row) => {
                    const {
                      id,
                      deliveryId,
                      deliveryDate,
                      orderId,
                      rollWeight,
                      status,
                    } = row;
                    const stillUtc = moment.utc(deliveryDate).toDate();

                    return (
                      <TableRow hover key={id}>
                        <TableCell align="left">{deliveryId}</TableCell>
                        <TableCell align="left">
                          {moment(stillUtc).local().format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell align="left">{orderId}</TableCell>
                        <TableCell align="left">{rollWeight}</TableCell>
                        <TableCell align="left">
                          <Label color={getStatusColor(status)}>{status}</Label>
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

                  {deliveries.length === 0 && (
                    <TableRow hover>
                      <TableCell
                        colSpan={DELIVERIES_TABLE_HEAD.length}
                        align="center"
                      >
                        {"No Deliveries"}
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
