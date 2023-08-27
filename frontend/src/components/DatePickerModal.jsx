import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

// Component that renders a modal to allow user to pick a date
const DatePickerModal = ({
  open,
  onClose,
  selectedCrop,
  handleAddToGarden,
  setSelectedDate,
}) => {
  // Function to call handleAddToGarden and close the modal
  const handleAddToGardenAndClose = async () => {
    await handleAddToGarden(selectedCrop);
    onClose();
  };

  // Get today's date
  const today = dayjs();

  return (
    <Dialog open={open} onClose={onClose}>
      {selectedCrop ? (
        <>
          <DialogTitle>Plant {selectedCrop.name} on:</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                defaultValue={today}
                onChange={(date) => setSelectedDate(date)}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleAddToGardenAndClose}
              variant="contained"
              size="small"
              color="primary"
            >
              Add to garden
            </Button>
          </DialogActions>
        </>
      ) : (
        <CircularProgress size={20} />
      )}
    </Dialog>
  );
};

DatePickerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedCrop: PropTypes.instanceOf(Object),
  handleAddToGarden: PropTypes.func.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
};
DatePickerModal.defaultProps = {
  selectedCrop: {},
};
export default DatePickerModal;
