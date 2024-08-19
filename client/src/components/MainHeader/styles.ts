import styled from "styled-components";

export const Container = styled.div`
  grid-area: MH;

  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

export const Profile = styled.div`
  color: ${(props) => props.theme.colors.white};
  margin-left: 30px;
`;

export const Welcome = styled.h3`
  font-size: 25px;
`;

export const LogoutButton = styled.button`
  margin-right: 30px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.info};
  border: none;
  background: none;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 30px;
  }
`;
