import { styled } from "styled-components";
export const Form = styled.form`
    background: #80d7e0;
    border: solid 3px black;
    border-radius: 15px;
    margin: 0 auto;
    margin-top: 100px;
`;
export const HeaderForm = styled.div`
    display: flex;
    justify-content: center;
    font-size: 25px;
    font-weight: 700;
`;
export const InputForm = styled.div`
    display: flex;
    justify-content: space-between;
    width: 320px;
    margin-top: 15px;
`;
export const FooterForm = styled.div`
    display: flex;
    height: 50px;
`;
export const SubmitForm = styled.button`
    font-size: 17px;
    font-weight: 700;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #2ce1a5;
    &:hover {
        cursor: pointer;
        pacity: 0.9;
        border: solid 1px black;
    }
`;
export const Navigate = styled.div`
    font-weight: 700;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #2ce1a5;
    &:hover {
        cursor: pointer;
        pacity: 0.9;
        border: solid 1px black;
    }
`;
export const NoticeForm = styled.p`
    color: red;
    margin-top: 5px;
    font-size: 15px;
    font-weight: 600;
`;
export const BtnTurnOff = styled.button`
    width: 25px;
    height: 25px;
    font-size: 17px;
    font-weight: 700;
    background-color: red;
    position: absolute;
    top: 0;
    right: 0;
    &:hover {
        cursor: pointer;
        color: #fff;
        font-weight: 600;
    }
`;
export const BtnEmployee = styled.button`
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