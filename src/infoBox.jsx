import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiDayHaze,
  WiNightFog,
  WiFog,
  WiDaySnow,
  WiRain,
  WiNightAltRain,
  WiThunderstorm,
  WiNightAltThunderstorm,
  WiSnow,
  WiNightAltSnow,
  WiHot,
  WiSnowWind,
  WiDaySnowThunderstorm,
  WiNightAltSnowThunderstorm,
  WiHumidity,
  WiStrongWind, 
} from "react-icons/wi";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function InfoBox({ Info, isDay }) {
  if (!Info) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2 style={{ color: "red" }}>Weather information is not available!</h2>
      </div>
    );
  }

  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [disliked, setDisliked] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const getWeatherIcon = (description, temp, isDay) => {
    const desc = description.toLowerCase();

    if (desc.includes("rain")) {
      if (temp < 15) {
        return isDay ? (
          <WiDaySnowThunderstorm size={100} color="blue" />
        ) : (
          <WiNightAltSnowThunderstorm size={100} color="darkblue" />
        );
      } else if (temp >= 15 && temp < 30) {
        return isDay ? (
          <WiRain size={100} color="blue" />
        ) : (
          <WiNightAltRain size={100} color="darkblue" />
        );
      } else {
        return isDay ? (
          <WiRain size={100} color="blue" />
        ) : (
          <WiNightAltRain size={100} color="darkblue" />
        );
      }
    } else if (desc.includes("cloud")) {
      if (desc.includes("few")) {
        return isDay ? (
          <WiDayCloudy size={100} color="grey" />
        ) : (
          <WiNightAltCloudy size={100} color="darkgrey" />
        );
      } else if (desc.includes("overcast") || desc.includes("broken")) {
        return isDay ? (
          <WiCloudy size={100} color="grey" />
        ) : (
          <WiCloudy size={100} color="darkgrey" />
        );
      }
    } else if (desc.includes("clear sky")) {
      return isDay ? (
        <WiDaySunny size={100} color="yellow" />
      ) : (
        <WiNightClear size={100} color="grey" />
      );
    } else if (desc.includes("snow")) {
      if (temp < 0) {
        return isDay ? (
          <WiSnow size={100} color="lightblue" />
        ) : (
          <WiNightAltSnow size={100} color="darkblue" />
        );
      } else {
        return isDay ? (
          <WiDaySnow size={100} color="blue" />
        ) : (
          <WiNightAltSnow size={100} color="darkblue" />
        );
      }
    } else if (desc.includes("thunderstorm")) {
      return isDay ? (
        <WiThunderstorm size={100} color="darkblue" />
      ) : (
        <WiNightAltThunderstorm size={100} color="black" />
      );
    } else if (desc.includes("mist") || desc.includes("fog")) {
      return isDay ? (
        <WiDayHaze size={100} color="lightgrey" />
      ) : (
        <WiNightFog size={100} color="darkgrey" />
      );
    } else if (desc.includes("drizzle")) {
      return isDay ? (
        <WiRain size={100} color="blue" />
      ) : (
        <WiNightAltRain size={100} color="darkblue" />
      );
    } else if (desc.includes("haze")) {
      return isDay ? (
        <WiDayHaze size={100} color="orange" />
      ) : (
        <WiNightFog size={100} color="darkgrey" />
      );
    } else if (desc.includes("hot")) {
      return <WiHot size={100} color="red" />;
    } else if (desc.includes("wind")) {
      return <WiSnowWind size={100} color="grey" />;
    } else {
      return isDay ? (
        <WiDaySunny size={100} color="yellow" />
      ) : (
        <WiNightClear size={100} color="grey" />
      );
    }
  };

  return (
    <div className="infobox">
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: "0px 4px 20px rgba(0, 0, 255, 0.8)",
          borderRadius: "10px",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" component="div">
              Weather Info - {Info.city}, {Info.country}
            </Typography>
          }
          subheader={Info.description}
        />
        <CardContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {getWeatherIcon(Info.description, Info.temp, isDay)}
          </div>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            {Info.temp}°C
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="like"
            onClick={handleLike}
            sx={{
              color: liked ? "blue" : "inherit",
            }}
          >
            <ThumbUpIcon />
          </IconButton>
          <IconButton
            aria-label="dislike"
            onClick={handleDislike}
            sx={{
              color: disliked ? "blue" : "inherit",
            }}
          >
            <ThumbDownIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              <b>Max Temperature:</b> {Info.temp_max}°C
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              <b>Min Temperature:</b> {Info.temp_min}°C
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              <b>Feels Like:</b> {Info.feels_like}°C
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              <WiHumidity size={24} color="blue" /> <b>Humidity:</b>{" "}
              {Info.humidity}%
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              <WiStrongWind size={24} color="gray" /> <b>Wind Speed:</b>{" "}
              {Info.wind_speed} km/h
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
