import React, { useEffect, useState } from 'react';
import { Alert, Slide, IconButton, LinearProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '../redux/alertSlice'; // Update path based on your setup

const AlertMessage = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.alert);

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer;

    if (open) {
      setProgress(100);
      timer = setInterval(() => {
        setProgress((oldProgress) => (oldProgress > 0 ? oldProgress - 1 : 0));
      }, 100);

      setTimeout(() => {
        dispatch(closeAlert());
      }, 10000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [open, dispatch]);

  const handleClose = () => {
    dispatch(closeAlert());
  };

  // Mapping severity to color
  const getProgressColor = (severity) => {
    switch (severity) {
      case 'error':
        return '#f44336'; // Red
      case 'warning':
        return '#ffa726'; // Orange
      case 'info':
        return '#2196f3'; // Blue
      case 'success':
      default:
        return '#4caf50'; // Green
    }
  };

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <div style={{ position: 'fixed', top: "20px", right: "10px", width: '300px', zIndex: 1000 }}>
        <div style={{ position: 'relative' }}>
          {/* Progress bar positioned at the top of the alert */}
          <LinearProgress
            variant="determinate"
            value={progress}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '4px',
              backgroundColor: 'transparent',
              color: getProgressColor(severity),
            }}
            sx={{
              '& .MuiLinearProgress-bar': {
                backgroundColor: getProgressColor(severity),
              },
            }}
          />
          <Alert
            severity={severity}
            action={
              <>
                <IconButton size="small" onClick={handleClose} color="inherit">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
            style={{
              paddingTop: '4px', // Add padding so the alert's content doesn't overlap the progress bar
            }}
          >
            {message}
          </Alert>
        </div>
      </div>
    </Slide>
  );
};

export default AlertMessage;
