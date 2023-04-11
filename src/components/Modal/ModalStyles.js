import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  // Prevent page scrolling when modal is open
  "@global": {
    body: {
      overflow: "hidden",
    },
  },

  // Modal wrapper
  modalOverlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    padding: "1rem",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: "9999",
    opacity: 1,
    animation: "$show .5s ease",
    overflowX: "hidden",
    overflowY: "auto",
  },

  // Fade in open animation
  "@keyframes show": {
    "0%": {
      display: "none",
      opacity: 0,
    },
    "1%": {
      display: "flex",
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },

  // Modal itself
  modal: {
    width: "100%",
    backgroundColor: "#191c24",
    boxShadow: [0, 0, "0.625rem", "rgba(0, 0, 0, 0.2)"],
    position: "relative",
    padding: "2rem",
    color: "#fff",
    "@media (min-width: 576px)": {
      width: "32rem",
    },
    borderRadius: "20px",
    "& p:last-of-type": {
      marginBottom: 0,
    },
  },

  imgContainer: {
    height: "93px",
    width: "93px",
    borderRadius: "10px",
  },

  walletIcon: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
    cursor: "pointer",
  },

  walletHeading: {
    fontFamily: "serif",
    fontSize: "initial",
    paddingBottom: "20px",
  },

  walletMainHeading: {
    textAlign: "center",
    paddingBottom: "11px",
    fontSize: "36px",
    fontWeight: 500,
  },
});

export default useStyles;
