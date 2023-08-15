import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import styled from 'styled-components';

const CropTable = ({ data }) => (
  <StyledTableContainer>
    <StyledTable size="small" aria-label="Crop Table">
      <TableHead>
        <StyledTableHeadRow>
          <StyledTableHeadCell align="left">Name</StyledTableHeadCell>
          <StyledTableHeadCell align="left">Soil</StyledTableHeadCell>
          <StyledTableHeadCell align="left">
            Temperature&nbsp;ºF
          </StyledTableHeadCell>
          <StyledTableHeadCell align="left">
            Planting Season
          </StyledTableHeadCell>
          <StyledTableHeadCell align="left">
            Days To Harvest
          </StyledTableHeadCell>
          <StyledTableHeadCell align="left">Add to Garden</StyledTableHeadCell>
        </StyledTableHeadRow>
      </TableHead>
      <StyledTableBody>
        {data.map((crop) => (
          <TableRow
            key={crop._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {crop.name}
            </TableCell>
            <TableCell align="left">{crop.soil}</TableCell>
            <TableCell align="left">{crop.temperature}</TableCell>
            <TableCell align="left">{crop.plantingSeason}</TableCell>
            <TableCell align="left">{crop.daysToHarvest}</TableCell>
            <TableCell align="left">
              <Button variant="contained" size="small" color="primary">
                Add
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </StyledTableBody>
    </StyledTable>
  </StyledTableContainer>
);

CropTable.propTypes = {
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

const StyledTableContainer = styled(TableContainer)`
  width: 100%;
  height: 40%;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
  table-layout: fixed;
`;

const StyledTableHeadRow = styled(TableRow)`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fefae0;
`;

const StyledTableHeadCell = styled(TableCell)`
  &:first-child {
    left: 0;
  }
`;

const StyledTableBody = styled(TableBody)`
  overflow-y: auto;
  max-height: 200px;
`;
export default CropTable;
