import Web3 from "web3";
import { RPC } from "./constants";

export const getBalance = async (account) => {
  let web3 = new Web3(RPC);
  let bal = (await web3.eth.getBalance(account) / 1e18).toFixed(3);


  return bal;
};
