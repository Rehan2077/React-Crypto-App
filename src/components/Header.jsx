import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import ColorModeSwitcher from "../ColorModeSwitcher";

const Header = () => {
  return (
    <HStack
      p={"4"}
      shadow={"base"}
      zIndex={"overlay"}
      pos={"sticky"}
      top={"0"}
      bgColor={"blackAlpha.900"}
    >
      <Button ml={"2"} variant={"unstyled"} color={"white"}>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#90909b",
            textDecoration: isActive ? "underline" : "none",
          })}
          to={"/"}
        >
          Home
        </NavLink>
      </Button>
      <Button ml={"2"} variant={"unstyled"} color={"white"}>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#90909b",
            textDecoration: isActive ? "underline" : "none",
          })}
          to={"/coins"}
        >
          Coins
        </NavLink>
      </Button>
      <Button ml={"2"} variant={"unstyled"} color={"white"}>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#90909b",
            textDecoration: isActive ? "underline" : "none",
          })}
          to={"/exchanges"}
        >
          Exchanges
        </NavLink>
      </Button>
      <ColorModeSwitcher />
    </HStack>
  );
};

export default Header;
