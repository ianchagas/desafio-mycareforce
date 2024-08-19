import styled from "styled-components";

export const Container = styled.li`
  background-color: ${(props) => props.theme.colors.tertiary};
  list-style: none;
  border-radius: 10px;

  margin: 10px 0;
  padding: 12px 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
  }

  > div span {
    font-size: 18px;
    font-weight: 500;
    word-wrap: break-word;
  }
`;
