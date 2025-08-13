import { IconButton, Tooltip } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

const SendButton: React.FC<{
  disabled: boolean;
  onClick: () => void;
}> = ({ disabled, onClick }) => (
  <Tooltip title="Send message">
    <IconButton
      onClick={onClick}
      disabled={disabled}
      sx={{
        background: disabled
          ? "linear-gradient(145deg, #cbd5e1, #94a3b8)"
          : "linear-gradient(145deg, #10b981, #059669)",
        color: "white",
        width: 48,
        height: 48,
        borderRadius: "16px",
        boxShadow: disabled
          ? "0 2px 8px rgba(203, 213, 225, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.1)"
          : "0 4px 16px rgba(16, 185, 129, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
        border: "none",
        transition: "all 0.2s ease",
        "&:hover:not(:disabled)": {
          transform: "translateY(-2px)",
          boxShadow:
            "0 6px 20px rgba(16, 185, 129, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
        },
        "&:active:not(:disabled)": {
          transform: "translateY(0)",
          boxShadow:
            "0 2px 8px rgba(16, 185, 129, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
        },
      }}
    >
      <SendIcon />
    </IconButton>
  </Tooltip>
);

export default SendButton;
