import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BigCards from "../components/BigCards";
import Table from "../components/Table";
import Footer from "../components/Footer";
import { MdOutlineContentCopy} from 'react-icons/md'

function Dashboard() {
  return (
    <div className="container-scroller">
      <Sidebar />
      <div class="container-fluid page-body-wrapper">
        <Header />
        <div class="main-panel">
          <div class="content-wrapper">
            <BigCards />
            <div class="row ">
              <div class="col-12 grid-margin">
                <div class="card">
                  <div class="card-body d-flex justify-content-center align-items-baseline">
                    <h4 class="card-title">Referral Link</h4>
                    <form class="nav-link mt-2 mt-md-0 d-none d-lg-flex search ">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Referral Link"
                      />
                    </form>
                    <MdOutlineContentCopy />
                  </div>
                </div>
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
