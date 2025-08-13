import { FC } from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  Image as ImageIcon,
  Mic as MicIcon,
  Stop as StopIcon,
} from "@mui/icons-material";

interface AttachmentMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onFileSelect: () => void;
  onVoiceToggle: () => void;
  isRecording: boolean;
}

const AttachmentMenu: FC<AttachmentMenuProps> = ({
  anchorEl,
  onClose,
  onFileSelect,
  onVoiceToggle,
  isRecording,
}) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
    PaperProps={{
      sx: {
        background: "linear-gradient(145deg, #ffffff, #f8fafc)",
        border: "1px solid rgba(148, 163, 184, 0.2)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      },
    }}
  >
    <MenuItem
      onClick={onFileSelect}
      sx={{
        "&:hover": {
          background: "linear-gradient(145deg, #f1f5f9, #e2e8f0)",
        },
      }}
    >
      <ListItemIcon>
        <ImageIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Images & Files</ListItemText>
    </MenuItem>

    <MenuItem
      onClick={onVoiceToggle}
      sx={{
        "&:hover": {
          background: "linear-gradient(145deg, #f1f5f9, #e2e8f0)",
        },
      }}
    >
      <ListItemIcon>
        {isRecording ? (
          <StopIcon fontSize="small" />
        ) : (
          <MicIcon fontSize="small" />
        )}
      </ListItemIcon>
      <ListItemText>
        {isRecording ? "Stop Recording" : "Voice Message"}
      </ListItemText>
    </MenuItem>
  </Menu>
);

export default AttachmentMenu;