import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const dummyLaptopData =  [
    {
        serialNum: '1234567898',
        originalDonor: 'BetterUp',
        status: "Unprocessed",
        model: "Macbook Air",
        value: 600
    },
    {
      serialNum: '1234567898',
      originalDonor: 'OrderMyGear',
      status: "Unprocessed",
      model: "Macbook Air",
      value: 600
    },    {
      serialNum: '1234567898',
      originalDonor: 'BetterUp',
      status: "Unprocessed",
      model: "Macbook Air",
      value: 600
  },    {
      serialNum: '1234567898',
      originalDonor: 'BetterUp',
      status: "Unprocessed",
      model: "Macbook Air",
      value: 600
    },    {
      serialNum: '1234567898',
      originalDonor: 'BetterUp',
      status: "Damaged",
      model: "Macbook Air",
      value: 600
    },    {
      serialNum: '1234560898',
      originalDonor: 'BetterUp',
      status: "Donated",
      model: "Macbook Pro",
      value: 900
    },    {
      serialNum: '1234567898',
      originalDonor: 'BetterUp',
      status: "Unprocessed",
      model: "Macbook Pro",
      value: 600
    },    {
      serialNum: '1234777898',
      originalDonor: 'BetterUp',
      status: "Unprocessed",
      model: "Macbook Pro",
      value: 400
    },    {
      serialNum: '1234567898',
      originalDonor: 'OrderMyGear',
      status: "Donated",
      model: "Macbook Air",
      value: 600
    },    {
      serialNum: '1234567598',
      originalDonor: 'BetterUp',
      status: "Sold",
      model: "Dell XPS",
      value: 1200
    },    {
      serialNum: '1334567898',
      originalDonor: 'OrderMyGear',
      status: "Sold",
      model: "Macbook Air",
      value: 700
    }
]

  // const rows = [
  //   createData('1234567898', "BetterUp", "Unprocessed", "Macbook Air", 1200),
  //   createData('1237567898', "BetterUp", "Sold", "Macbook Pro", 900),
  //   createData('1234567898', "OrderMyGear", "Donated", "Macbook Pro", 600),
  //   createData('1234567888', "BetterUp", "Ready", "Dell XPS", 750),
  //   createData('1234557898', "OrderMyGear", "Damaged", "Macbook Air", 800),
  //   createData('1234557898', "OrderMyGear", "Unprocessed", "Macbook Air", 800),
  //   createData('1234557898', "OrderMyGear", "Unprocessed", "Macbook Air", 800),
  //   createData('1234557898', "OrderMyGear", "Unprocessed", "Macbook Air", 800),
  //   createData('1234557898', "OrderMyGear", "Unprocessed", "Macbook Air", 800),
  //   createData('1234557898', "OrderMyGear", "Unprocessed", "Macbook Air", 800),
  //   createData('1234557898', "OrderMyGear", "Unprocessed", "Macbook Air", 800),
  //   createData('1234557898', "OrderMyGear", "Unprocessed", "Macbook Air", 800),
  //   createData('1234557898', "OrderMyGear", "Unprocessed", "Macbook Air", 800),
  //   createData('1234557898', "OrderMyGear", "Unprocessed", "Macbook Air", 800),
  //   createData('1234557898', "OrderMyGear", "Unprocessed", "Macbook Air", 800),
  
  // ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'serialNum',
    numeric: false,
    disablePadding: true,
    label: 'Serial Number',
  },
  {
    id: 'donatedBy',
    numeric: false,
    disablePadding: false,
    label: 'Donated By',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'model',
    numeric: false,
    disablePadding: false,
    label: 'Model',
  },
  {
    id: 'value',
    numeric: true,
    disablePadding: false,
    label: 'Value',
  },
  {
    id: 'seeMore',
    numeric: false,
    disablePadding: false,
    label: 'See More',
  },
];

function EnhancedTableHead(props) {
  const {order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="right"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Laptop Inventory
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('donatedBy');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = dummyLaptopData.map((n) => n.serialNum);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dummyLaptopData.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dummyLaptopData.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(dummyLaptopData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="1em"
                        align="right"
                      >
                        {row.serialNum}
                      </TableCell>
                      <TableCell align="right">{row.originalDonor}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.model}</TableCell>
                    <TableCell align="right">${row.value}</TableCell>
                    <TableCell align="right"><OpenInNewIcon/></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dummyLaptopData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
