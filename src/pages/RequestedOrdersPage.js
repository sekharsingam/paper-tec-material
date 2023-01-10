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
  getRequestedOrders,
  orderApproval,
  updateOrder,
} from "src/app/features/orders/ordersAPI";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { CustomSearchToolbar, DeleteDialog } from "src/shared";
import { debounce } from "lodash";
import {
  DEBOUNCE_TIME,
  getStatusColor,
  ROLE_ADMIN,
  STATUS,
} from "src/utils/constants";
import Label from "src/components/label";
import CreateDeliveryDialog from "src/sections/@dashboard/all-orders/CreateDeliveryDialog";
import { createDelivery } from "src/app/features/delivery/deliveryAPI";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "orderDate", label: "Order Date", alignRight: false },
  { id: "orderRequestId", label: "Order Request Id", alignRight: false },
  { id: "customerId", label: "Customer Id ", alignRight: false },
  { id: "rollWeight", label: "Roll Weight", alignRight: false },
  { id: "rollSize", label: "Roll Size", alignRight: false },
  { id: "cupSize", label: "Cup Size", alignRight: false },
  { id: "paperSupplier", label: "Paper Supplier", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function RequestedOrdersPage() {
  const [openPopover, setPopoverOpen] = useState(null);
  const [selectedOrderForAction, setSelectedOrderForAction] = useState(null);
  const [openDeleteDialog, setDeleteDialogOpen] = useState(false);

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
    dispatch(
      orderApproval({
        orderRequestId: selectedOrderForAction.orderRequestId,
        userId: JSON.parse(localStorage.user).customerId,
        status,
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

  return (
    <>
      <Helmet>
        <title> Requested Orders | Paper Tech </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Requested Orders
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
            // onSearchChange={onSearchChange}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="medium">
                <OrderListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {requestedOrders.map((row) => {
                    const {
                      id,
                      orderDate,
                      orderRequestId,
                      customerId,
                      rollWeight,
                      rollSize,
                      cupSize,
                      paperSupplier,
                      status,
                    } = row;
                    const stillUtc = moment.utc(orderDate).toDate();

                    return (
                      <TableRow hover key={id}>
                        <TableCell align="left">
                          {moment(stillUtc).local().format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell align="left">{orderRequestId}</TableCell>
                        <TableCell align="left">{customerId}</TableCell>
                        <TableCell align="left">{rollWeight}</TableCell>
                        <TableCell align="left">{rollSize}</TableCell>
                        <TableCell align="left">{cupSize}</TableCell>
                        <TableCell align="left">{paperSupplier}</TableCell>

                        <TableCell align="left">
                          <Label color={getStatusColor(status)}>{status}</Label>
                        </TableCell>

                        <TableCell align="right">
                          {status === STATUS.PENDING && (
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(e) => handleOpenMenu(e, row)}
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {requestedOrders.length === 0 && (
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
            count={requestedOrders.length}
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
      </Popover>
    </>
  );
}
