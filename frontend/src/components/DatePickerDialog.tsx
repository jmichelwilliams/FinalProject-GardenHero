import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CircularProgress } from '@mui/material';

interface Crop {
  name: string;
  soil: string;
  temperature: number;
  plantingSeason: string;
  daysToHarvest: number;
  url: string;
}
interface DatePickerDialogProps {
  open: boolean;
  onClose: () => void;
  selectedCrop: Crop;
  handleAddToGarden: (crop: Crop) => Promise<void>;
  setSelectedDate: (date: Dayjs) => void;
}

// Component that renders a modal to allow user to pick a date
const DatePickerDialog: React.FC<DatePickerDialogProps> = ({
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
                onChange={(date) => setSelectedDate(date as Dayjs)}
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

export default DatePickerDialog;
