import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box href="/">
      <Link to="/">
        <img src="/images/logo.png" alt="Shoeuzi Logo" />
      </Link>
    </Box>
  );
};

export default Logo;
