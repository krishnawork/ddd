import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Service from "./service/Service";
import Program from "./program/Program";
import Test from "./test/Test";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 10,
    height: 120,
    cursor: "pointer",
  },
  box: {
    margin: "auto",
  },
  psychology: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  seassion: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  therapi: {
    background: "linear-gradient(45deg, #00bcd4, 30%, #008394 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  white: {
    color: "white",
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();
  const [page, setpage] = useState();

  //

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <div style={{ marginBottom: "20px" }}></div>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4}>
            <Paper
              className={`${classes.paper} ${classes.psychology}`}
              onClick={() => {
                setpage(<Service service="service" />);
              }}
            >
              <Typography
                variant="h5"
                className={`${classes.white}`}
                gutterBottom
              >
                SERVICES SEASSION
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              className={`${classes.paper} ${classes.seassion}`}
              onClick={() => {
                setpage(<Program program="service" />);
              }}
            >
              <Typography
                variant="h5"
                className={`${classes.white}`}
                gutterBottom
              >
                PROGRAMS SEASSION
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              className={`${classes.paper} ${classes.therapi}`}
              onClick={() => {
                setpage(<Test service="test" />);
              }}
            >
              <Typography
                variant="h5"
                className={`${classes.white}`}
                gutterBottom
              >
                TEST
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <div style={{ marginBottom: "50px" }}></div>
        {/*-----------------------------------------------------------------------------  */}
        <hr />
        {page}
        {/*  */}
      </div>
    </div>
  );
}
