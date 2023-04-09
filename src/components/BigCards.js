import React from 'react'

function BigCards() {
  return (
    <div class="row">
    <div class="col-sm-4 grid-margin">
      <div class="card">
        <div class="card-body">
          <h5>Level Income</h5>
          <div class="row">
            <div class="col-8 col-sm-12 col-xl-8 my-auto">
              <div class="d-flex d-sm-block d-md-flex align-items-center">
                <h2 class="mb-0">$0</h2>
              </div>
            </div>
            <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right imgCont">
              {/* <i class="icon-lg mdi mdi-codepen text-primary ml-auto"></i> */}
              <img src='assets/images/growth.png' />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-4 grid-margin">
      <div class="card">
        <div class="card-body">
          <h5>Referral Income</h5>
          <div class="row">
            <div class="col-8 col-sm-12 col-xl-8 my-auto">
              <div class="d-flex d-sm-block d-md-flex align-items-center">
                <h2 class="mb-0">$0</h2>
              </div>
            </div>
            <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right imgCont">
              {/* <i class="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i> */}
              <img src='assets/images/income.png' />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-4 grid-margin">
      <div class="card">
        <div class="card-body">
          <h5>Referrer</h5>
          <div class="row">
            <div class="col-8 col-sm-12 col-xl-8 my-auto">
              <div class="d-flex d-sm-block d-md-flex align-items-center">
                <h2 class="mb-0">$0</h2>
              </div>
            </div>
            <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right imgCont">
              {/* <i class="icon-lg mdi mdi-monitor text-success ml-auto"></i> */}
              <img src='assets/images/referral.png' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default BigCards