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
    let bal = await web3Provider.getBalance(res[0]);
    bal = ethers.utils.formatEther(bal);
    Cookies.set("account", res[0], {
      expires: 7,
    });
    Cookies.set("balance", bal, {
      expires: 7,
    });
    Cookies.set(
      "chainId",
      JSON.parse(localStorage.getItem("walletconnect"))?.connected === true
        ? JSON.parse(localStorage.getItem("walletconnect"))?.chainId
        : "",
      {
        expires: 7,
      }
    );
    Cookies.set("connectedWallet_label", "walletConnect", {
      expires: 7,
    });
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
        let _provider = new ethers.providers.Web3Provider(window.ethereum);
        let bal = await _provider.getBalance(res[0]);
        bal = ethers.utils.formatEther(bal);
        Cookies.set("account", res[0], {
          expires: 7,
        });
        Cookies.set("balance", bal, {
          expires: 7,
        });
        Cookies.set("chainId", window.ethereum.networkVersion, {
          expires: 7,
        });
        Cookies.set("connectedWallet_label", "metamask", {
          expires: 7,
        });
        console.log("Provider meta", window?.ethereum);
        window.location.reload();
      });
  } else {
    alert("install metamask extension!!");
  }
};

export const getCurrentProvider = async () => {
  let wallet = Cookies.get("connectedWallet_label");
  let _provider;
  if (wallet === "walletConnect") {
    _provider = new WalletConnectProvider({
      rpc: "https://polygon-mumbai.g.alchemy.com/v2/8RAii8kDi0Fwe47iF1_WLjpcSfp3q3R6",
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

// export const getCurrentAccount = async () => {
//   let wallet = Cookies.get("connectedWallet_label");

//   if (wallet === "walletConnect") {
//     let _provider = await getCurrentProvider();
//     const res = await _provider.listAccounts();
//     let bal = await _provider.getBalance(res[0]);
//     bal = ethers.utils.formatEther(bal);
//     return [res[0], bal];
//   } else if (wallet === "metamask") {
//     try {
//       let res = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       let _provider = await getCurrentProvider();
//       let bal = await _provider.getBalance(res[0]);
//       bal = ethers.utils.formatEther(bal);
//       return [res[0], bal];
//     } catch (err) {
//       console.log("err", err);
//     }
//   }
// };

export const logout = () => {
  Cookies.remove("connectedWallet_label");
  Cookies.remove("chainId");
  Cookies.remove("account");
  Cookies.remove("balance");
  window.location.reload();
};
