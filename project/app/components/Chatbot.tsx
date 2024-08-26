"use client";

import React, { useState } from "react";
import dotenv from "dotenv";
import { askAI } from "../lib/actions/gemini";

dotenv.config();

interface ChatbotProps {
  userLocation: { lat: number; lng: number } | null;
}

export const Chatbot: React.FC<ChatbotProps> = ({ userLocation }) => {
  const [input, setInput] = useState<string>("");
  const [requests, setRequests] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClick = async () => {
    setRequests((prevRequests) => [...prevRequests, input]);
    setInput("");

    const response = await askAI(input);

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
