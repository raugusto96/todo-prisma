import styled from "styled-components";

interface ButtonWrapperProps {
  isIconCheck: boolean;
  isIconCancel: boolean;
}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  font-size: 1.2rem;
  font-weight: 700;
  background-color: ${(props) =>
    props.isIconCheck
      ? "rgba(25, 125, 36, 0.8)"
      : props.isIconCancel
      ? "rgba(146, 4, 4, 0.8)"
      : "rgba(9, 9, 9, 0.8)"};
  color: rgba(230, 230, 230, 0.8);
  border-style: none;
  width: calc(100vw - 100%);
  border-radius: 5px;
  padding: 0.8rem;

  &:hover {
    cursor: pointer;
  }
`;
