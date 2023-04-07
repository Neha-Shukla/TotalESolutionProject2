import React, { useRef } from "react";
import useStyles from "./ModalStyles";
import { connectWithMetamask, walletConnect } from "../../config";

const Modal = () => {
  const classes = useStyles();
  const modal = useRef(null);

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modal} ref={modal}>
        <div className={classes.walletContainer}>
          <h3 className={classes.walletMainHeading}>Connect Wallet</h3>
          <div className={classes.walletHeading}>
            Start by connecting with one of the wallets below. Be sure to store
            your private keys or seed phrase securely. Never share them with
            anyone.
          </div>
          <div className="row justify-content-evenly">
            <div
              className={`col-md-6 ${classes.imgContainer} ${classes.metamask} `}
              onClick={async () => {
                await connectWithMetamask();
              }}
            >
              <img
                className={classes.walletIcon}
                src="assets/images/metamask.png"
              />
            </div>
            <div
              className={`col-md-6 ${classes.imgContainer} ${classes.walletConnect}`}
              onClick={async () => {
                await walletConnect();
              }}
            >
              <img
                className={classes.walletIcon}
                src="assets/images/walletConnect.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
