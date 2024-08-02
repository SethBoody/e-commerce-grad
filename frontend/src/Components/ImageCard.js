import * as React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Tooltip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const ImageMapContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
});

const Image = styled("img")`
  width: 100%;
  border-radius: 15px;
  height: 100%;
  object-fit: cover;
`;

const Point = styled("a")`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: #888 !important; /* Darker gray color */
  border: 2px solid #ccc; /* Gray border */
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */

  &:hover {
    background-color: #007bff !important; /* Dark blue color on hover */
  }
`;

const StyledTooltipContent = styled(Box)`
  padding: 10px;
  max-width: 220px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

function ImageCard({ imgPath, title, pointsData }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        onClick={handleClickOpen}
        sx={{
          cursor: "pointer",
          borderRadius: 2,
          boxShadow: 3,
          width: 400, // Set the desired width
          height: 250, // Set the desired height
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={imgPath}
          alt={title}
          sx={{ borderRadius: "16px 16px 0 0" }}
        />
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <ImageMapContainer>
            <Image src={imgPath} alt={title} />
            {pointsData?.map((point) => (
              <Tooltip
                key={point.id}
                title={
                  <StyledTooltipContent>
                    <Typography
                      variant="subtitle1"
                      component="h4"
                      sx={{ margin: 0, fontSize: "16px", color: "#333" }}
                    >
                      {point.details}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ margin: "4px 0", fontSize: "14px", color: "#555" }}
                    >
                      <strong>Price:</strong> {point.price}$
                    </Typography>
                  </StyledTooltipContent>
                }
                arrow
                placement="top"
              >
                <Point
                  style={{ top: point.top, left: point.left }}
                  href={`/detail/${point.id}`}
                />
              </Tooltip>
            ))}
          </ImageMapContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ImageCard;
