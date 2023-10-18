import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Snackbar } from '@mui/material';
import getTemperatureInCelsius from '../util_functions';
import BACKEND_URL from '../constants';

interface GardenCrop {
  _id: string;
  name: string;
  soil: string;
  temperature: number;
  plantedOn: string;
  harvestDate: number;
}

interface GardenTableProps {
  data: GardenCrop[];
  onRemoveFromGarden: () => void;
}

const StyledTableContainer = styled(TableContainer)`
  width: 100%;
  height: 40%;
  margin: 16px;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
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

// Component that renders a table with the data supplied
const GardenTable: React.FC<GardenTableProps> = ({
  data,
  onRemoveFromGarden,
}) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Function to handle the removal of a crop from the user's garden
  const handleRemoveFromGarden = async (crop: GardenCrop) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const userId = user?.sub || '';

      const response = await fetch(`${BACKEND_URL}/plantbox/${userId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ crop }),
      });
      if (response.ok) {
        setSnackbarMessage('Crop removed from garden!');
        setOpenSnackbar(true);
        onRemoveFromGarden();
      } else {
        throw new Error();
      }
    } catch (error) {
      setSnackbarMessage(
        'Failed to remove crop from the garden, please try again later',
      );
      setOpenSnackbar(true);
    }
  };
  return (
    <StyledTableContainer>
      <StyledTable size="small" aria-label="Crop Table">
        <TableHead>
          <StyledTableHeadRow>
            <StyledTableHeadCell align="center">Name</StyledTableHeadCell>
            <StyledTableHeadCell align="center">Soil</StyledTableHeadCell>
            <StyledTableHeadCell align="center">
              Temperature&nbsp;ºC
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center">Planted on</StyledTableHeadCell>
            <StyledTableHeadCell align="center">
              Harvest Date
            </StyledTableHeadCell>
            <StyledTableHeadCell align="center">
              Remove from garden
            </StyledTableHeadCell>
          </StyledTableHeadRow>
        </TableHead>
        <StyledTableBody>
          {data.map((crop) => (
            <TableRow
              key={crop._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {crop.name}
              </TableCell>
              <TableCell align="center">{crop.soil}</TableCell>
              <TableCell align="center">
                {getTemperatureInCelsius(crop.temperature)}
              </TableCell>
              <TableCell align="center">{crop.plantedOn}</TableCell>
              <TableCell align="center">{crop.harvestDate}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={() => handleRemoveFromGarden(crop)}
                >
                  Remove
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

export default GardenTable;
