import { ethers } from "ethers";
import { TokenBEP20, tokenSale, PaymentToken } from "../config/contracts";
import tokenSaleABI from "../config/tokenSale.json"
import paymentTokenABI from "../config/paymentToken.json"
import tokenBEPABI from "../config/tokenBEP.json";

import toast from "react-hot-toast";
import BigNumber from "bignumber.js"
import { getCurrentProvider } from "../config/index";
import Loader from "../components/Loader";
import { async } from "q";
import { targetNetworkId } from "./constants";
import Cookies from "js-cookie";

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
  let token = await exportInstance(TokenBEP20, paymentTokenABI)
  let tokenBal = await token.balanceOf(address)

  return { data: data, tokenBalance: tokenBal, isWithdrawEnabled: isWithdrawEnabled }
};

export const checkAllowance = async (address) => {
  let network = checkNetwork();
  if (network == false) {
    await switchNetwork();
  }
  let contract = await exportInstance(PaymentToken, paymentTokenABI)
  let allowance = await contract.allowance(address, tokenSale);


  console.log("payment token contract is---->", contract);
  let all = parseFloat(allowance.toString());
  return all;
}

export const approve = async () => {
  // let network = checkNetwork();
  // if (network == false) {
  //   await switchNetwork();
  // }
  try {
    console.log("payment token is", PaymentToken)
    let paymentContract = await exportInstance(PaymentToken, paymentTokenABI);
    console.log("payment token contract is---->", paymentContract);
    console.log("spender is---->", tokenSale)
    // ethers.utils.parseUnits('1000000', 'ether');

    let amount = ethers.utils.parseUnits('100000', 'ether');
    console.log("ammount is---->", amount)
    console.log("tokensale address is--->", tokenSale);

    let approveRes = await paymentContract.approve(tokenSale, amount);
    console.log("approvale of payment token is---->", await approveRes.wait());


    return approveRes;
  } catch (e) {
    console.log("error is", e)
    toast.error("Approval Fails");
    return;
  }

}


export const handleBuyToken = async (account, ref) => {
  console.log("refeeral is------->", ref);
  let network = checkNetwork();
  if (network == false) {
    await switchNetwork();
  }
  try {

    let paymentContract = await exportInstance(PaymentToken, paymentTokenABI)
    let balance = await paymentContract.balanceOf(account);
    console.log("balance here is---------->", balance);
    const balanceEther = balance.div(ethers.BigNumber.from(10).pow(18)).toNumber();
    console.log("balance is---->", balanceEther); // Output: 1
    if (balanceEther < 20) {
      toast.error("Balance is less than 20$");
      return;
    }


    let contract = await tokenSaleContract();
    // console.log("contract is---->", contract);
    // let amount = (await contract.getAmountToBePaid()).toString()
    let es
    try {
      es = await contract.estimateGas.buyToken(
        ref, { from: account, value: 0 }
      )

    }
    catch (err) {
      console.log("errrr is---->", err.reason)
      toast.error("Error while buying.." + err.reason)
      console.log("error", err.reason)
      return false
    }
    let priceLimit = new BigNumber(es.toString()).plus(new BigNumber(es.toString()).multipliedBy(0.1))
    let data = await contract.buyToken(ref, { from: account, value: 0, gasLimit: Math.ceil(parseFloat(priceLimit.toString())) });
    console.log("userIncome data is", data)
    data = await data.wait()
    if (data.status) {
      toast.success("Successfully purchased");
      window.location.reload();
    }
    else
      toast.error("Error while buying..")
    return data;
  }
  catch (err) {
    console.log("error reasone is----->")
    toast.error("Error while buying.." + err.message)
    // console.log("error reasone is",err.reason)
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
    if (data.status) {
      toast.success("Successfully purchased")
      window.location.reload()
    }
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

export const withdrawReferralIncome = async (account) => {
  let network = checkNetwork();
  if (network == false) {
    await switchNetwork();
  }
  try {
    let es;
    let contract = await tokenSaleContract();
    try {
      es = await contract.estimateGas.withdrawReferralIncome()
    }
    catch (err) {
      console.log("errrr", err.reason)
      toast.error("Error while buying.." + err.reason)
      console.log("error", err.code)
      return false
    }
    let priceLimit = new BigNumber(es.toString()).plus(new BigNumber(es.toString()).multipliedBy(0.1))


    let data = await contract.withdrawReferralIncome({ from: account, gasLimit: Math.ceil(parseFloat(priceLimit.toString())) });
    data = await data.wait()
    if (data.status) {
      toast.success("Successfully purchased")
      window.location.reload()
    }
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
    const currentChainId = Cookies.get("chainId")

    // return true if network id is the same
    console.log("current chain id is", currentChainId, currentChainId == targetNetworkId);
    if (currentChainId == targetNetworkId) return true;
    // return false is network id is different
    return false;
  }
};

export const switchNetwork = async () => {
  let provider = await getCurrentProvider()

  await provider.request({
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

export const getPaymentTokenBal = async (account) => {
  let network = checkNetwork();
  if (network == false) {
    await switchNetwork();
  }
  let contract = await exportInstance(PaymentToken, paymentTokenABI)
  console.log("payment token contract is---->", contract);
  let bal = await contract.balanceOf(account);

  return bal.toString() / 10 ** 18
}

export const getTokenBalance = async (account) => {
  let network = checkNetwork();
  if (network == false) {
    await switchNetwork();
  }
  let contract = await exportInstance(TokenBEP20, tokenBEPABI)
  let bal = await contract.balanceOf(account);

  return bal.toString() / 10 ** 18
}