import { useEffect, useState } from "react";
import { over, Client } from "stompjs";
import SockJS from "sockjs-client";

var stompClient: Client;

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [random, setRandom] = useState<number>(0);
  const [allMessage, setAllMessage] = useState<string>("");
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [userReceive, setUserReceive] = useState("");
  const [privateMsg, setPrivateMsg] = useState("");
  const [allPrivateMsg, setAllPrivateMsg] = useState("");
  const [random1, setRandom1] = useState<number>(0);

  function connect() {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    setIsConnected(true);
    stompClient.subscribe("/chatroom/public", onReceivedMsgFromRoom);
    stompClient.subscribe(
      "/user/" + currentUser + "/private",
      onReceivedMsgFromUser
    );
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const sendToRoom = () => {
    stompClient.send(
      "/app/message",
      {},
      JSON.stringify({ senderName: currentUser, message: input })
    );
  };

  const sendToUser = () => {
    stompClient.send(
      "/app/private-message",
      {},
      JSON.stringify({
        senderName: currentUser,
        receiverName: userReceive,
        message: input,
      })
    );
  };

  const onReceivedMsgFromRoom = (payload: any) => {
    var payloadData = JSON.parse(payload.body);
    setMessage(payloadData.message);
    setRandom(Math.random());
  };

  const onReceivedMsgFromUser = (payload: any) => {
    var payloadData = JSON.parse(payload.body);
    setPrivateMsg(payloadData.message);
    setRandom1(Math.random());
  };

  useEffect(() => {
    setAllMessage(allMessage + "\n" + message);
  }, [random]);

  useEffect(() => {
    setAllPrivateMsg(allPrivateMsg + "\n" + privateMsg);
  }, [random1]);

  return (
    <div className="App">
      <input
        onChange={(e) => setCurrentUser(e.target.value)}
        placeholder="change user from"
      />
      <button onClick={connect}>{isConnected ? "Connected" : "Connect"}</button>
      <input
        onChange={(e) => {
          var a = e.target.value;
          a = a.replaceAll(",", ".");
          setInput(a);
        }}
        value={input}
        placeholder="Message..."
      />
      <button onClick={sendToRoom}>Send To Room</button>
      <input
        onChange={(e) => setUserReceive(e.target.value)}
        placeholder="change user to"
      />
      <button onClick={sendToUser}>Send To User</button>
      <div>
        <h1>This message from room</h1>
        <div style={{ whiteSpace: "pre-wrap" }}>{allMessage}</div>
      </div>

      <div>
        <h1>This message from user</h1>
        <div style={{ whiteSpace: "pre-wrap" }}>{allPrivateMsg}</div>
      </div>
    </div>
  );
}

export default App;
