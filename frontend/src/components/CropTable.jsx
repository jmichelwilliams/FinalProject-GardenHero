import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Snackbar } from '@mui/material';

// Component that renders the available crops in a table
const CropTable = ({ data, onAddToGarden, selectedDate }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Function to add to garden in the user's plantbox
  // Function to add to garden in the user's plantbox
  const handleAddToGarden = async (crop) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = selectedDate.toLocaleDateString('en-US', options);

    // Get the harvest date (selected date + daysToHarvest)
    const harvestDate = new Date(selectedDate);
    harvestDate.setDate(harvestDate.getDate() + crop.daysToHarvest);
    const formattedHarvestDate = harvestDate.toLocaleDateString(
      'en-US',
      options,
    );
    const uniqueKey = `${crop._id}_${Date.now()}`;

    // added the 2 key/value plantedOn and harvestDate
    const modifiedCrop = {
      ...crop,
      _id: uniqueKey,
      plantedOn: formattedDate,
      harvestDate: formattedHarvestDate,
    };

    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`/plantbox/${user.sub}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ crop: modifiedCrop }),
      });
      if (response.ok) {
        setSnackbarMessage('Crop added to the garden!');
        setOpenSnackbar(true);
        onAddToGarden();
      } else {
        throw new Error();
      }
    } catch (error) {
      setSnackbarMessage(
        'Failed to add crop to the garden, please try again later',
      );
      setOpenSnackbar(true);
    }
  };

  return (
    <StyledTableContainer>
      <StyledTable size="small" aria-label="Crop Table">
        <TableHead>
          <StyledTableHeadRow>
            <StyledTableHeadCell align="left">Name</StyledTableHeadCell>
            <StyledTableHeadCell align="left">Soil</StyledTableHeadCell>
            <StyledTableHeadCell align="left">
              Temperature&nbsp;ºC
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left">
              Planting Season
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left">
              Days To Harvest
            </StyledTableHeadCell>
            <StyledTableHeadCell align="left">
              Add to Garden
            </StyledTableHeadCell>
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
              <TableCell align="left">
                {Math.round(((crop.temperature - 32) * 5) / 9)}
              </TableCell>
              <TableCell align="left">{crop.plantingSeason}</TableCell>
              <TableCell align="left">{crop.daysToHarvest}</TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => handleAddToGarden(crop)}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </StyledTableContainer>
  );
};

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
  onAddToGarden: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
};

CropTable.defaultProps = {
  selectedDate: '',
};
const StyledTableContainer = styled(TableContainer)`
  width: 100%;
  height: 40%;
  margin: 16px;
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
  font-weight: bold !important;
  color: #606c38 !important;
  font-size: 16px !important;
`;

const StyledTableBody = styled(TableBody)`
  overflow-y: auto;
  max-height: 200px;
`;

export default CropTable;
