export default {
  palette: {
    primary: {
      light: "#338cbd",
      main: "#0070AD",
      dark: "#004e79",
      contrastText: "#fff"
    },
    secondary: {
      light: "#f2596f",
      main: "#EF304C",
      dark: "#a72135",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: "center"
  },
  formItem: {
    width: "100%"
  },
  backgroundImage: {
    width: "100%", // 412px for samsung s10
    marginBottom: 50
  },
  textField: {
    width: "70%",
    marginBottom: 25
  },
  smallText: {
    margin: 45,
    display: "inline-block",
    fontSize: "0.9rem"
  },
  button: {
    marginTop: 20,
    position: "relative",
    width: "70%",
    padding: 14,
    borderRadius: 28
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20
  },
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#00bcd4"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
};
