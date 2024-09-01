import React, { useContext, useState } from "react";
import dotenv from "dotenv";
import { askAI } from "../lib/actions/gemini";
import { RegistrationContext } from "../context/registrationContext"; // Contextのインポート

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
    <>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>
            <p>
              {request}
              {userLocation ? (
                <>
                  {" "}
                  (My location is latitude {userLocation.lat} and longitude{" "}
                  {userLocation.lng})
                </>
              ) : null}
            </p>
            <p>{responses[index]}</p>
          </li>
        ))}
        <input
          value={input}
          onChange={handleChange}
          placeholder="Ask me anything..."
        ></input>
        <button onClick={handleClick}>Send</button>
      </ul>
    </>
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
