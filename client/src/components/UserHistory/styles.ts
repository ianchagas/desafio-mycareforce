import styled from "styled-components";

interface IUserItemProps {
  isBanned: boolean;
}

export const Container = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const UserItem = styled.li<IUserItemProps>`
  background-color: ${(props) => props.theme.colors.tertiary};
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

  > span.status {
    font-size: 14px;
    font-weight: 500;
    color: ${(props) =>
      props.isBanned ? props.theme.colors.warning : props.theme.colors.info};
  }
`;

export const BanButton = styled.button`
  background-color: ${(props) => props.theme.colors.warning};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: ${(props) => props.theme.colors.warning};
  }
`;
