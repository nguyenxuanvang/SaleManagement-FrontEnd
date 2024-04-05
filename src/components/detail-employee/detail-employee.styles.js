import { styled } from "styled-components";
import { 
    BtnTurnOff,
    BtnEmployee
} from "../common-components/common-components.styles";
export const Form = styled.div`
    position: fixed;
    top: 10%;
    left: 20%;
    height: 300px;
    background-color: #e9abab;
    width: 1000px;
    border: 3px solid black;
`;
export const Header = styled.p`
    font-size: 20px;
    text-align: center;
    font-weight: 700;
    margin-top: 15px;
    color: #7c5858;
`;
export const ButtonTurnOff = styled(BtnTurnOff)``;
export const Body = styled.div`
   margin-top: 25px;
   padding-left: 120px;
`;
export const DivContent = styled.div`
    display: flex;
    margin-bottom: 10px;
`;
export const ContentSub = styled.p`
    font-size: 18px;
    width: 150px;
`;
export const ContentInfor = styled.p`
    width: 250px;
    font-weight: 700;
    font-size: 18px;
    &:last-child {
        color: ${({status}) => (status === true) ? `#15b815;` : (status === false) ? `red;` : ``}
    }
`;
export const Footer = styled.div`
    margin-top: 45px;
    display: flex;
    justify-content: center;
    gap: 100px;
`;
export const BtnEmp = styled(BtnEmployee)``;