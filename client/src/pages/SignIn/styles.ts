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

export const Logo = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 30px;

  > img {
    width: 100%;
    height: 30px;
  }
`;

export const Form = styled.form`
  width: 300px;
  height: 300px;

  padding: 30px;

  border-radius: 10px;

  background-color: ${(props) => props.theme.colors.secondary};
`;

export const FormTitle = styled.h1`
  margin-bottom: 40px;
  text-align: center;
  color: ${(props) => props.theme.colors.white};
`;
