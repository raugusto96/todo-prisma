import React from "react";
import { HeaderWrapper, Title } from "./Header.styles";
import { FaTasks } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Title>
        <FaTasks />
        ToDo Prisma
      </Title>
    </HeaderWrapper>
  );
};

export default Header;
