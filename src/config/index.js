import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Cookies from "js-cookie";
import { supportedRpcs } from "./supportedRPCs";

export const walletConnect = async () => {
  try {
    const _provider = new WalletConnectProvider({
      rpc: supportedRpcs,
    });
    const web3Provider = new providers.Web3Provider(_provider);
    await _provider.enable();
    const res = await web3Provider.listAccounts();
    localStorage.setItem(
      "chainId",
      JSON.parse(localStorage.getItem("walletconnect"))?.connected === true
        ? JSON.parse(localStorage.getItem("walletconnect"))?.chainId
        : ""
    );
    localStorage.setItem("connectedWallet_label", "walletConnect");
    window.location.reload();
    return _provider;
  } catch (err) {
    console.log("err", err);
  }
};

export const connectWithMetamask = async () => {
  if (window.ethereum) {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(async (res) => {
        Cookies.set("account", res[0], {
          expires: 7,
        });
        localStorage.setItem("chainId", window.ethereum.networkVersion);
        localStorage.setItem("connectedWallet_label", "metamask");
        console.log("Provider meta", window?.ethereum);
        window.location.reload();
      });
  } else {
    alert("install metamask extension!!");
  }
};

export const getCurrentProvider = async () => {
  let wallet = localStorage.getItem("decrypt_redeem_connectedWallet");
  let _provider;
  if (wallet === "walletConnect") {
    _provider = new WalletConnectProvider({
      rpc: supportedRpcs,
    });
    //  Wrap with Web3Provider from ethers.js
    const web3Provider = new providers.Web3Provider(_provider);
    await _provider.enable();
    return web3Provider;
  } else if (wallet === "metamask") {
    _provider = new ethers.providers.Web3Provider(window.ethereum);
    return _provider;
  }
};

export const getCurrentAccount = async () => {
  let wallet = localStorage.getItem("connectedWallet_label");

  if (wallet === "walletConnect") {
    let _provider = await getCurrentProvider();
    const res = await _provider.listAccounts();
    console.log("Accounts", res);
    return res[0];
  } else if (wallet === "metamask") {
    try {
      let res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return res[0];
    } catch (err) {
      console.log("err", err);
    }
  }
};
