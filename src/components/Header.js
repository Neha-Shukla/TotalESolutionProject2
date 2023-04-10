import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import { getCurrentAccount, logout } from "../config";
import Cookies from "js-cookie";
import { useParams } from "react-router";
import { toast } from "react-hot-toast";
import { getPaymentTokenBal } from "../helpers/setterFunction";
import { async } from "q";

function Header() {
  const { walletAddress } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [account, setAccount] = useState(Cookies.get("account"));
  const [balance, setBalance] = useState(Cookies.get("balance"));
  const [paymentTokenBal, setPaymentTokenBal] = useState(0)

  useEffect(() => {
    if ( walletAddress !== undefined && 
      walletAddress?.toLowerCase() === Cookies.get("account")?.toLowerCase()
    ) {
      
      setTimeout(() => {
        logout();
        toast.error("Your referral address and connected wallet cannot be the same.");
      }, 3000);
      return;
    }
   
    setAccount(Cookies.get("account"));
    setBalance(Cookies.get("balance"));
    const fetch = async () => {
      const ptBal = await getPaymentTokenBal(Cookies.get("account"));
      setPaymentTokenBal(ptBal)
    }
    if(Cookies.get("account"))
    fetch()
  }, [Cookies.get("account"), Cookies.get("balance")]);

  return (
    <nav class="navbar p-0 fixed-top d-flex flex-row">
      {showModal && <Modal />}
      <div class="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
        <a class="navbar-brand brand-logo-mini" href="index.html">
          <img src="assets/images/logo-mini.svg" alt="logo" />
        </a>
      </div>
      <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
        <button
          class="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span class="mdi mdi-menu"></span>
        </button>

        <ul class="navbar-nav navbar-nav-right">
          {!account ? (
            <li class="nav-item dropdown d-none d-lg-block">
              <button
                class="nav-link btn btn-success create-new-button"
                onClick={() => setShowModal(true)}
              >
                Connect Wallet
              </button>
            </li>
          ) : (
            <li className="d-flex justify-content-center align-items-center">
              <div className="account" onClick={() => logout()}>
                {account?.slice(0, 5) + "..." + account?.slice(38, 42)}
              </div>
              <div className="bal-icon">
                USDT : &nbsp; 
                <span>{Number(paymentTokenBal)?.toFixed(4)}</span>
              </div>
              <div className="bal-icon">
                <img src="assets/images/binance.png" />
                <span>{Number(balance)?.toFixed(4)}</span>
              </div>
            </li>
          )}
        </ul>
        <button
          class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span class="mdi mdi-format-line-spacing"></span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
