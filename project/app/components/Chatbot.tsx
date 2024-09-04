import React, { useContext, useState } from "react";
import dotenv from "dotenv";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  UserCircleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { askAI } from "../lib/actions/gemini";
import { RegistrationContext } from "../context/registrationContext";

dotenv.config();

type UserLocation = {
  lat: number;
  lng: number;
};

type ChatbotProps = {
  userLocation: UserLocation | null;
};

export const Chatbot: React.FC<ChatbotProps> = ({ userLocation }) => {
  const [input, setInput] = useState<string>("");
  const [requests, setRequests] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [baseDateTime, setBaseDateTime] = useState<Date>(
    new Date("2000-01-01T00:00:00.000Z")
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setIsRegistered } = useContext(RegistrationContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClick = async () => {
    setRequests((prevRequests) => [...prevRequests, input]);
    setInput("");

    const response = await askAI(input);
    const now = new Date();
    const timeDifference = now.getTime() - baseDateTime.getTime();

    if (timeDifference >= 5 * 60 * 1000) {
      if (!userLocation) {
        console.error("User location is not available");
        return;
      }
      setBaseDateTime(now);
      registerUserLocation(userLocation);
      setIsRegistered(true);
    }

    setTimeout(() => {
      setResponses((prevResponses) => [...prevResponses, response]);
    }, 500);
  };

  return (
    <div className="fixed bottom-1 right-4 z-100">
      {isOpen ? (
        <>
          <div className="absolute bottom-8 right-0 bg-gray-100 shadow-lg h-96 w-72 rounded-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-blue-400 text-white p-1 shadow-lg rounded-t-lg flex items-center justify-center space-x-2 w-full"
            >
              <LightBulbIcon className="h-4 w-4" />
              <span className="whitespace-nowrap">
                Ask Me If You Are Interested!
              </span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            <div className="flex flex-col h-full">
              <div className="flex-1 p-4 overflow-y-auto bg-blue-100 rounded-t-lg">
                <ul className="space-y-4">
                  {requests.map((request, index) => (
                    <li key={index} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-1">
                        <UserCircleIcon className="h-6 w-6" />
                        <span>User</span>
                      </div>
                      <div className="bg-blue-500 text-white p-2 rounded-lg self-start max-w-xs">
                        {request}
                      </div>
                      <div className="flex items-center space-x-1 self-end">
                        <LightBulbIcon className="h-6 w-6" />
                        <span>Chatbot</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg self-end max-w-xs">
                        {responses}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-blue-200 border-t border-white rounded-b-lg">
                <div className="flex space-x-2">
                  <input
                    value={input}
                    onChange={handleChange}
                    placeholder="Ask me anything..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleClick}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-400 text-white p-1 shadow-lg flex items-center justify-center space-x-2 w-72 rounded-lg"
        >
          <LightBulbIcon className="h-4 w-4" />
          <span className="whitespace-nowrap">
            Ask Me If You Are Interested!
          </span>
          <ChevronUpIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

const registerUserLocation = async (userLocation: UserLocation) => {
  try {
    const response = await fetch("/api/user-locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLocation),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to register user location:", error);
  }
};
