import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  TablePagination,
  TextField,
  Typography,
} from "@material-ui/core";
import { AppContext } from "../App";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IClick } from "../interfaces";
import { Link } from "react-router-dom";
import useStyles from "../styles/Style";

const TableStats = () => {
  const classes = useStyles();

  const data = useContext(AppContext);
  const [tableData, setTableData] = useState<IClick[]>(data.clicks);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };
  useEffect(() => {
    setTableData(data.clicks);
  }, [data]);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const performSearch = (e: any) => {
    setSearchQuery(e.target.value);
    setTableData(
      data.clicks.filter((click) => {
        return click.domain.includes(e.target.value + "");
      })
    );
    if (e.target.value === "") {
      setTableData(data.clicks);
    }
    setPage(0);
  };
  const sortCleanup = () => {
    setSearchQuery("");
    setPage(0);
    setOrder(order === "ASC" ? "DESC" : "ASC");
  };

  const sortByDomain = () => {
    setTableData(
      [...data.clicks].sort((click1, click2) => {
        const compRes = click1.domain.localeCompare(click2.domain);
        return order === "ASC" ? compRes : compRes > 0 ? -1 : 1;
      })
    );
    sortCleanup();
  };
  const sortByTime = () => {
    setTableData(
      [...data.clicks].sort((click1, click2) => {
        const compRes =
          new Date(click1.date).getTime() - new Date(click2.date).getTime();
        return order === "ASC" ? compRes : compRes > 0 ? -1 : 1;
      })
    );
    sortCleanup();
  };

  return (
    <>
      <Typography variant="h1" component="h2">
        Table statistics
      </Typography>
      <TextField
        id="standard-basic"
        label="Search domain"
        value={searchQuery}
        onChange={performSearch}
      />

      <Button variant="contained" color="primary" onClick={sortByDomain}>
        Sort by domain
      </Button>

      <Button variant="contained" color="primary" onClick={sortByTime}>
        Sort by time
      </Button>

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Domain</TableCell>
              <TableCell align="right">Click Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((click) => (
                <TableRow key={click.date + "__"}>
                  <TableCell component="th" scope="row">
                    <Link to={click.domain}>{click.domain}</Link>
                  </TableCell>
                  <TableCell align="right">
                    some
                    {click.date.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableStats;
