import { FC } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { AttachFile as AttachIcon } from "@mui/icons-material";

interface AttachmentButtonProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const AttachmentButton: FC<AttachmentButtonProps> = ({ onClick }) => (
  <Tooltip title="Attach files">
    <IconButton
      onClick={onClick}
      sx={{
        background: "linear-gradient(145deg, #6366f1, #4f46e5)",
        color: "white",
        width: 48,
        height: 48,
        borderRadius: "16px",
        boxShadow:
          "0 4px 16px rgba(99, 102, 241, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
        border: "none",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            "0 6px 20px rgba(99, 102, 241, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
        },
        "&:active": {
          transform: "translateY(0)",
          boxShadow:
            "0 2px 8px rgba(99, 102, 241, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
        },
      }}
    >
      <AttachIcon />
    </IconButton>
  </Tooltip>
);

export default AttachmentButton;