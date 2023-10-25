import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { fireContext } from '../Firebase/FireContext';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
    const [open, setOpen] = React.useState(false);
    const { arr,setArr } = React.useContext(fireContext)
    const [message,setMessage] = React.useState(null)

    const handleClick = (message1) => {
        setOpen(true);
        setMessage(message1)
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    React.useEffect(()=>{
        setArr([handleClick])
    },[])

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}