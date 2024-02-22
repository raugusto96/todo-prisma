import { Button } from "../button/Button";
import { CardWrapper } from "./Card.styles";
import { CardProps } from "./protocols/card";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Card: React.FC<CardProps> = ({ task, styles }) => {
  return (
    <CardWrapper style={styles}>
      {task}
      <Button
        styles={{ width: "50px" }}
        clickHandler={() => []}
        displayValue={""}
        isIconCheck={true}
        name='done-button'
        icon={FaCheck}
      />
      <Button
        clickHandler={() => []}
        styles={{ width: "50px" }}
        displayValue={""}
        name='cancel-button'
        isIconCancel={true}
        icon={FaXmark}
      />
    </CardWrapper>
  );
};

export default Card;
