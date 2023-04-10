import React from 'react'

function Table(props) {
  return (
    <div class="row ">
    <div class="col-12 grid-margin">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Levels Count</h4>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr className='d-flex justify-content-between'>
                  <th> Level </th>
                  <th> Count </th>
                </tr>
              </thead>
              <tbody className='d-flex justify-content-between'>
              {props.levelCount.map((count, index) => (
            <tr key={index}>
              <td>Level {index + 1}</td>
              <td>{count}</td>
            </tr>
            
          ))}
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