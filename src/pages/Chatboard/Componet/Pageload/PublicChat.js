import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import firebase, { auth } from "../../../firebase";

const db = firebase.firestore();

function PublicChat({ email, Img, configuserChat }) {
  let history = useHistory();

  useEffect(() => {
    db.collection("web_user")
      .doc(email)
      .onSnapshot((result) => {
        if (result.data().StartChat === "stop") {
          window.location.reload();
        }
      });
  }, []);

  const [userchat, setuserchat] = useState([]);
  useEffect(() => {
    var messageBody = document.querySelector("#messageBody");
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  });

  //
  useEffect(() => {
    db.collection("Sign_User")
      .doc(email)
      .collection("AllChat")
      .orderBy("TimeNow")
      .onSnapshot((result) => {
        setuserchat([]);
        if (!result.empty) {
          result.forEach((d) => {
            setuserchat((old) => [...old, d.data()]);
          });
        } else {
          setuserchat(["please Stat Chat"]);
        }
      });
    //
  }, []);

  //
  function Send() {
    let Msg = document.querySelector("#your-msg").value;
    let intery = Msg.replace(/ /g, "");
    if (intery.length > 0) {
      db.collection("Sign_User")
        .doc(email)
        .collection("AllChat")
        .add({
          TimeNow: firebase.firestore.FieldValue.serverTimestamp(),
          UserPhoto: Img,
          Email: email,
          msg: Msg,
        })
        .then(() => {
          document.querySelector("#your-msg").value = null;
          //   done++;
        });
    }
  }

  // useEffect(() => {
  //   db.collection("web_user")
  //     .doc(email).onSnapshot(result=>{
  //       if(result){

  //       }
  //     })
  // }, [])
  return (
    <>
      <div
        className="text_aria"
        id="messageBody"
        style={{ backgroundColor: "#f5eee1", padding: "20px" }}
      >
        {userchat.length > 0
          ? userchat.map((d, i) => {
              if (d.Email == email) {
                return (
                  <div
                    key={i}
                    style={{
                      textAlign: "right",
                      width: "auto",
                    }}
                  >
                    <p
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #cfc",
                        borderRadius: "2px",
                        backgroundColor: "#cfc",
                        display: "inline-block",
                        marginRight: "10px",
                        padding: "7px",
                        textAlign: "right",
                        width: "auto",
                      }}
                    >
                      {d.msg}
                      <img
                        src={d.UserPhoto}
                        alt=""
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          verticalAlign: "middle",
                          marginLeft: "10px",
                        }}
                      />
                    </p>{" "}
                  </div>
                );
              } else {
                return (
                  <div
                    key={i}
                    style={{
                      textAlign: "left",
                      width: "auto",
                      marginLeft: "10px",
                    }}
                  >
                    <p
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid white",
                        borderRadius: "2px",
                        backgroundColor: "white",
                        display: "inline-block",
                        marginleft: "30px",
                        padding: "7px",
                        textAlign: "left",
                        width: "auto",
                      }}
                    >
                      {d.msg}
                      <img
                        src={d.UserPhoto}
                        alt=""
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          verticalAlign: "middle",
                          marginLeft: "10px",
                        }}
                      />
                    </p>{" "}
                  </div>
                );
              }
            })
          : "Loading..."}
      </div>
      <form>
        <input
          type="text"
          name="Chat_text"
          className="write_chat"
          id="your-msg"
          placeholder="Type Text..."
          autoComplete="off"
        />
        <button
          className="chat_Submit"
          value="submit"
          onClick={(e) => {
            e.preventDefault();
            Send();
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default PublicChat;
