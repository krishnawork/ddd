import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

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
  popup: {
    display: "none",
    position: "relative",
    position: "fixed",
    paddingTop: "100px",
    left: "25%",
    top: "15%",
    zIndex: 100000,
    width: "60%",
    height: "50%",
    overflow: "auto",
    backgroundColor: "rgb(0, 0, 0)",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: "0px 30px 80px 30px",
  },
  popupclose: {
    position: "fixed",
    top: 170,
    zIndex: 10000,
  },
}));

export default function FullWidthGrid() {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [page, setpage] = useState();
  const classes = useStyles();
  //
  let psychology = () => {
    setOpen(true);
  };
  let meme = document.getElementById("myModal");
  useEffect(() => {
    if (open === true) {
      meme.style.display = "block";
    }
  }, [setOpen]);

  //

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Typography variant="button" gutterBottom>
          Analitics
        </Typography>
        <div style={{ marginBottom: "20px" }}></div>
        <Grid container spacing={3}>
          {/* <Grid item xs={6} sm={4}>
            <Paper
              className={`${classes.paper} ${classes.psychology}`}
              onClick={() => setOpen(true)}
            >
              <Typography
                variant="h5"
                className={`${classes.white}`}
                gutterBottom
              >
                PSYCHOLOGY
              </Typography>
            </Paper>
          </Grid> */}
          <Grid item xs={6} sm={4}>
            <Paper
              className={`${classes.paper} ${classes.seassion}`}
              onClick={() => history.push(`/services`)}
            >
              <Typography
                variant="h5"
                className={`${classes.white}`}
                gutterBottom
              >
                BOOK YOUR NEXT SEASSION
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper className={`${classes.paper} ${classes.therapi}`}>
              <Typography
                variant="h5"
                className={`${classes.white}`}
                gutterBottom
              >
                THERAPY JOURNEY
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        {/*-----------------------------------------------------------------------------  */}
        <div id="myModal" className={classes.popup}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.popupclose}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Card>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Summer BBQ"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        to Scott, Alex, Jennifer
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Sandra Adams
                      </Typography>
                      {" — Do you have Paris recommendations? Have you ever…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {/*  */}
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Sandra Adams
                      </Typography>
                      {" — Do you have Paris recommendations? Have you ever…"}
                    </React.Fragment>
                  }
                />
                {/* */}
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Sandra Adams
                      </Typography>
                      {" — Do you have Paris recommendations? Have you ever…"}
                    </React.Fragment>
                  }
                />
                {/* */}
              </ListItem>
            </List>
          </Card>
        </div>

        {/* <div classNam={classes.modal}>1</div> */}
        {/*  */}
      </div>
    </div>
  );
}
