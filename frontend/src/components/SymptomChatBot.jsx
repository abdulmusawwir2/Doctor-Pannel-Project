// src/components/SymptomChatBot.jsx
import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import axios from "axios";

const SymptomChatBot = () => {
    useEffect(() => {
        addResponseMessage("👋 Hello! Describe your symptoms and I'll suggest a doctor.");
    }, []);

    const handleNewUserMessage = async (message) => {
        try {
            const res = await axios.post("http://localhost:5000/analyze", {
                symptoms: message
            });
            addResponseMessage(res.data.result);
        } catch (error) {
            addResponseMessage("❌ Sorry, something went wrong.");
        }
    };

    return (
        <Widget
            handleNewUserMessage={handleNewUserMessage}
            title="AI Symptom Assistant"
            subtitle="Tell your symptoms. Get suggestions."
        />
    );
};

export default SymptomChatBot;
