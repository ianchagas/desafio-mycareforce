import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.colors.primary};
`;

export const Form = styled.form`
  width: 300px;
  height: 350px;

  padding: 30px;

  border-radius: 10px;

  background-color: ${(props) => props.theme.colors.secondary};
`;
