import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SmallLoginButton from './SmallLoginButton';

const DialogWindow = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
          <SmallLoginButton buttonText="Log in" />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogWindow;
