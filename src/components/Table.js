import React from 'react'

function Table() {
  return (
    <div class="row ">
    <div class="col-12 grid-margin">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Transactions</h4>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr className='d-flex justify-content-between'>
                  <th> Transactions Hash </th>
                  <th> Details </th>
                </tr>
              </thead>
              <tbody className='d-flex justify-content-between'>
               <tr>0x3495c07a85ed18338c46537007a06f71a53ad49a467af8c33bb2878a949e7505</tr>
               <tr><div onClick={ () => window.open(`https://testnet.bscscan.com/tx/0x3495c07a85ed18338c46537007a06f71a53ad49a467af8c33bb2878a949e7505`, '_blank').focus() } className="link-icon" ><img src="assets/images/external-link.png" /></div></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Table