import {
  Card,
  Container,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeliveries,
  updateDelivery,
} from "src/app/features/delivery/deliveryAPI";
import Iconify from "src/components/iconify";
import Label from "src/components/label";
import Scrollbar from "src/components/scrollbar";
import { OrderListHead } from "src/sections/@dashboard/all-orders";
import ChangeOrderStatusDialog from "src/sections/@dashboard/all-orders/ChangeOrderStatusDialog";
import { CustomSearchToolbar } from "src/shared";
import { DEBOUNCE_TIME, getStatusColor, STATUS } from "src/utils/constants";

const TABLE_HEAD = [
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
      <Helmet>
        <title> Deliveries | Paper Tech </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Deliveries
          </Typography>
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
                      <TableCell colSpan={TABLE_HEAD.length} align="center">
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
        <MenuItem onClick={() => setChangeStatusDialogOpen(true)}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Change Status
        </MenuItem>
      </Popover>

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
