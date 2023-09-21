import React, { useState, useRef, useEffect } from "react";
import { AskSathiChatBot } from "../../api/virtual-mentor";
import Leftbar from "../Leftbar";
import SendIcon from "@mui/icons-material/Send";
function Sathi() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: inputMessage },
    ];

    setMessages(updatedMessages);
    setInputMessage("");

    const response = await AskSathiChatBot(inputMessage);
    const updatedMessagesWithChatbot = [
      ...updatedMessages,
      { role: "chatbot", content: response.data.content },
    ];
    setMessages(updatedMessagesWithChatbot);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="base-container py-[5vh] flex flex-col justify-center items-center ">
     
      
          <h1 className="text-5xl font-merri text-theme">Sathi Chatbot</h1>
          <p className="my-5 font-comf">Welcome to sathi, your personalized chatbot. Ask any question and get the instant reply</p>
        
        <div className="flex-grow flex flex-col items-center justify-center my-10">
          <div  className="border p-4 rounded-lg shadow-lg w-[900px] h-full"  ref={messagesEndRef} >

            <div className="border p-2 h-[50vh] overflow-y-auto "  style={{ maxHeight: "400px" }} >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${ message.role === "user" ? "text-right" : "" }`}  >
                  <div
                    className={`bg-${ message.role === "user" ? "blue" : "green" }-200 p-2 rounded-lg inline-block`}>

                    {message.role === "chatbot" ? (
                      <div className="flex items-center">
                        <img
                          style={{
                            width: "40px",
                            height: "40px",
                          }}
                          src="https://www.iconarchive.com/download/i143625/iconarchive/robot-avatar/Blue-1-Robot-Avatar.1024.png"
                          alt="Chatbot Avatar"
                        />
                        <span className="ml-2">{message.content}</span>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
              <div>
              
              </div>
            </div>

            <div className="mt-4 flex ">

              <input type="text" className="flex-grow border rounded p-2 mr-2 outline-none"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyUp={handleKeyPress} />
              
                <SendIcon size={20}  style={{marginTop: "10px", color: "green", }}
                  color="green"
                  onClick={sendMessage}
                >
                  Send
                </SendIcon>
            </div>

          </div>
        </div>
      </div>
  
  );
}

export default Sathi;
