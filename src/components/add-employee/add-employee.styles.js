import { styled } from "styled-components";
import { 
    NoticeForm,
    BtnTurnOff,
    BtnEmployee
} from "../common-components/common-components.styles";
export const Form = styled.form`
    position: fixed;
    top: 10%;
    left: 20%;
    height: 360px;
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
   padding-left: 70px;
`;
export const DivContent = styled.div`
    display: flex;
    margin-bottom: 10px;
`;
export const ContentSub = styled.p`
    color: ${({isError}) => (isError) ? `red;` : `black;`}
    font-size: 18px;
    width: 170px;
    margin-left: 30px;
    font-weight: 700;
`;
export const ContentInput = styled.input`
    width: 230px;
    font-size: 15px;
    margin-right: 5px;
    outline: none;
    height: 23px;
`;
export const Footer = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 100px;
`;
export const ComeBack = styled.div`
    font-size: 17px;
    font-weight: 700;
    padding: 5px;
    border-radius: 10px;
    background-color: #f98181;
    border: 3px solid #d75c5c;
    &:hover {
        cursor: pointer;
        border: 3px solid #d63434;
        opacity: 0.9;
    }
`;
export const BtnEmp = styled(BtnEmployee)``;
export const Notice = styled(NoticeForm)`
    font-size: 20px;
    margin-top: 0px;
`;