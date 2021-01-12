import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase, { auth } from "../../../firebase";
import "./chatpage.css";

const db = firebase.firestore();

function ChatPage() {
  let { user_name } = useParams();
  const [page, setpage] = useState();

  // Scroll width

  useEffect(() => {
    if (user_name) {
      setpage(<Page />);
    } else {
      setpage(<Error />);
    }
  }, []);

  return <div>{page}</div>;
}

let Page = () => {
  let { user_name } = useParams();
  let { Email } = useParams();
  let { service } = useParams();
  let { id } = useParams();

  const [userchat, setuserchat] = useState([]);
  useEffect(() => {
    var messageBody = document.querySelector("#messageBody");
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }, [Send]);

  const [userimg, setuserimg] = useState();

  function Send() {
    let Msg = document.querySelector("#your-msg").value;
    let intery = Msg.replace(/ /g, "");
    if (intery.length > 0) {
      db.collection("Sign_User")
        .doc(user_name)
        .collection("AllChat")
        .add({
          TimeNow: firebase.firestore.FieldValue.serverTimestamp(),
          UserPhoto: userimg,
          Email: Email,
          msg: Msg,
        })
        .then(() => {
          document.querySelector("#your-msg").value = null;
          //   done++;
        });
    }
  }
  //"krushnkantv1@gmail.com"
  useEffect(() => {
    db.collection("Sign_User")
      .doc(user_name)
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

    db.collection("Sign_User")
      .doc(Email)
      .get()
      .then((result) => {
        setuserimg(result.data().User_Img);
      });
  }, []);

  return (
    <>
      <div
        className="text_aria"
        id="messageBody"
        style={{ backgroundColor: "#f5eee1", padding: "20px" }}
      >
        {userchat.length > 0
          ? userchat.map((d, i) => {
              if (d.Email == Email) {
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
          placeholder="Type hear..."
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
};

let Error = () => {
  return (
    <>
      <p>Please Select Conact</p>
    </>
  );
};

export default ChatPage;
