import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
    modal: string[],
    handleModalClose(): void,
    open: any
}

function ActionModal({modal, handleModalClose, open } : Props) {

    const vertical = 'bottom';
    const horizontal = 'right';

    const modalStyle = {
        width: '100%',
        fontSize: '1.05rem'
    }

    return (
        <>
            <Snackbar
                open={open.view}
                autoHideDuration={6000}
                onClose={handleModalClose}
                message={modal[0]}
                anchorOrigin={{vertical, horizontal}}
            >
                <Alert onClose={handleModalClose} severity="info" >
                    {modal[0]}
                </Alert>
            </Snackbar>
        </>
    )
}
export default ActionModal;