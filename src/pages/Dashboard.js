import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BigCards from "../components/BigCards";
import Table from "../components/Table";
import Footer from "../components/Footer";
import { MdOutlineContentCopy } from "react-icons/md";

function Dashboard() {
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
                <button className="nav-link btn btn-success create-new-button approve-btn">
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
