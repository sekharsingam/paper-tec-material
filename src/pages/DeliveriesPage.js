import {
  Card,
  Container,
  IconButton,
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
import { getDeliveries } from "src/app/features/delivery/deliveryAPI";
import Iconify from "src/components/iconify";
import Label from "src/components/label";
import Scrollbar from "src/components/scrollbar";
import { OrderListHead } from "src/sections/@dashboard/all-orders";
import { CustomSearchToolbar } from "src/shared";
import { DEBOUNCE_TIME } from "src/utils/constants";

const TABLE_HEAD = [
  { id: "deliveryId", label: "Delivery Id ", alignRight: false },
  { id: "deliveryDate", label: "Delivery Date", alignRight: false },
  { id: "orderId", label: "Order Id ", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

export default function DeliveriesPage() {
  const [searchValue, setSearchValue] = useState("");

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
                    const { id, deliveryId, deliveryDate, orderId, status } =
                      row;
                    const stillUtc = moment.utc(deliveryDate).toDate();

                    return (
                      <TableRow hover key={id}>
                        <TableCell align="left">{deliveryId}</TableCell>
                        <TableCell align="left">
                          {moment(stillUtc).local().format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell align="left">{orderId}</TableCell>
                        <TableCell align="left">
                          <Label color={"default"}>{status}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            // onClick={(e) => handleOpenMenu(e, row)}
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
    </>
  );
}
