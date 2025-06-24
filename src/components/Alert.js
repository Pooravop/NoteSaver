import React, { useEffect } from 'react';

function Alert({ alert, setAlert }) {
  const capitalize = (word) => {
    if (word === 'danger') {
      word = 'error';
    }
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  // Automatically dismiss the alert after 3 seconds (3000ms)
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null); // make sure to pass this function from parent
      }, 3000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [alert, setAlert]);

  return (
    <div style={{ marginTop: "56px", marginBottom: "16px", height: '50px' }}>
      {alert &&
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(alert.type)}</strong>: {alert.msg}
        </div>}
    </div>
  );
}

export default Alert;
