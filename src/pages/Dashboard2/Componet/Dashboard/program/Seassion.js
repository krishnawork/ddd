import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import firebase from "../../../../firebase";
let db = firebase.firestore();
const useStyles = makeStyles((theme) => ({
  root: {
    // Width: 275,
    // height:
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
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 10,
    height: 50,
    cursor: "pointer",
  },
  psychology: {
    background: "linear-gradient(45deg, #8bc34a 30%, #a2cf6e 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  seassion: {
    background: "linear-gradient(45deg, #cddc39  30%, #d7e360 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  therapi: {
    background: "linear-gradient(45deg, #ff5722, 30%, #ff784e 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  white: {
    color: "white",
  },
}));

function Seassion({ Program }) {
  const [Loadind, setLoadind] = useState("Loading");
  const [servicedata, setservicedata] = useState([]);
  const classes = useStyles();
  //
  useEffect(() => {
    let x = localStorage.getItem("email");
    if (Program) {
      setservicedata([]);
      db.collection("web_user")
        .doc(x)
        .collection(`${Program}`)
        .get()
        .then((result) => {
          if (!result.empty) {
            result.forEach((d) => {
              setservicedata((old) => [...old, d.data()]);
              console.log("sdsdsdsdsd", d.data());
            });
          } else {
            setLoadind("Data Not Avalabel");
          }
        });
    }
    return () => {
      setLoadind("Loading");
    };
  }, [Program]);

  //
  return (
    <div>
      {/* <h1>Hari</h1> */}
      <Grid container spacing={3}>
        {servicedata.length > 0
          ? servicedata.map((d) => {
              return (
                <>
                  <Grid item xs={6} sm={3}>
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
                          {d.service_name}
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          seassion:{d.seassion}
                          <br />
                          chatTime:{d.Chattime}
                        </Typography>
                        <Typography variant="body2" component="p">
                          <br />
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">amount: {d.amount}</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </>
              );
            })
          : Loadind}
      </Grid>
    </div>
  );
}

export default Seassion;
