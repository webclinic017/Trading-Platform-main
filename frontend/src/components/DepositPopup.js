import React, { useState } from "react";
import '../css/Popup.css';
import Cookies from 'js-cookie'
import axios from "axios";


const ROOT_URL = "http://127.0.0.1:5000"
function DepositPopup(props) {
  const [amount, setAmount]=useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setTrigger(false)
    await axios
    .post(ROOT_URL + "/addToWallet", {
      demat_id: Cookies.get('DematId'),
      amount: amount
     
    })
    .then((response) => {
      if (response.data.status === 'SUCCESS'){
         
          alert(amount + " added to wallet")
          props.setWalletBalance(parseFloat(amount) + parseFloat(props.walletBalance));
      }
     
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(()=>{
        setAmount('')
      });
  };
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="popup-submit-btn" onClick={handleSubmit}>
          Deposit
        </button>
        <button className="popup-close-btn" onClick={() => props.setTrigger(false)}>
            <i className="far fa-times-circle"></i>
        </button>
        <label className='popup-form-label'>Enter the amount to add in your wallet</label>
        <input className='popup-input-field' value = {amount} onChange={(e) => {setAmount(e.target.value)}} type="text"></input>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DepositPopup;