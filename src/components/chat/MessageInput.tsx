import React, { useState, useRef } from "react";
import { Box } from "@mui/material";

import { useDropzone } from "react-dropzone";
import { useChat } from "../../contexts/ChatContext";
import { MediaFile } from "../../types";
import { SkeuomorphicInput } from "../../UI/common";
import SendButton from "./SendButton";

export const MessageInput: React.FC = () => {
  const { sendMessage, currentChat } = useChat();
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
      "audio/*": [".mp3", ".wav", ".ogg", ".m4a"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },
    onDrop: (acceptedFiles) => {
      const newFiles: MediaFile[] = acceptedFiles.map((file) => ({
        file,
        type: file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("audio/")
          ? "audio"
          : "document",
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }));
      setMediaFiles((prev) => [...prev, ...newFiles]);
    },
  });

  const handleSendMessage = async () => {
    if (!message.trim() && mediaFiles.length === 0) return;
    if (!currentChat) return;

    try {
      // Send text message if exists
      if (message.trim()) {
        await sendMessage(message.trim(), "text");
        setMessage("");
      }

      // Send media files
      for (const mediaFile of mediaFiles) {
        const type =
          mediaFile.type === "image"
            ? "image"
            : mediaFile.type === "audio"
            ? "audio"
            : "document";

        // In a real app, you would upload the file to Firebase Storage first
        // For now, we'll simulate with a placeholder URL
        const mediaUrl = mediaFile.preview || "placeholder-url";

        await sendMessage(
          mediaFile.file.name,
          type,
          mediaUrl,
          mediaFile.file.name,
          mediaFile.file.size
        );
      }

      setMediaFiles([]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioFile = new File([audioBlob], "voice-message.wav", {
          type: "audio/wav",
        });

        const mediaFile: MediaFile = {
          file: audioFile,
          type: "audio",
        };

        setMediaFiles((prev) => [...prev, mediaFile]);
        setIsRecording(false);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const removeMediaFile = (index: number) => {
    setMediaFiles((prev) => {
      const newFiles = [...prev];
      const removedFile = newFiles.splice(index, 1)[0];
      if (removedFile.preview) {
        URL.revokeObjectURL(removedFile.preview);
      }
      return newFiles;
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentChat) return null;

  return (
    <Box>
      {/* Media Files Preview */}
      {/* {mediaFiles.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <MediaPreview mediaFiles={mediaFiles} onRemove={removeMediaFile} />
        </Box>
      )} */}

      {/* Input Area */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Attachment Button */}
        {/* <AttachmentButton onClick={(e) => setAnchorEl(e.currentTarget)} /> */}

        {/* Voice Recording Button */}
        {/* <VoiceRecordingButton
          isRecording={isRecording}
          onToggle={isRecording ? stopRecording : startRecording}
        /> */}

        <Box sx={{ flex: 1 }}>
          <SkeuomorphicInput
            fullWidth
            multiline
            maxRows={4}
            placeholder="Type a message..."
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "16px",
                lineHeight: "1.5",
                padding: "16px 20px",
                borderRadius: "16px",
                background: "linear-gradient(145deg, #ffffff, #f8fafc)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                boxShadow:
                  "inset 0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
                "&:focus": {
                  boxShadow:
                    "inset 0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 3px rgba(99, 102, 241, 0.1)",
                },
              },
            }}
          />
        </Box>

        <SendButton
          disabled={!message.trim() && mediaFiles.length === 0}
          onClick={handleSendMessage}
        />
      </Box>

      {/* Attachment Menu */}
      {/* <AttachmentMenu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onFileSelect={(e) => {
          getRootProps().onClick?.(
            e as unknown as React.MouseEvent<HTMLElement>
          );
          setAnchorEl(null);
        }}
        onVoiceToggle={() => {
          if (isRecording) {
            stopRecording();
          } else {
            startRecording();
          }
          setAnchorEl(null);
        }}
        isRecording={isRecording}
      /> */}

      {/* Hidden file input */}
      {/* <input {...getInputProps()} style={{ display: "none" }} /> */}
    </Box>
  );
};
