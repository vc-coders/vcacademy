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
    marginTop: '1.5%'
  },
  table: {
    minWidth: 700,
  },
};

function SimpleTable(props) {
  const { classes } = props;
  const { data } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Father Name</TableCell>
            <TableCell align="right">Date Of Birth</TableCell>
            <TableCell align="right">Date Of Joining</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Ielts Band</TableCell>
            <TableCell align="right">Study</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.docs.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.data().userName}
              </TableCell>
              <TableCell align="right">{n.data().userEmail}</TableCell>
              <TableCell align="right">{n.data().address}</TableCell>
              <TableCell align="right">{n.data().fatherName}</TableCell>
              <TableCell align="right">{new Date(n.data().dateOfBirth.seconds * 1000).getDate()}/{new Date(n.data().dateOfBirth.seconds * 1000).getMonth()}/{new Date(n.data().dateOfBirth.seconds * 1000).getFullYear()}</TableCell>
              <TableCell align="right">{new Date(n.data().dateOfJoining.seconds * 1000).getDate()}/{new Date(n.data().dateOfJoining.seconds * 1000).getMonth()}/{new Date(n.data().dateOfJoining.seconds * 1000).getFullYear()}</TableCell>
              <TableCell align="right">{n.data().gender}</TableCell>
              <TableCell align="right">{n.data().ieltsBand}</TableCell>
              <TableCell align="right">{n.data().study}</TableCell>
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
