import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const PlannerTable = ({ data }) => (
  <TableContainer sx={{ width: '100%', height: '50%' }}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Crop ID</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Soil</TableCell>
          <TableCell align="right">Temperature&nbsp;ºF</TableCell>
          <TableCell align="right">plantingSeason</TableCell>
          <TableCell align="right">daysToHarvest</TableCell>
          <TableCell align="right">Add to Garden</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((crop) => (
          <TableRow
            key={crop.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {/*  eslint-disable-next-line no-underscore-dangle */}
              {crop._id}
            </TableCell>

            <TableCell align="right">{crop.name}</TableCell>
            <TableCell align="right">{crop.soil}</TableCell>
            <TableCell align="right">{crop.temperature}</TableCell>
            <TableCell align="right">{crop.plantingSeason}</TableCell>
            <TableCell align="right">{crop.daysToHarvest}</TableCell>
            <TableCell align="right">
              <Button variant="contained" size="small" color="primary">
                Add
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

PlannerTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      soil: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
      plantingSeason: PropTypes.string.isRequired,
      daysToHarvest: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

// const StyledTableContainer = styled.div`
//   width: 50%;
//   background-color: white;
// `;
export default PlannerTable;
