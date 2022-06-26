import { FaBars } from 'react-icons/fa';
import { NavLink as LK } from 'react-router-dom';
import styled from 'styled-components';

export const CustomNav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1400px) / 2);
  z-index: 10;
`;

export const CustomNavHome = styled(LK)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #2D4263;
  }
`;

export const CustomNavLink = styled(LK)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #2D4263;
  }
`;

export const CustomNavBar = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 700px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const CustomMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const CustomMenuBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const CustomBtnLink = styled(LK)`
  border-radius: 4px;
  background: #2D4263;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    background: #fff;
    color: #2D4263;
  }
`;

export const CustomFootCon = styled.div`
  
  ${'' /* position: absolute; */}
  ${'' /* bottom:0;
  width: 100%;
  height: 2.5rem; */}
  padding: 10px 30px;
  background: #2D4263;
  @media (max-width: 700px) {
    padding: 30px 30px;
  }
`;

export const CustomFootLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;
  &:hover {
      color: #ff9c00;
      transition: 200ms ease-in;
  }
`;

export const CustomText = styled.p`
  font-size: 15px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
`;