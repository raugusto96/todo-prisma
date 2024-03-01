import { FooterWrapper, Title } from "./Footer.styles";
import { FaRegCopyright } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Title>
        <FaRegCopyright />
        Rodrigo Augusto 2024
      </Title>
    </FooterWrapper>
  );
};

export default Footer;
