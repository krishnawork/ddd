import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase, { auth } from "../../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import "./alluser.css";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
const db = firebase.firestore();
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));
//
function Alluser({ permision, Email, Img }) {
  const classes = useStyles();
  //
  const [alluser, setalluser] = useState([]);
  const [Loading, setLoading] = useState("Loading");
  const [page, setpage] = useState();
  useEffect(() => {
    if (permision === true) {
      db.collection("web_user")
        .get()
        .then((result) => {
          if (!result.empty) {
            result.forEach((d) => {
              if (d.data().email === Email) {
              } else {
                setalluser((old) => [...old, d.data()]);
              }
            });
          } else {
            setLoading("User Not avelable");
          }
        });
    } else {
      alert("You are Not Admin");
    }

    return () => {
      setLoading("Loading");
    };
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={9} styel={{ overflow: "auto" }}>
          {alluser.length > 0
            ? alluser.map((d, i) => {
                return (
                  <Paper
                    key={i}
                    className={classes.paper}
                    onClick={() =>
                      setpage(
                        <UserDeatails useremail={d.email} Email={Email} />
                      )
                    }
                  >
                    {/* <Link to={`/chatboard/${d.email}/${Email}`}> */}
                    <img
                      src={d.image_url}
                      alt=""
                      className="right"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        verticalAlign: "middle",
                        display: "inline-block",
                      }}
                    />
                    <h4 style={{ display: "inline-block", marginLeft: "10px" }}>
                      {d.fname}
                    </h4>
                    {/*  */}
                    {/* </Link> */}
                  </Paper>
                );
              })
            : Loading}
        </Grid>
        <Grid sm={3}>{page}</Grid>
      </Grid>
    </div>
  );
}

let UserDeatails = ({ useremail, Email }) => {
  let history = useHistory();
  const classes = useStyles();
  //
  const [userserviceData, setuserserviceData] = useState([]);
  const [userProgramsData, setuserProgramsData] = useState([]);
  const [Loadind, setLoadind] = useState("Loading");
  useEffect(() => {
    db.collection("web_user")
      .doc(useremail)
      .collection("service")
      .get()
      .then((result) => {
        if (!result.empty) {
          result.forEach((d) => {
            setuserserviceData((old) => [...old, d]);
          });
        } else {
          setLoadind("Data Not Avalabel");
        }
      });

    return () => {
      setuserserviceData([]);
    };
  }, [useremail]);

  //
  useEffect(() => {
    db.collection("web_user")
      .doc(useremail)
      .collection("Programs")
      .get()
      .then((result) => {
        if (!result.empty) {
          result.forEach((d) => {
            setuserProgramsData((old) => [...old, d]);
          });
        } else {
          setLoadind("Data Not Avalabel");
        }
      });

    return () => {
      setuserProgramsData([]);
    };
  }, [useremail]);
  //
  let Movechat = (id) => {
    history.push(`/chatboard/${useremail}/${Email}/service/${id}`);
  };
  let Movechat2 = (id) => {
    history.push(`/chatboard/${useremail}/${Email}/Programs/${id}`);
  };
  return (
    <>
      {/* <h1>{useremail}</h1> */}

      {userserviceData.length > 0
        ? userserviceData.map((d) => {
            return (
              <>
                <Grid sm={12}>
                  <Card
                    variant="outlined"
                    onClick={() => {
                      Movechat(`${d.id}`);
                    }}
                  >
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        "service"
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
                        {d.service_type}
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
      {/*  */}

      {userProgramsData.length > 0
        ? userProgramsData.map((d) => {
            return (
              <>
                <Grid sm={12}>
                  <Card
                    className={classes.root}
                    variant="outlined"
                    onClick={() => {
                      Movechat2(`${d.id}`);
                    }}
                  >
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
                </Grid>
              </>
            );
          })
        : Loadind}
    </>
  );
};

export default Alluser;
