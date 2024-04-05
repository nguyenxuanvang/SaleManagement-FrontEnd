import { styled } from "styled-components";
import { 
    BtnTurnOff,
    BtnEmployee
} from "../common-components/common-components.styles";
export const Form = styled.div`
    position: fixed;
    top: 10%;
    left: 23%;
    height: 380px;
    background-color: #e9abab;
    width: 900px;
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
   display: flex;
   gap: 100px;
`;
export const NameProduct = styled.p`
    text-align: center;
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 15px;
`;
export const ImageProduct = styled.img`
    height: 170px;
    width: 250px;
    border-radius: 10px;
    border: 5px solid black;
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
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 100px;
`;
export const BtnEmp = styled(BtnEmployee)``;