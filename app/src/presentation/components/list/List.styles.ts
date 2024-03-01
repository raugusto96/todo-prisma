import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 1rem;
`;

export const Title = styled.h2`
  display: flex;
  font-size: 2rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
`;

export const ListTasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: calc(100% - 15%);
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 2.5rem;
`;

export const HeaderItem = styled.h2`
  display: flex;
  gap: 0.5rem;
  color: gray;
  font-size: 1.3rem;
`;

export const DivideLine = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: gray;
  opacity: 0.3;
`;
