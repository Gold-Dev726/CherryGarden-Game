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
  console.log(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
  return array;
};
export default function Hero() {
  const [items, setItems] = useState(Items);
  const handleClick = (index) => {
    var temp = [...items];
    temp[index].flip = true;
    setItems(temp);
  };
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
                bgcolor: "red",
              }}
            >
              {items.map((item, index) => (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ position: "relative" }}
                >
                  <Stack
                    key={index}
                    onClick={() => handleClick(index)}
                    sx={{
                      mx: 1,
                      my: 0.4,
                      position: "relative",
                      zIndex: 1,
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      bgcolor: "yellow",
                      cursor: "pointer",
                      transition: "all 0.5s ease",
                      overflow: "hidden",
                      visibility: item.flip ? "hidden" : "visible",
                      animation: item.flip && `${zoomFade} 0.5s linear`,
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        top: "-20%",
                        // bottom: "-50%",
                        // left: "-65%",
                        width: 1,
                        height: 20,
                        background:
                          "linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.8) 100%)",
                        // animation: `${blick} 1s linear infinite`,
                      },
                    }}
                  />
                  <Box
                    component="img"
                    src={`/images/${item.img}.png`}
                    sx={{ position: "absolute", width: 50, height: 50, borderRadius: '50%' }}
                  />
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
}
