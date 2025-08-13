import React from "react";
import { Box, Grid } from "@mui/material";
import { ChatSidebar } from "./ChatSidebar";
import { ChatMessages } from "./ChatMessages";
import { MessageInput } from "./MessageInput";
import { SkeuomorphicPaper } from "../../UI/common";
import { useChat } from "../../contexts/ChatContext";
import NoRoomSelected from "./NoRoomSelected";

export const ChatLayout: React.FC = () => {
  const { currentChat } = useChat();

  if (!currentChat) {
    console.log("No current chat selected");
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        {/* Sidebar */}
        <Grid item xs={12} md={4} lg={3}>
          <SkeuomorphicPaper
            variant="inset"
            depth="high"
            sx={{
              height: "100%",
              borderRadius: "0 24px 24px 0",
              border: "none",
              background: "linear-gradient(145deg, #ffffff, #f8fafc)",
              boxShadow:
                "8px 0 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "1px",
                background:
                  "linear-gradient(180deg, transparent, rgba(148, 163, 184, 0.3), transparent)",
              },
            }}
          >
            <ChatSidebar />
          </SkeuomorphicPaper>
        </Grid>

        {/* Main Chat Area */}
        {currentChat ? (
          <Grid item xs={12} md={8} lg={9}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(145deg, #f8fafc, #f1f5f9)",
                position: "relative",
              }}
            >
              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflow: "hidden",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.2), transparent)",
                  },
                }}
              >
                <ChatMessages />
              </Box>

              {/* Input */}
              <Box
                sx={{
                  p: 3,
                  background: "linear-gradient(145deg, #ffffff, #f8fafc)",
                  borderTop: "1px solid rgba(148, 163, 184, 0.2)",
                  boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.05)",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.1), transparent)",
                  },
                }}
              >
                <MessageInput />
              </Box>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12} md={8} lg={9} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
            
          }}>
            <NoRoomSelected />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
