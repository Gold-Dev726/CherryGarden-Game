import { useState, useEffect } from "react";
import * as React from "react";
import { useWeb3React } from "@web3-react/core";
import {
  Container,
  Box,
  Stack,
  Button,
  InputBase,
  Typography,
  Link,
  Hidden,
  IconButton,
  Chip as MuiChip,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { keyframes } from "@mui/system";
import axios from "utils/axios";
import { shuffle } from "lodash";

const blick = keyframes`
  100% {
    top: 100%;
  }
`;
const zoomFade = keyframes`
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const Items = () => {
  var array = [];
  for (let i = 1; i <= 25; i++) {
    array.push({
      id: i,
      flip: false,
      img: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
    });
  }
  return array;
};

export default function Hero() {
  const [items, setItems] = useState(Items);
  const [animItem, setAnimItem] = useState(1);
  const [flipCount, setFlipCount] = useState(0);
  const [initialized, setInitialized] = useState(true);
  const [tap_audio1] = useState(new Audio("/sounds/tap1.mp3"));
  const [tap_audio2] = useState(new Audio("/sounds/tap2.mp3"));
  const [tap_audio3] = useState(new Audio("/sounds/tap3.mp3"));
  const [btn_audio] = useState(new Audio("/sounds/button_tap.mp3"));
  const [win_audio] = useState(new Audio("/sounds/win.mp3"));
  const [lost_audio] = useState(new Audio("/sounds/lost.mp3"));

  const handleClick = (index) => {
    var temp = [...items];
    temp[index].flip = true;
    setItems(temp);
    setFlipCount(flipCount + 1);
    tap_audio1.play();
  };

  const handleClaim = () => {
    var temp = [...items];
    for (let i = 0; i < temp.length; i++) {
      temp[i].flip = true;
    }
    setItems(temp);
    setInitialized(false);
    lost_audio.play();
  };

  const handlePlayAgain = () => {
    setInitialized(true);
    setFlipCount(0);
    setItems(Items);
    initializeGame();
    btn_audio.play();
  };

  const initializeGame = async () => {
    // const rngRes = await axios.get(
    //   "https://16nj9x7h57.execute-api.us-east-1.amazonaws.com/dev/getrng"
    // );
    // const rng = rngRes.data.rng;
    // console.log(rng);
    let rng = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    let payout = 0;
    var tempItems = Items();
    console.log(tempItems);
    console.log(rng);
    switch (true) {
      case rng >= 1 && rng <= 500:
        payout = 0;
        break;
      case rng >= 501 && rng <= 978:
        payout = 1;
        tempItems[0].img = "orange";
        break;
      case rng >= 979 && rng <= 999:
        payout = 2;
        tempItems[0].img = "banana";
        break;
      case rng == 1000:
        payout = 3;
        tempItems[0].img = "cherry";
        break;
      default:
        payout = 0;
        break;
    }
    console.log(shuffle(tempItems), tempItems);
    setItems(shuffle(tempItems));
  };

  useEffect(async () => {
    // const fetch = async () => {

    //   const logicRes = await axios.get(
    //     "https://16nj9x7h57.execute-api.us-east-1.amazonaws.com/dev/getgamelogic"
    //   );
    //   const logic = logicRes.data;
    //   console.log(rng, logic);
    // };

    setInterval(() => {
      setAnimItem(Math.floor(Math.random() * (25 - 1 + 1)) + 1);
    }, 3000);

    initializeGame();
  }, [setAnimItem]);
  return (
    <Stack
      sx={{
        pt: { xs: 5, md: 10 },
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Container maxWidth="lg">
        <Stack alignItems="center">
          <Typography variant="h1">CherryGarden Game</Typography>
          <Box
            sx={{
              position: "relative",
              width: 800,
              height: 800,
              background: "url(/images/bg.png)",
            }}
          >
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="center"
              sx={{
                position: "absolute",
                left: 48,
                bottom: 120,
                width: 436,
                height: 356,
                bgcolor: "#33c126",
              }}
            >
              {items.map((item, index) => (
                <Stack
                  key={index}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ position: "relative" }}
                >
                  <Stack
                    onClick={() => handleClick(index)}
                    sx={{
                      mx: 1,
                      my: 0.4,
                      position: "relative",
                      zIndex: 1,
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "url(/images/coin.png)",
                      backgroundSize: "100% 100%",
                      cursor: "pointer",
                      transition: "all 0.5s ease",
                      overflow: "hidden",
                      visibility: item.flip ? "hidden" : "visible",
                      animation: item.flip && `${zoomFade} 0.5s linear`,
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        top: "-50%",
                        // bottom: "-50%",
                        // left: "-65%",
                        width: 1,
                        height: 15,
                        background:
                          "linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.8) 100%)",
                        animation: item.id === animItem && `${blick} 2s linear`,
                      },
                    }}
                  />
                  <Box
                    component="img"
                    src={`/images/${item.img}.png`}
                    sx={{
                      position: "absolute",
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                    }}
                  />
                </Stack>
              ))}
            </Stack>
            {!initialized && (
              <Button
                onClick={handlePlayAgain}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 20,
                  background: "url(/images/btn_bg.png)",
                  backgroundSize: "100% 100%",
                  height: 52,
                  minWidth: 160,
                  color: "black",
                  fontSize: 20,
                }}
              >
                Play again
              </Button>
            )}
            {flipCount >= 4 && (
              <Button
                onClick={handleClaim}
                sx={{
                  position: "absolute",
                  bottom: 5,
                  right: 20,
                  background: "url(/images/btn_bg.png)",
                  backgroundSize: "100% 100%",
                  height: 52,
                  minWidth: 160,
                  color: "black",
                  fontSize: 20,
                }}
              >
                Scratch All
              </Button>
            )}
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
}
