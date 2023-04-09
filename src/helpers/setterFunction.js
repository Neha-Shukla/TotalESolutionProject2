import { ethers } from "ethers";
import { TokenBEP20, tokenSale } from "../config/contracts";
import tokenSaleABI from "../config/tokenSale.json"
import tokenBep20Abi from "../config/tokenBEP.json"

import toast from "react-hot-toast";
import BigNumber from "bignumber.js"
import { getCurrentProvider } from "../connectWallet";

const targetNetworkId = '0x61';
export const exportInstance = async (SCAddress, ABI) => {
  let pro = await getCurrentProvider()
  console.log("pro", pro)
  let provider = pro;
  let signer = provider.getSigner();
  let a = new ethers.Contract(SCAddress, ABI, signer);
  if (a) {
    return a;
  } else {
    return {};
  }
};

export const tokenSaleContract = async () => {
  let contract = await exportInstance(tokenSale, tokenSaleABI);
  console.log("token sale contract is------>", contract);
  return contract
}

export const userIncome = async (address) => {
  let network = checkNetwork();
  if (network == false) {
    await switchNetwork();
  }
  let contract = await tokenSaleContract();
  console.log("contract is---->", contract);
  let data = await contract.users(address);
  console.log("userIncome data is", data)
  let isWithdrawEnabled = await contract.isWithdrawEnabled()
  let token = await exportInstance(TokenBEP20, tokenBep20Abi)
  let tokenBal = await token.balanceOf(address)

  return { data: data, tokenBalance: tokenBal, isWithdrawEnabled: isWithdrawEnabled }
};


export const handleBuyToken = async (account, ref) => {
  let network = checkNetwork();
  if (network == false) {
    await switchNetwork();
  }
  try {
    let contract = await tokenSaleContract();
    console.log("contract is---->", contract);
    let amount = (await contract.getAmountToBePaid()).toString()
    let es
    try {
      es = await contract.estimateGas.buyToken(
        ref, { from: account, value: amount }
      )

    }
    catch (err) {
      console.log("errrr", err)
      toast.error("Error while buying.." + err.data?.message)
      console.log("error", err.code)
      return false
    }
    let priceLimit = new BigNumber(es.toString()).plus(new BigNumber(es.toString()).multipliedBy(0.1))
    let data = await contract.buyToken(ref, { from: account, value: amount, gasLimit: Math.ceil(parseFloat(priceLimit.toString())) });
    console.log("userIncome data is", data)
    data = await data.wait()
    if (data.status)
      toast.success("Successfully purchased")
    else
      toast.error("Error while buying..")
    return data;
  }
  catch (err) {
    toast.error("Error while buying.." + err.message)
    console.log("error", err.code)
    return false
  }
}

export const withdrawLevelIncome = async (account) => {
  let network = checkNetwork();
  if (network == false) {
    await switchNetwork();
  }
  try {
    let es;
    let contract = await tokenSaleContract();
    try {
      es = await contract.estimateGas.withdrawLevelIncome()
    }
    catch (err) {
      console.log("errrr", err)
      toast.error("Error while buying.." + err.code)
      console.log("error", err.code)
      return false
    }
    let priceLimit = new BigNumber(es.toString()).plus(new BigNumber(es.toString()).multipliedBy(0.1))


    let data = await contract.withdrawLevelIncome({ from: account, gasLimit: Math.ceil(parseFloat(priceLimit.toString())) });
    data = await data.wait()
    if (data.status)
      toast.success("Successfully purchased")
    else
      toast.error("Error while buying..")
    return data
  }
  catch (err) {
    toast.error("Error while buying.." + err.code)
    console.log("error")
    return false
  }
}


export const checkNetwork = async () => {
  if (window.ethereum) {
    const currentChainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    // return true if network id is the same
    console.log("current chain id is", currentChainId, process.env.ChainID);
    if (currentChainId == targetNetworkId) return true;
    // return false is network id is different
    return false;
  }
};

export const switchNetwork = async () => {
let provider = await getCurrentProvider()

  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: targetNetworkId }],
  });
  // refresh
  window.location.reload();


};

export const handleCopyToClipboard = async copyMe => {
  console.log("copy me")
  try {
    await navigator.clipboard.writeText(copyMe);
    toast.success('Copied!');
  } catch (err) {
    console.log("err", err)
    toast.error('Failed to copy!');
  }
};