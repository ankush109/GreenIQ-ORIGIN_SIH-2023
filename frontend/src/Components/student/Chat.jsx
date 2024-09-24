import React, { useEffect, useState } from "react";
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
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { Send, VerifiedUserRounded } from "@mui/icons-material";
import { BiUserCircle } from "react-icons/bi";

const Chat = () => {
  const { data: mydetails } = GetUserQuery();
  const [onlineUsers, setOnlineUser] = useState([]);
  const { data: AllconvoData, isLoading: conversationsLoading } =
    GetAllConvoQuery();
  const { data: allusers, isLoading: usersLoading } = GetAllUsersQuery();
  const [selectedConvo, setSelectedConvo] = useState("");
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const checkOnline = (id) => {
    const finduserstatus = onlineUsers.find((x) => x == id);
    return finduserstatus;
  };
  useEffect(() => {
    if (!mydetails?.id) return;

    const socket = io("http://localhost:5000", {
      query: {
        userId: mydetails.id,
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

  if (usersLoading) {
    return <div>Loading users...</div>;
  }
  if (conversationsLoading) return "Loading conversations...";
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
          { message: message, senderId: mydetails?.id },
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

  return (
    <div className="flex h-screen">
      <div className="bg-gray-300 w-1/4 p-4 text-black">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-stone-500 hover:bg-stone-600 text-white py-2 px-4 rounded-lg w-full">
            Create Chat
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-black">
            <DropdownMenuLabel className="font-bold">
              Select User
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allusers?.map((x) => (
              <DropdownMenuItem
                key={x.id}
                onClick={() => setSelected(x)}
                className="cursor-pointer hover:bg-gray-200 px-4 py-2"
              >
                {x.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="mt-6">
          {AllconvoData?.map((convo) => (
            <div
              key={convo.id}
              className={`cursor-pointer py-2 px-3 rounded-lg mb-2 hover:bg-stone-700 ${
                selectedConvo.id === convo.id ? "bg-stone-500 text-white" : ""
              }`}
              onClick={() => setSelectedConvo(convo)}
            >
              <div className="flex items-center gap-4">
                {convo.participants[0].name}{" "}
                {checkOnline(convo.participants[0].id) ? (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                ) : (
                  ""
                )}
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
              {msg.message}
            </div>
          ))}
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
  ):(
    <div>

        Click on the user You want to Chat.
        </div>
  )}
    </div>
  );
};

export default Chat;
