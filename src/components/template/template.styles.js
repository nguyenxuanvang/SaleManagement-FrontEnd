import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
export const Section = styled.div`
    padding: 10px;
`;
export const Menu = styled.div`
    display: flex;
    justify-content: center;
    padding: 0px 15px;
    border: 3px solid;
    border-radius: 10px;
    background-color: #d96767;
`;
export const Logo = styled.div`
    height: 50px;
    width: 250px;
    margin: 16px 10px;
`;
export const ImageLogo = styled.img`
    width: 100%;
    height: 100%;
`;
export const Link = styled(NavLink)`
    text-decoration: none;
    border: 1px solid;
    padding: 15px 20px;
    font-size: 17px;
    font-weight: 700;
    line-height: 50px;
    color: black;
    ${({to,location}) => (to === location) && css`background-color: #8f3535; color: #dc6392;`}
    &:hover {
        background-color: #8f3535;
        color: #dc6392
    }
`;
export const SectionUser = styled.div`
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const User = styled.div`
    border-radius: 50%;
    overflow: hidden;
    height: 40px;
    width: 40px;
    border: 3px solid black;
`;
export const ImageUser = styled.img`
    width: 35px;
    height: 35px;
`;
export const NameUser = styled.span`
    font-size: 18px;
    font-weight: 700;
`;
export const Icon = styled.img`
    height: 20px;
    margin-top: 30px;
    &:hover {
        cursor: pointer;
    }
`;
export const PopUpSetting = styled.div`
    background-color: #fff;
    height: min-content;
    margin-top: 20px;
    padding: 5px;
    border-radius: 5px;
    border: 3px solid;
    margin-left: 5px;
    font-weight: 700;
    &:hover {
        cursor: pointer;
        background-color: #ffdddd;
        color: #352c2c;
    }
`;