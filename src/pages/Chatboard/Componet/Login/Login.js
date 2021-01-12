import React, { useState, useEffect } from "react";
import firebase, { auth, provider } from "../../../firebase";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Pageload from "../Chatboard";
import Button from "@material-ui/core/Button";
import "./login.css";
let db = firebase.firestore();

//
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#005191",
  },
  btn: {
    marginRight: theme.spacing(2),
  },
}));
//

function Login() {
  const classes = useStyles();
  let history = useHistory();
  const [pageload, setpageload] = useState(null);
  const [useremail, setuseremail] = useState(null);

  let x = localStorage.getItem("email", "email");
  useEffect(() => {
    if (x) {
      db.collection("web_user")
        .where("email", "==", x)
        .limit(1)
        .get()
        .then((result) => {
          if (result) {
            result.forEach((d) => {
              setuseremail(d.data().email);
              console.log(d.data().email);
              console.log(x);
            });
          }
        });
    } else {
      alert("Please Login account");
      history.push("/");
    }
  }, [x, history]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("user", user);
      if (user) {
        if (user.email === x) {
          console.log(user.email);
          console.log(x);
          setpageload(
            <Pageload
              username={user.displayName}
              email={user.email}
              Img={user.photoURL}
            />
          );
        } else {
          setpageload(
            <LoginPage
              action={setpageload}
              message="Please login Veryfiy Account"
            />
          );
        }
      } else {
        setpageload(<LoginPage action={setpageload} />);
      }
    });
  }, [x]);
  return (
    <div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          minHeight: "100vh",
          backgroundSize: "cover",
          zIndex: 100000,
          backgroundColor: "White",
        }}
      >
        <div className={classes.root}>
          <AppBar position="static" className={classes.header}>
            <Toolbar variant="dense">
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={() => {
                  history.push(`/`);
                }}
              >
                Home
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={() => {
                  history.push(`/profile`);
                }}
              >
                my profile
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={() => {
                  history.push(`/dashboard`);
                }}
              >
                Dashboard
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        {pageload}
      </div>
    </div>
  );
}

let LoginPage = ({ action, message }) => {
  if (message) {
    alert(message);
  }
  function Googlelogin() {
    auth.signInWithPopup(provider).then((result) => {
      if (result.user.email === localStorage.getItem("email")) {
        action(
          <Pageload
            username={result.user.displayName}
            email={result.user.email}
            Img={result.user.photoURL}
          />
        );
      } else {
        auth.signOut();
        alert("Please login Veryfiy Account");
      }
    });
  }
  return (
    <>
      <div className="box_chat">
        <div className="container_chat">
          <div className="header_chat">
            <ul>
              <li style={{ cursor: "auto" }}>ChatBox</li>
            </ul>
          </div>
          <button className="Google_btn" onClick={Googlelogin}>
            Conform Your EmailID
          </button>
        </div>
      </div>
    </>
  );
};
export default Login;
