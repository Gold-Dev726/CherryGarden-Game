import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  Container,
  Box,
  Stack,
  TextField,
  Button,
  Typography
} from "@mui/material";

import Hero from "./HomeComponents/Hero";

export default function Homepage() {
  return (
    <Box>
      <Hero />
    </Box>
  );
}
