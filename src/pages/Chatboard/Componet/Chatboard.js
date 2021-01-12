import { set } from "date-fns/esm";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import firebase, { auth } from "../../firebase";
import Alluser from "./Pageload/Alluser";
import ChatPage from "./Pageload/ChatPage";
import PublicChat from "./Pageload/PublicChat";
import Oldchat from "./Pageload/Oldchat";

import Countdown from "react-countdown";
import UserDetails from "./UserDetails";

const db = firebase.firestore();

function Chatboard({ username, email, Img }) {
  let history = useHistory();
  let timeTo = useRef();
  let { user_name } = useParams();
  let { Email } = useParams();
  let { service } = useParams();
  let { id } = useParams();

  //
  const [mainuser, setmainuser] = useState(false);
  const [page, setpage] = useState();
  const [Conformemail, setConformemail] = useState([]);
  const [StartBtn, setStartBtn] = useState(false);
  const [StartBtnvalue, setStartBtnvalue] = useState("start");
  const [configuserChat, setconfiguserChat] = useState(null);

  //   Chat get
  useEffect(() => {
    if (user_name && Email && service && id) {
      setpage(<ChatPage permision={mainuser} />);
      setStartBtn(true);

      return () => {
        setStartBtn(false);
        setStartBtnvalue("start");
      };
    }
  }, [user_name, Email, service, id]);
  useEffect(() => {
    // get main user data
    db.collection("Main_user")
      .get()
      .then((result) => {
        if (!result.empty) {
          result.forEach((d) => {
            if (d.data().User === email) {
              setmainuser(true);
            }
          });
        }
      });
    //

    // getAlluser_data
  }, []);

  useEffect(() => {
    db.collection("Sign_User")
      .where("User_Email", "==", email)
      .get()
      .then((result) => {
        if (result.empty) {
          db.collection("Sign_User").doc(email).set({
            User_Name: username,
            User_Email: email,
            User_Img: Img,
          });
        }
      });
    //
  }, []);

  useEffect(() => {
    db.collection("web_user")
      .doc(email)
      .update({
        image_url: Img,
      })
      .then((result) => {
        if (result) {
        }
      });
  }, []);

  useEffect(() => {
    if (mainuser === false) {
      setpage(<UserDetails email={email} Img={Img} />);
    }
  }, [mainuser]);

  //
  // const [timeLeft, actions] = useCountDown(10000, 500);
  function pause() {
    timeTo.current.pause();
  }
  function start() {
    timeTo.current.start();
  }

  function startchat() {
    let seassion;
    if (StartBtnvalue === "start") {
      db.collection("web_user")
        .doc(user_name)
        .update({ StartChat: "start" })
        .then((result) => {});
      setStartBtnvalue("stop");
    } else if (StartBtnvalue === "stop") {
      setStartBtnvalue("start");
      db.collection("web_user")
        .doc(user_name)
        .update({ StartChat: "stop" })
        .then((result) => {});
      setStartBtnvalue("start");
      //
      db.collection("web_user")
        .doc(user_name)
        .collection(service)
        .doc(id)
        .get()
        .then((result) => {
          if (result.data().seassion > 1) {
            seassion = result.data().seassion;

            db.collection("web_user")
              .doc(user_name)
              .collection(service)
              .doc(id)
              .update({
                seassion: seassion - 1,
              });
            history.push("/chatboard");
          } else {
            db.collection("web_user")
              .doc(user_name)
              .collection(service)
              .doc(id)
              .delete();
            history.push("/chatboard");
          }
        });
    }
  }
  //
  useEffect(() => {
    db.collection("web_user")
      .doc(email)
      .onSnapshot((result) => {
        if (result) {
          setconfiguserChat(result.data().StartChat);
        }
      });
  }, [configuserChat]);

  let Back = () => {
    history.push("/chatboard");
  };

  //

  useEffect(() => {}, []);

  return (
    <div>
      <div className="box_chat">
        <div className="container_chat">
          <div className="header_chat">
            <ul>
              <li onClick={Back}>Hello {username}</li>
              {mainuser === true ? (
                <li
                  onClick={() =>
                    setpage(
                      <Alluser permision={mainuser} Email={email} Img={Img} />
                    )
                  }
                >
                  AllUser
                </li>
              ) : (
                ""
              )}
              {/*  */}
              {mainuser === true ? (
                <li
                  onClick={() =>
                    setpage(
                      <ChatPage permision={mainuser} email={email} Img={Img} />
                    )
                  }
                >
                  Chat
                </li>
              ) : configuserChat === "start" ? (
                <li
                  onClick={() =>
                    setpage(
                      <PublicChat
                        email={email}
                        Img={Img}
                        configuserChat={configuserChat}
                      />
                    )
                  }
                >
                  Chat
                </li>
              ) : (
                <li
                  onClick={() =>
                    setpage(
                      <Oldchat
                        email={email}
                        Img={Img}
                        configuserChat={configuserChat}
                      />
                    )
                  }
                >
                  Old Chat
                </li>
              )}

              <li>
                <Countdown
                  date={Date.now() + 9000000}
                  ref={timeTo}
                  autoStart={false}
                />
              </li>
              {mainuser === true ? (
                <>
                  <li>
                    <button
                      style={{ backgroundColor: "#005191" }}
                      onClick={pause}
                    >
                      Pause Clock
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={start}
                      style={{ backgroundColor: "#005191" }}
                    >
                      Start Clock
                    </button>{" "}
                  </li>
                </>
              ) : (
                ""
              )}
              <li
                onClick={() => {
                  auth.signOut();
                }}
              >
                Logout
              </li>
            </ul>
          </div>
          <div>
            {StartBtn === true ? (
              <button
                style={{ position: "fixed", right: "10px" }}
                onClick={startchat}
              >
                {StartBtnvalue}
              </button>
            ) : (
              ""
            )}
          </div>
          {page}
        </div>
      </div>
    </div>
  );
}

export default Chatboard;
