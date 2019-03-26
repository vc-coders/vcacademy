import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

let id = 0;
function createData(name, rollno, course, fee, status) {
  id += 1;
  return { id, name, rollno, course, fee, status };
}

const data = [
  createData('Ella', 101, 'PTE', '₹ 15000', 'Paid'),
  createData('Donna', 102, 'Ielts', '₹ 20000', 'Paid'),
  createData('Lauren', 103, 'Ielts', '₹ 10000', 'Half Paid'),
  createData('Ruth', 104, 'PTE', '₹ 15000', 'Paid'),
  createData('Wendy', 105, 'Ielts', '₹ 15000', 'Half Paid'),
];

function SimpleTable(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Roll Number</TableCell>
            <TableCell align="right">Course</TableCell>
            <TableCell align="right">Fee</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.name}
              </TableCell>
              <TableCell align="right">{n.rollno}</TableCell>
              <TableCell align="right">{n.course}</TableCell>
              <TableCell align="right">{n.fee}</TableCell>
              <TableCell align="right">{n.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
