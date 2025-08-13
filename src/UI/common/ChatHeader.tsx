import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import {
  MoreVert as MoreIcon,
  Search as SearchIcon,
  Phone as PhoneIcon,
  VideoCall as VideoIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import SkeuomorphicAvatar from "./SkeuomorphicAvatar";
import SkeuomorphicChip from "./SkeuomorphicChip";
import { ChatRoom } from "../../types";

interface ChatHeaderProps {
  chat: ChatRoom;
  onSearch?: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  onInfo?: () => void;
  onMore?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  chat,
  onSearch,
  onCall,
  onVideoCall,
  onInfo,
  onMore,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Chat Avatar */}
      <SkeuomorphicAvatar
        src={chat.groupAvatar}
        alt={chat.name}
        size="medium"
        sx={{
          m: "20px",
        }}
      />

      {/* Chat Info */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          {chat.name || "Chat"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {chat.isGroup ? "Group Chat" : "Direct Message"}
        </Typography>
      </Box>

      {/* Chat Stats */}
      {chat.isGroup && (
        <SkeuomorphicChip
          label={`${chat.participants.length} members`}
          size="small"
          variant="secondary"
        />
      )}

      {/* Action Buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {onSearch && (
          <Tooltip title="Search messages">
            <IconButton
              onClick={onSearch}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
        )}

        {onCall && (
          <Tooltip title="Voice call">
            <IconButton
              onClick={onCall}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <PhoneIcon />
            </IconButton>
          </Tooltip>
        )}

        {onVideoCall && (
          <Tooltip title="Video call">
            <IconButton
              onClick={onVideoCall}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <VideoIcon />
            </IconButton>
          </Tooltip>
        )}

        {onInfo && (
          <Tooltip title="Chat info">
            <IconButton
              onClick={onInfo}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        )}

        {onMore && (
          <Tooltip title="More options">
            <IconButton
              onClick={onMore}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <MoreIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default ChatHeader;
