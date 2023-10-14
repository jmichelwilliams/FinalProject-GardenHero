import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoginButton from './LoginButton';

// Component to render the login dialog used in the cropDetails page
const LoginRequiredDialog = () => {
  const [open, setOpen] = React.useState(false);

  // Function to open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="primary"
        sx={{
          height: '60px',
          width: '150px',
          marginRight: '8px',
        }}
      >
        Go to Planner
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Login Required</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please log in to get access to the Planner.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoginButton isSmall buttonText="Log in" />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginRequiredDialog;
