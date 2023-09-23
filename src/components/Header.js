import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import { getCurrentAccount, logout } from "../config";
import Cookies from "js-cookie";
import { useParams } from "react-router";
import { toast } from "react-hot-toast";
import { getPaymentTokenBal, getTokenBalance } from "../helpers/setterFunction";
import { async } from "q";

function Header() {
  const { walletAddress } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [account, setAccount] = useState(Cookies.get("account"));
  const [balance, setBalance] = useState(Cookies.get("balance"));
  const [paymentTokenBal, setPaymentTokenBal] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0)

  useEffect(() => {
    if (
      walletAddress !== undefined &&
      walletAddress?.toLowerCase() === Cookies.get("account")?.toLowerCase()
    ) {
      setTimeout(() => {
        logout();
        toast.error(
          "Your referral address and connected wallet cannot be the same."
        );
      }, 3000);
      return;
    }

    setAccount(Cookies.get("account"));
    setBalance(Cookies.get("balance"));
    // const fetch = async () => {
    //   try {

    //     const ptBal = await getPaymentTokenBal(Cookies.get("account"));
    //     setPaymentTokenBal(ptBal);
    //     const tokenBal = await getTokenBalance(Cookies.get("account"));
    //     setTokenBalance(tokenBal)
    //   } catch (error) {
    //     console.log("error", error)
    //   }
    // };
    // if (Cookies.get("account")) fetch();
  }, [Cookies.get("account"), Cookies.get("balance")]);

  return (
    <nav class="navbar p-0 fixed-top d-flex flex-row">
      {showModal && <Modal />}
      <div class="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center sidebarLogo">
        <a class="navbar-brand brand-logo-mini" href="/">
          <img
            class="img-xs rounded-circle "
            src="assets/images/logo.jpeg"
            alt=""
          />
        </a>
      </div>
      <div class="navbar-menu-wrapper  d-flex align-items-stretch">
        <button
          class="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span class="mdi mdi-menu"></span>
        </button>

        <ul class="navbar-nav navbar-nav-right">
          {!account ? (
            <li class="nav-item dropdown d-lg-block">
              <button
                class="nav-link btn btn-success create-new-button"
                onClick={() => setShowModal(true)}
              >
                Connect Wallet
              </button>
            </li>
          ) : (
            <li className="d-flex justify-content-center align-items-center flex-wrap">
              <div class="dropdown">
                <button
                  class="btn btn-primary dropdown-toggle position-relative"
                  type="button"
                  data-toggle="dropdown"
                >
                  {account?.slice(0, 5) + "..." + account?.slice(38, 42)}
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu p-1">
                  <li className="my-1">
                    <div className="bal-icon">
                      <img src="assets/images/tether.png" />
                      <span>{String(paymentTokenBal).includes(".") ? Number(paymentTokenBal)?.toFixed(4) : Number(paymentTokenBal)}</span>
                    </div>
                  </li>
                  <li className="my-1">
                    <div className="bal-icon">
                      <img src="assets/images/binance.png" />
                      <span>{Number(balance)?.toFixed(4)}</span>
                    </div>
                  </li>
                  <li className="my-1">
                    <div className="bal-icon">
                      <img src="assets/images/logo.jpeg" />
                      <span>{String(tokenBalance).includes(".") ? Number(tokenBalance)?.toFixed(4) : Number(tokenBalance)}</span>
                    </div>
                  </li>
                  <li className="my-1 mt-2"><div className="account" onClick={() => logout()}>
                    Logout
                  </div></li>
                </ul>
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
