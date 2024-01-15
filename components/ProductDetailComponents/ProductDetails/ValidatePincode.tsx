import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { validate_pincode_state } from '../../../store/slices/product-detail-page-slices/pincode-validate-slice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
const ValidatePincode = ({ pincodeRes, setPincode, Loadings }: any) => {
  const [pincodeInput, setPincodeInput] = useState('');
  const validatePincodeFromStore = useSelector(validate_pincode_state);
  const handlePincodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPincode = event.target.value;
    setPincodeInput(newPincode);
    setPincode(newPincode); // Assuming setPincode is a function passed as a prop to update the pincode
  };
  console.log(
    'pincode ',
    pincodeInput,
    pincodeRes,
    validatePincodeFromStore?.data
  );
  return (
    <div>
      <label>Enter Your Pincode Below To Check the Delievry.</label>
      <input
        type="text"
        className="form-control w-50"
        value={pincodeInput}
        onChange={handlePincodeChange}
        placeholder="Enter the Pincode"
      />

      <div className="mt-2">
        {pincodeRes === true && pincodeInput !== '' && pincodeInput.length > 5 ? (
          <p>
            <CheckCircleIcon sx={{ color: 'green' }} /> Delivery Available
          </p>
        ) : pincodeRes === false && pincodeInput !== '' && pincodeInput.length > 5 ? (
          <p>
            <CancelIcon sx={{ color: 'red' }} /> Delivery not Available
          </p>
        ) : ''}
      </div>
    </div>
  );
};

export default ValidatePincode;
