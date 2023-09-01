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
import getTemperatureInCelsius from '../util_functions';

import DatePickerDialog from './DatePickerDialog';

// Component that renders the available crops in a table
const CropTable = ({ data, onAddToGarden }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedDate, setSelectedDate] = useState();

  // Function to add to garden in the user's plantbox
  const handleAddToGarden = async (crop) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const currentDate = new Date();

    const effectiveDate = selectedDate ? selectedDate.$d : currentDate;

    const formattedDate = effectiveDate.toLocaleDateString('en-US', options);

    // Get the harvest date (selected date + daysToHarvest)
    const harvestDate = new Date(effectiveDate);
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
      const response = await fetch(`${BACKEND_URL}/plantbox/${user.sub}`, {
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
        setSelectedDate(null);
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

  // Function to Open Date Picker
  const openDatePicker = (crop) => {
    setSelectedCrop(crop);
    setIsDatePickerOpen(true);
  };

  // Function to Close Date Picker
  const closeDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  return (
    <StyledTableContainer>
      <StyledTable size="small" aria-label="Crop Table">
        <TableHead>
          <StyledTableHeadRow>
            <StyledTableHeadCell align="left">Name</StyledTableHeadCell>
            <StyledTableHeadCell align="left">Soil</StyledTableHeadCell>
            <StyledTableHeadCell align="center">
              Temperature&nbsp;ºC
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center">
              Planting Season
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center">
              Days To Harvest
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center">
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
              <TableCell align="center">
                {getTemperatureInCelsius(crop.temperature)}
              </TableCell>
              <TableCell align="center">{crop.plantingSeason}</TableCell>
              <TableCell align="center">{crop.daysToHarvest}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  sx={{ marginLeft: '8px' }}
                  onClick={() => openDatePicker(crop)}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
      <DatePickerDialog
        open={isDatePickerOpen}
        onClose={closeDatePicker}
        handleAddToGarden={handleAddToGarden}
        selectedCrop={selectedCrop}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
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
