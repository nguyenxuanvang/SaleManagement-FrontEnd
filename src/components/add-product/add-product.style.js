import { styled } from "styled-components";
export const ContentSubP = styled.p`
    color: ${({isError}) => (isError) ? `red;` : `black;`}
    font-size: 18px;
    width: 170px;
    margin-left: 165px;
    font-weight: 700;
`;
export const ContentUpload = styled.input`
    width: 0px;
    height: 0px;
`;
export const ButtonUpload = styled.button`
    font-size: 14px;
    padding: 3px;
    border-radius: 10px;
    background: #ccfffe;
    &:hover {
        cursor: pointer;
    }
`;
export const Image = styled.img`
    height: 100px;
    width: 100px;
`;
export const BtnAdd = styled.button`
    padding: 5px;
    border: none;
    margin-left: 5px;
`;
export const InputCategory = styled.input`
    margin-left: 5px;
`;