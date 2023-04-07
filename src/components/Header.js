import React, { useState } from 'react'
import Modal from './Modal/Modal'

function Header() {
  const [showModal, setShowModal] = useState(false);


  return (
    <nav class="navbar p-0 fixed-top d-flex flex-row">
      {showModal && <Modal/>}
    <div class="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
      <a class="navbar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a>
    </div>
    <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
      <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
        <span class="mdi mdi-menu"></span>
      </button>
      
      <ul class="navbar-nav navbar-nav-right">
        <li class="nav-item dropdown d-none d-lg-block">
          <button class="nav-link btn btn-success create-new-button" onClick={() => setShowModal(true)}>Connect Wallet</button>
        </li>
      </ul>
      <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
        <span class="mdi mdi-format-line-spacing"></span>
      </button>
    </div>
  </nav>
   
  )
}

export default Header