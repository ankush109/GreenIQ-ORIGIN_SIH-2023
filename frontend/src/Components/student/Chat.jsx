import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  GetAllConvoQuery,
  GetAllUsersQuery,
  GetUserQuery,
  sendMessage,
} from "../../api/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../Components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { Send, VerifiedUserRounded } from "@mui/icons-material";
import { BiUserCircle } from "react-icons/bi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../Components/ui/dialog";
import { Avatar } from "@mui/material";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [wantTo, setWantto] = useState();
  const { data: mydetails } = GetUserQuery();
  const [onlineUsers, setOnlineUser] = useState([]);
  const {
    data: AllconvoData,
    isLoading: conversationsLoading,
    refetch,
  } = GetAllConvoQuery();
  const { data: allusers, isLoading: usersLoading } = GetAllUsersQuery();
  const [selectedConvo, setSelectedConvo] = useState("");
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
 const BACKEND_URL =` ${import.meta.env.VITE_BASE_URL}/`
  useEffect(() => {
    if (!mydetails?.id) return;

    const socket = io(BACKEND_URL, {
      query: {
        userId: mydetails?.id,
      },
    });

    socket.on("new_message", (mess) => {
      console.log(mess, "you got a new message");
      setSelectedConvo((prev) => ({
        ...prev,
        messages: [...(prev.messages || []), { message: mess }],
      }));
    });

    socket.on("user_connected", () => {
      console.log("socket connected..");
    });

    socket.on("getOnlineUsers", (users) => {
      setOnlineUser(users);
      console.log(users, "online users...");
    });

    socket.emit("get_online_users");

    return () => {
      socket.off("new_message");
      socket.off("user_connected");
      socket.off("getOnlineUsers");
      socket.disconnect();
    };
  }, [mydetails?.id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedConvo?.messages]);

  const sendmessageto = async () => {
    if (!message) {
      toast.error("Message cannot be empty!");
      return;
    }

    try {
      setSelectedConvo((prev) => ({
        ...prev,
        messages: [
          ...(prev.messages || []),
          { message: message, senderId: mydetails?.id, timestamp: Date.now() },
        ],
      }));
      const data = await sendMessage(
        message,
        selectedConvo.participants[0].id,
        selectedConvo.id
      );
      console.log(data, "data");
      toast.success("Chat Successful");
      setMessage("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send message");
    }
  };

  const createConveration = async () => {
    try {
      const data = await sendMessage("hi ", wantTo?.id, selectedConvo.id);
      setWantto(null);
      setOpen(false);
      refetch();
      toast.success("Chat started successfully");
    } catch (err) {
      toast.error("Failed to start conversation");
    }
  };

  const deleteConveration = async () => {};
  if (usersLoading) return <div>Loading users...</div>;
  if (conversationsLoading) return "Loading conversations...";

  return (
    <div className="flex h-screen">
      <div className="bg-gray-300 w-1/4 p-4 text-black">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-stone-500 hover:bg-stone-600 text-white py-2 px-4 rounded-lg w-full">
            Create Chat
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white ">
            <DropdownMenuLabel className="font-bold">
              Select User
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allusers?.map((x) => (
              <DropdownMenuItem
                key={x.id}
                onClick={() => {
                  setOpen(true);
                  setWantto(x);
                }}
                className="cursor-pointer hover:bg-gray-200 hover:text-white px-4 py-2"
              >
                {x.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="mt-6 h-[90%] p-2 overflow-auto">
          {AllconvoData?.map((convo) => (
            <div
              key={convo.id}
              className={`cursor-pointer py-2 px-3 bg-white rounded-lg mb-2 hover:bg-green-200  ${
                selectedConvo.id === convo.id ? "bg-lime-300" : ""
              }`}
              onClick={() => setSelectedConvo(convo)}
            >
              <div className="flex   gap-2  p-2 rounded-md">
                <div className="flex">
                  <Avatar />
                </div>
                <div className="flex flex-col">
                  {convo.participants[0].name}{" "}
                  <div>
                    {" "}
                    {convo.messages[convo.messages.length - 1].message}
                  </div>{" "}
                </div>
              </div>

              <div>
                <div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedConvo ? (
        <div className="bg-gray-100 w-3/4 flex flex-col">
          <div className="bg-stone-500 text-white p-4 flex items-center gap-2">
            <BiUserCircle className="text-2xl" />{" "}
            {selectedConvo ? ` ${selectedConvo.participants[0].name}  ` : ""}
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {selectedConvo?.messages?.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-md p-2 rounded-lg mb-2 text-white ${
                  mydetails.id === msg.senderId
                    ? "bg-blue-500 flex ml-[400px]"
                    : "bg-green-500"
                }`}
              >
                <div className="flex justify-between w-full">
                  <div>{msg.message}</div>{" "}
                  <div className="text-xs mt-6">
                    {new Date(msg?.timestamp).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white shadow-lg flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border rounded-lg p-2 mr-2 focus:outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={sendmessageto}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              <Send />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center font-semibold text-3xl w-1/2 flex h-screen justify-center items-center ml-40">
          {" "}
          Click on the User You want to Chat{" "}
        </div>
      )}

      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start a chat with {wantTo?.name}</DialogTitle>
            <DialogDescription>
              <button
                onClick={() => createConveration()}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Start Chat
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chat;
