import styled from "styled-components";

export const Container = styled.div`
  grid-area: AS;
  background-color: ${(props) => props.theme.colors.secondary};

  padding-left: 20px;

  border-right: 1px solid ${(props) => props.theme.colors.gray};

  position: relative;
`;

export const Header = styled.header`
  display: grid;
  align-items: center;

  height: 100px;

  @media (max-width: 600px) {
    margin-left: 15px;
  }
`;

export const LogoImg = styled.img`
  height: 40px;
  margin-bottom: 20px;
  width: 200px;
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15%;
`;

export const MenuItemLink = styled.a`
  color: ${(props) => props.theme.colors.info};
  text-decoration: none;
  display: flex;
  align-items: center;

  margin: 15px 0;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 30px;
    margin-right: 8px;
  }
`;

export const MenuItemButton = styled.button`
  font-size: 16px;
  color: ${(props) => props.theme.colors.info};
  border: none;
  background: none;
  display: flex;
  align-items: center;

  margin: 15px 0;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 30px;
    margin-right: 8px;
  }
`;
