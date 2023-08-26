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
import { Button, Snackbar, CircularProgress } from '@mui/material';

// Component that renders a table with the data supplied
const GardenTable = ({ data, onRemoveFromGarden }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the removal of a crop from the user's garden
  const handleRemoveFromGarden = async (crop) => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`/plantbox/${user.sub}`, {
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
    } finally {
      setIsLoading(false);
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
            <StyledTableHeadCell align="left">Planted on</StyledTableHeadCell>
            <StyledTableHeadCell align="left">Harvest Date</StyledTableHeadCell>
            <StyledTableHeadCell align="left">
              Remove from garden
            </StyledTableHeadCell>
          </StyledTableHeadRow>
        </TableHead>
        {isLoading ? (
          <CircularProgress size={20} />
        ) : (
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
                <TableCell align="left">{crop.plantedOn}</TableCell>
                <TableCell align="left">{crop.harvestDate}</TableCell>
                <TableCell align="left">
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
        )}
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

GardenTable.propTypes = {
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
  onRemoveFromGarden: PropTypes.func.isRequired,
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
export default GardenTable;
