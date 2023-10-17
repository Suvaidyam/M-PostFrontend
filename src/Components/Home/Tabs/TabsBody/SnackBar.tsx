import React, { useContext } from 'react'
import { MyContext } from '../../../../Context/Context';
import { Snackbar, Alert } from "@mui/material";
type Props = {}

function SnackBar({ }: Props) {
    const { Msg, error, setError, status } = useContext(MyContext);

    const handleClose = () => {
        setError(false);
    };
    return (
        <>
            {status === 200 ? <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {Msg}
                </Alert>
            </Snackbar> :
                <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {Msg}</Alert>
                </Snackbar>}
            {status === 500 && <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {Msg}</Alert>
            </Snackbar>}
        </>
    )
}

export default SnackBar