import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

let counter = 0;

function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { name, calories, fat, carbs, protein };
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
});
var myrows = [
  
];

myrows.sort((a, b) => (a.calories < b.calories ? -1 : 1));

class CustomPaginationActionsTable extends React.Component 
{
  state = 
  {
    rows: myrows,
    page: 0,
    rowsPerPage: 5
  };

  componentDidMount = () => {
    this._getData();  
   
  };

  getAlert() {
    alert("쿠폰이 생성 되었습니다.");
    this._getData();  
  }


  _getData = async () => {
    this.setState({
        fetching: true // requesting..
    });
    await axios.get('http://localhost:3030/main/list')
    .then( response => 
    {
        
        var newRows = [];
        // console.log(response.data);

        for(var i = 0 ; i < response.data.length ; i++)
        {
            var dataPack = 
            {
              index: "",
              coupon_id: "",
              item_type: "",
              value:"",
              message:"",             
              make_date:"",
              end_date:"",
              get_date: "",
              received: "",
              received_type: "",
            }
            var tempdatapack = eval('(' + JSON.stringify(dataPack) + ')');

            tempdatapack.id = i;  
            tempdatapack.index = response.data[i].index;    
            tempdatapack.coupon_id = response.data[i].coupon_id;    
            tempdatapack.item_type = response.data[i].item_type;    
            tempdatapack.value = response.data[i].value;    
            tempdatapack.message = response.data[i].message;
            
            tempdatapack.make_date = response.data[i].make_date;
            tempdatapack.end_date = response.data[i].end_date; 
            tempdatapack.get_date = response.data[i].get_date; 
            tempdatapack.received = response.data[i].received; 
            tempdatapack.received_type = response.data[i].received_type;  

            newRows.push(tempdatapack);
        }

        newRows.sort((a, b) => (a.index > b.index ? -1 : 1));
        this.state.rows = newRows;

        this.setState({
            fetching: false // done!
        });
        

    } ) // SUCCESS
    .catch( response => { 
      // console.log(response); 
    } ); // ERROR
  };


  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper >
        <div >
          <Table >
            <TableHead>
              <TableRow>
                <CustomTableCell align="right">index </CustomTableCell>
                <CustomTableCell align="right">coupon_id</CustomTableCell>
                <CustomTableCell align="right">item_type</CustomTableCell>
                <CustomTableCell align="right">value</CustomTableCell>
                <CustomTableCell align="right">message</CustomTableCell>
                <CustomTableCell align="right">make_date</CustomTableCell>
                <CustomTableCell align="right">end_date</CustomTableCell>
                <CustomTableCell align="right">get_date</CustomTableCell>
                <CustomTableCell align="right">received</CustomTableCell>
                <CustomTableCell align="right">received_type</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow key={row.id}>
                      <CustomTableCell align="right">{row.index}</CustomTableCell>
                      <CustomTableCell align="right">{row.coupon_id}</CustomTableCell>
                      <CustomTableCell align="right">{row.item_type}</CustomTableCell>
                      <CustomTableCell align="right">{row.value}</CustomTableCell>
                      <CustomTableCell align="right">{row.message}</CustomTableCell>
                      <CustomTableCell align="right">{row.make_date}</CustomTableCell>
                      <CustomTableCell align="right">{row.end_date}</CustomTableCell>
                      <CustomTableCell align="right">{row.get_date}</CustomTableCell>
                      <CustomTableCell align="right">{row.received}</CustomTableCell>
                      <CustomTableCell align="right">{row.received_type}</CustomTableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired

};

export default CustomPaginationActionsTable;

