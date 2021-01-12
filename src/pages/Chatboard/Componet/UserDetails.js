import React, { useEffect, useState } from "react";
import "./userdetails.css";
import firebase from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
let db = firebase.firestore();

const useStyles = makeStyles({
  root: {
    width: "50%",
    margin: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function UserDetails() {
  const [page, setpage] = useState();
  const [time, settime] = useState([]);
  const classes = useStyles();

  //
  return (
    <div>
      <div className="btn_container">
        <button className="btn1" onClick={() => setpage(<Service />)}>
          service package
        </button>
      </div>
      <dir>{page}</dir>
    </div>
  );
}

let Service = () => {
  const [userseassion, setuserseassion] = useState([]);
  const [Loading, setLoading] = useState("...");
  const [Loading2, setLoading2] = useState();
  const [userProgramsData, setuserProgramsData] = useState([]);
  const classes = useStyles();
  let x = localStorage.getItem("email");
  useEffect(() => {
    db.collection("web_user")
      .doc(x)
      .collection("service")
      .get()
      .then((result) => {
        if (!result.empty) {
          result.forEach((d) => {
            setuserseassion((old) => [...old, d.data()]);
          });
        } else {
          setLoading("Service Data Not Avalabel");
        }
      });
    return () => {
      setuserseassion();
    };
  }, [setuserseassion]);
  //
  useEffect(() => {
    db.collection("web_user")
      .doc(x)
      .collection("Programs")
      .orderBy("TimeNow", "desc")
      .get()
      .then((result) => {
        if (!result.empty) {
          result.forEach((d) => {
            setuserProgramsData((old) => [...old, d]);
          });
        } else {
          setLoading2("Pograms Data Not Avalabel");
        }
      });

    return () => {
      setuserProgramsData([]);
    };
  }, []);

  return (
    <>
      {userseassion.length > 0
        ? userseassion.map((d) => {
            return (
              <p>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Time : {d.Chattime}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {d.service_name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Service Type : {d.service_type}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Amount :{d.amount}</Button>
                  </CardActions>
                </Card>
              </p>
            );
          })
        : Loading}

      {/*  */}
      {userProgramsData.length > 0
        ? userProgramsData.map((d) => {
            return (
              <>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      "Programs"
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {d.data().service_name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      seassion:{d.data().seassion}
                      <br />
                      chatTime:{d.data().Chattime}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">amount: {d.data().amount}</Button>
                  </CardActions>
                </Card>
              </>
            );
          })
        : Loading2}
    </>
  );
};
export default UserDetails;
