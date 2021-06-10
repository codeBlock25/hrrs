import { useCallback, useEffect, ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppReducerType, StoreActionType } from "../store";
import { BedSpaceType } from "../store/reducer/record";
import axios from "axios";
import { server_url } from "../config";
import { toast } from "react-toastify";

interface Column {
  id:
    | "hostel_name"
    | "floor"
    | "room_name"
    | "bed_space"
    | "userID"
    | "date"
    | "_id";
  label: string;
  minWidth?: number;
  align: "right" | "left" | "center";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "hostel_name", label: "Hostel Name", minWidth: 170, align: "left" },
  { id: "floor", label: "Floor", minWidth: 120, align: "right" },
  {
    id: "room_name",
    label: "Room Name",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "bed_space",
    label: "Bed Space",
    minWidth: 120,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function CustomTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const dispatch = useDispatch();

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { reservations } = useSelector<
    AppReducerType,
    {
      reservations: {
        hostel_name: string;
        floor: number;
        room_name: string;
        bed_space: BedSpaceType;
        userID: string;
        date: Date;
        _id: string;
      }[];
    }
  >((state) => {
    return {
      reservations: state.record.reservations,
    };
  });
  const initData = useCallback(async () => {
    let token = localStorage.getItem("token");
    await axios
      .get(`${server_url}/reservation/mine`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(({ data: { reservations } }) => {
        dispatch({
          type: StoreActionType.initReservationDetails,
          payload: reservations,
        });
        toast("Your dashboard is ready!");
      })
      .catch(() => {
        toast.dark(
          "This page maybe missing some content, please consider reloading it for the full experience."
        );
      });
  }, []);
  useEffect(() => {
    initData();
  }, [initData]);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth ?? 100 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={reservations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
