import { SkeuomorphicPaper } from "../../UI/common";
import { Box, Typography } from "@mui/material";

const NoRoomSelected = () => {
  return (
    
      <SkeuomorphicPaper
        variant="glass"
        depth="shallow"
        padding="large"
        sx={{
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Welcome to Yii Chat! 🚀
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a chat from the sidebar to start messaging
        </Typography>
      </SkeuomorphicPaper>
    
  );
};

export default NoRoomSelected;
