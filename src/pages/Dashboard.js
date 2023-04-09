import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BigCards from "../components/BigCards";
import Table from "../components/Table";
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import Footer from "../components/Footer";
import { checkNetwork,switchNetwork,userIncome,tokenSaleContract,checkAllowance,approve } from '../helpers/setterFunction';
import { MdOutlineContentCopy } from "react-icons/md";

function Dashboard() {

  const [account, setAccount] = useState();
  const [income, setIncome] = useState({})
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const [isApprove,setIsApprove]=useState(false)
  const [functionCallLoad, setFunctionCallLoad] = useState(true)
  const { refAddress } = useParams()
  console.log("refAddress", refAddress)



  useEffect(() => {
    async function getContract() {
      setLoading(true)
      try {
        let acc = Cookies.get("account")
        console.log("account is---->",acc);
        
        if (acc) {
          setAccount(acc);
          // let network = await checkNetwork();
          // console.log("network chain is", network);
          // if (network === false) {
          //   alert("Please switch newtork to BNB");
          //   await switchNetwork();

          //   // return;
          // }
          let allowance=await checkAllowance(acc);
          console.log("allowance",allowance)
          if(allowance!=0){
          
          setIsApprove(true);
          }
          let _income = await userIncome(acc);
          console.log("user income is", _income);
          setIncome(_income)
        }
        await tokenSaleContract();
        setLoading(false)
      }
      catch (err) {
        console.log("err", err)
        setLoading(false)
      }

    }
    getContract();
  }, [reload, Cookies.get("account")])

  const handleBuyToken=async()=>{

  }

  return (
    <div className="container-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Header />
        <div className="main-panel">
          <div className="content-wrapper">
            <BigCards />
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
                        className="form-control"
                        placeholder="Referral Link"
                      />
                    </form>
                    <MdOutlineContentCopy />
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="row btnn-group">
              <div className=" col-sm-12 col-md-6 col-xs-12 col-lg-3">
             <button disabled={isApprove} className="nav-link btn btn-success create-new-button approve-btn" onClick={async()=>{
                     await approve();
              }}>
                  Approve
                </button>
               
              </div>
              <div className=" col-sm-12 col-md-6 col-xs-12 col-lg-3">
                <button className="nav-link btn btn-success create-new-button buy-btn">
                  Buy
                </button>
              </div>
              <div className="col-12 text-center">
              <p className="text-muted">User can Buy Ony Once</p>
              </div>
            </div>
            <Table />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
