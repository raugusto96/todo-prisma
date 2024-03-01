import React from "react";
import { StatusProps } from "./protocols/status";
import { Container } from "./Status.styles";
import values from "@/config/values";
import transition from "@/config/transition";

const Status: React.FC<StatusProps> = ({ label, icon }) => {
  return (
    <Container>
      {icon &&
        React.createElement(icon, {
          color:
            label === values.task.status.pending
              ? "gray"
              : label === values.task.status.done
              ? "green"
              : "red",
        })}
      {transition.task.status[label.toLowerCase()]}
    </Container>
  );
};

export default Status;
