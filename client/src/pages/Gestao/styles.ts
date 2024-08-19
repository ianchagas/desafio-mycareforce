import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.primary};

  h2 {
    margin-top: 30px;
  }
`;

export const ProfissionalList = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    color: ${(props) => props.theme.colors.primary};
    text-align: center;
    margin-bottom: 10px;
  }
`;

export const ProfissionalItem = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    padding: 10px 0;
  }
`;
