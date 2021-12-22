import React, {useEffect} from 'react';


const Alert=({type, msg, removeAlert, list}) => {
useEffect(() => {
    const timeout = setTimeout(() => {
        removeAlert();

    }, 3000);
    return () => clearTimeout(timeout);
}, [list])
return <p classNmae = {`alert alert-${type}`}>{msg}</p>;
};

export default Alert
