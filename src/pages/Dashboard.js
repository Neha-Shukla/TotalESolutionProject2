import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BigCards from "../components/BigCards";
import Table from "../components/Table";
import Cookies from "js-cookie";
import { useLocation, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import {
  checkNetwork,
  switchNetwork,
  userIncome,
  tokenSaleContract,
  checkAllowance,
  approve,
  handleBuyToken,
} from "../helpers/setterFunction";
import { MdOutlineContentCopy } from "react-icons/md";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { DEFAULT_REF } from "../helpers/constants";
import Loader from "../components/Loader";
import { getCurrentProvider, logout } from "../config";

function Dashboard() {
  const [account, setAccount] = useState();
  const [income, setIncome] = useState({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [functionCallLoad, setFunctionCallLoad] = useState(true);
  const { refAddress } = useParams();
  const [referralLink, setReferralLink] = useState(
    `${window.location.origin}/?walletAddress=`
  );

  const { search } = useLocation();

  const searchParams = new URLSearchParams(window.location.search);

  // Get the value of the 'ref' query parameter (walletAddress)
  const walletAddress = searchParams.get("ref");
  console.log("walletAddress", walletAddress);
  const [levelsCount, setLevelsCount] = useState([]);

  useEffect(() => {
    async function getContract() {
      setLoading(true);
      try {
        let acc = Cookies.get("account");
        console.log("account is---->", acc);

        if (acc) {
          setAccount(acc);
          let network = await checkNetwork();
          console.log("network chain is", network);
          if (network === false) {
            alert("Please switch newtork to BNB");
            await switchNetwork();

            //   // return;
          }
          // let allowance = await checkAllowance(acc);
          // console.log("allowance", allowance);
          // if (allowance != 0) {
          //   setIsApprove(true);
          // }
          let _income = await userIncome(acc);
          console.log("user income is", _income);
          setIncome(_income);
        }
        await tokenSaleContract();
        setLoading(false);
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
    }
    getContract();
  }, [reload, Cookies.get("account")]);

  useEffect(() => {
    const fetch = async () => {
      let _provider = await getCurrentProvider();
      let wallet = Cookies.get("connectedWallet_label");
      if (wallet === "walletConnect") {
        _provider.on("accountsChanged", (accounts) => {
          logout();
        });
      } else {
        console.log("_provider123=====>", _provider);
        window.ethereum.on("accountsChanged", (accounts) => {
          logout();
        });
      }
    };

    if (account) fetch();
  });

  // console.log("wallet Address", walletAddress)
  useEffect(() => {
    if (Cookies.get("account") && income?.data?.tokensReceived)
      setReferralLink(
        `${window.location.origin}/?walletAddress=${Cookies.get("account")}`
      );
  }, [Cookies.get("account"), income]);

  const copyToClipboard = () => {
    // navigator.clipboard.writeText(referralLink);

    var textarea = document.createElement("textarea");
    textarea.value = referralLink;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    toast.success("Copied Successfully!");
  };

  useEffect(() => {
    const getLevelsCount = async () => {
      const contract = await tokenSaleContract();
      const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const counts = await Promise.all(
        levels.map(async (level) => {
          const count = await contract.levelsCount(account, level);
          return count.toString();
        })
      );
      setLevelsCount(counts);
    };
    getLevelsCount();
  }, [account]);

  return (
    <div className="container-scroller">
      {loading ? <Loader /> : ""}
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Header />
        <div className="main-panel">
          <div className="content-wrapper">
            <BigCards
              account={account}
              referralIncome={
                income?.data?.referralIncome
                  ? ethers.utils
                      .formatEther(income?.data?.referralIncome?.toString())
                      .toString()
                  : 0
              }
              levelIncome={
                income?.data?.levelIncome
                  ? ethers.utils
                      .formatEther(income?.data?.levelIncome?.toString())
                      .toString()
                  : 0
              }
              referrer={
                income?.data?.referrer
                  ? income?.data?.referrer
                  : "0x000000000000000000000000000000000000000000"
              }
              usdtEarned={
                income?.data?.usdtEarned
                  ? ethers.utils
                      .formatEther(income?.data?.usdtEarned)
                      ?.toString()
                  : "0"
              }
            />
            <div className="row ">
              <div className="col-12 grid-margin">
                <div className="card">
                  <div className="card-body d-flex justify-content-between align-items-baseline flex-wrap">
                    <h4 className="card-title">Referral Link</h4>
                    <form
                      className="nav-link mt-2 mt-md-0 d-lg-flex search"
                      style={{ flex: 1 }}
                    >
                      <input
                        type="text"
                        className="form-control referralLink"
                        placeholder="Referral Link"
                        value={referralLink}
                        disabled
                      />
                    </form>
                    <MdOutlineContentCopy
                      onClick={copyToClipboard}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="col-12 grid-margin">
                <div className="card p-3">
                  <div className="row referrerAdd">
                    <label className="referrerLabel">Referrer Address </label>
                    <input
                      type="text"
                      className="form-control referralAddress"
                      placeholder="Referrer Address"
                      value={walletAddress}
                      disabled={true}
                    />
                  </div>

                  <div className="row btnn-group">
                    <div className=" col-sm-12 col-md-6 col-xs-12 col-lg-3 buy-btn-text">
                      <button
                        className="nav-link btn btn-success create-new-button buy-btn"
                        disabled={
                          !walletAddress ||
                          income?.data?.tokensReceived ||
                          !account
                        }
                        onClick={async () => {
                          setLoading(true);
                          await handleBuyToken(
                            account,
                            ethers.utils.isAddress(walletAddress)
                              ? walletAddress
                              : DEFAULT_REF
                          );
                          setLoading(false);
                          // window.location.reload();
                        }}
                      >
                        Buy Now
                      </button>
                      <span>
                        {income?.data?.tokensReceived
                          ? "Already Purchased!!"
                          : "Buy Token (10000)"}
                      </span>
                    </div>
                    <div className="col-12 text-center">
                      <p className="text-muted">User can Buy Only Once</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Table levelCount={levelsCount} />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
