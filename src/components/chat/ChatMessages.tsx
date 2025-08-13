import React, { useRef, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";
import MessageBubble from "../../UI/common/MessageBubble";
import ChatHeader from "../../UI/common/ChatHeader";
import TypingIndicator from "../../UI/common/TypingIndicator";
import SkeuomorphicPaper from "../../UI/common/SkeuomorphicPaper";

export const ChatMessages: React.FC = () => {
  const { messages, currentChat } = useChat();
  const { currentUser } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Debug logging
  console.log("ChatMessages render:", {
    messagesCount: messages.length,
    currentChat: currentChat?.id,
    currentUser: currentUser?.uid,
    messages: messages,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator for demo
  useEffect(() => {
    if (currentChat && messages.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentChat, messages.length]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {currentChat && <ChatHeader chat={currentChat} />}

      {/* Messages Container */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          background: "linear-gradient(145deg, #f8fafc, #f1f5f9)",
          position: "relative",
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "text.secondary",
            }}
          >
            <SkeuomorphicPaper
              variant="glass"
              depth="shallow"
              padding="large"
              sx={{
                textAlign: "center",
                maxWidth: 400,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                No messages yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start the conversation by sending your first message!
              </Typography>
            </SkeuomorphicPaper>
          </Box>
        ) : (
          <>
            {/* Messages */}
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwnMessage={message.senderId === currentUser?.uid}
                showSenderInfo={
                  currentChat?.isGroup && message.senderId !== currentUser?.uid
                }
              />
            ))}

            {/* Typing Indicator */}
            <TypingIndicator
              isTyping={isTyping}
              userName={
                currentChat?.isGroup ? "Someone" : currentChat?.name ?? ""
              }
            />
          </>
        )}
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};
