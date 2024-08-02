import { Box } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import Button from "@mui/material/Button";
import { useContext } from "react";
import SlidesContext from "../Shared/Context/SlidesContext";
import { Link } from "react-router-dom";

const SlidesGenerator = () => {
  const slidesInfo = useContext(SlidesContext);

  const slides = slidesInfo.map(
    ({
      clickHandler,
      mainDivClass,
      imgPath,
      title,
      subTitle,
      backgroundColor,
      linkTo,
    }) => (
      <Box
        sx={{ flexGrow: 1, height: 400, margin: 3, position: "relative" }}
        key={title}
      >
        <Link to={linkTo}>
          <Box sx={{ flexGrow: 1 }} className="container">
            <div className={mainDivClass}>
              <h2>{title}</h2>
              <h3>
                <span>{subTitle}</span>
              </h3>
              <Button
                onClick={clickHandler}
                variant="contained"
                startIcon={<EastIcon />}
                sx={{ backgroundColor, textTransform: "none" }}
              >
                See more
              </Button>
            </div>
            <img src={imgPath} alt={title} />
          </Box>
        </Link>
      </Box>
    )
  );

  return slides;
};

export default SlidesGenerator;
