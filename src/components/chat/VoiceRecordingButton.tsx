import { FC } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Mic as MicIcon, Stop as StopIcon } from "@mui/icons-material";

interface VoiceRecordingButtonProps {
  isRecording: boolean;
  onToggle: () => void;
}

const VoiceRecordingButton: FC<VoiceRecordingButtonProps> = ({
  isRecording,
  onToggle,
}) => (
  <Tooltip title={isRecording ? "Stop recording" : "Start voice recording"}>
    <IconButton
      onClick={onToggle}
      sx={{
        background: isRecording
          ? "linear-gradient(145deg, #ef4444, #dc2626)"
          : "linear-gradient(145deg, #3b82f6, #2563eb)",
        color: "white",
        width: 48,
        height: 48,
        borderRadius: "16px",
        boxShadow: isRecording
          ? "0 4px 16px rgba(239, 68, 68, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)"
          : "0 4px 16px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
        border: "none",
        transition: "all 0.2s ease",
        animation: isRecording ? "pulse 1.5s infinite" : "none",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: isRecording
            ? "0 6px 20px rgba(239, 68, 68, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.2)"
            : "0 6px 20px rgba(59, 130, 246, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
        },
        "&:active": {
          transform: "translateY(0)",
          boxShadow: isRecording
            ? "0 2px 8px rgba(239, 68, 68, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)"
            : "0 2px 8px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
        },
        "@keyframes pulse": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      }}
    >
      {isRecording ? <StopIcon /> : <MicIcon />}
    </IconButton>
  </Tooltip>
);

export default VoiceRecordingButton;
