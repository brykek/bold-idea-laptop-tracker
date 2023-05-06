import React, { useState } from 'react';
import { visuallyHidden } from '@mui/utils';

// MATERIAL-UI COMPONENTS
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Paper,
  IconButton,
  Button
} from '@mui/material';

// MATERIAL ICONS
import {
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';


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


function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => onRequestSort(event, property);
  const headCells = [
    { id: 'status', label: 'Status' },
    { id: 'model', label: 'Model' },
    { id: 'screen_size', label: 'Screen Size' },
    { id: 'donatedBy', label: 'Donated By' },
    { id: 'value', label: 'Value' },
  ];

  return (
    <TableHead>
      <TableRow sx={{ width: '100%' }} >
        <TableCell sx={{ fontWeight: 'bold' }}>Serial</TableCell>
        {headCells.map((headCell) => (
          <TableCell sx={{ fontWeight: 'bold' }} key={headCell.id} sortDirection={orderBy === headCell.id ? order : false} >
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)} >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell sx={{ fontWeight: 'bold' }} >See More</TableCell>
      </TableRow>
    </TableHead>
  );
}

function LaptopTable(props) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('status');
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.laptops.length) : 0;

  return <>
    <Typography variant='h6' color='primary' sx={{ mt: 1, mb: 1 }} >Found <strong>{props.laptops.length}</strong> laptops:</Typography>

    <Box sx={{ width: '100%' }} >
      <Paper sx={{ width: '100%', mb: 2 }} >
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'} >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.laptops.length}
            />
            <TableBody>
              {props.laptops.slice().sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(laptop => {

                  return (
                    <TableRow hover tabIndex={-1} key={laptop.name} >
                      <TableCell>{laptop.serial_number}</TableCell>
                      <TableCell>{laptop.status}</TableCell>
                      <TableCell>{laptop.model}</TableCell>
                      <TableCell>{laptop.screen_size}</TableCell>
                      <TableCell>{laptop.donor}</TableCell>
                      <TableCell>{laptop.trade_in_value?'$'+laptop.trade_in_value:''}</TableCell>
                      <TableCell>
                        <IconButton
                          size='small'
                          onClick={() => props.openModal(laptop.id)}
                        >
                          <OpenInNewIcon fontSize='small' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (63) * emptyRows, }} >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component='div'
          count={props.laptops.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }} >
        <Button
          variant='contained'
          color='secondary'
          onClick={props.exportData}
        >Export Data as .CSV</Button>
      </Box>
    </Box>
  </>;
}

export default LaptopTable;