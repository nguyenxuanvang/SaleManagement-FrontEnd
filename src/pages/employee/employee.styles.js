import { styled } from "styled-components";
export const Header = styled.div`
    display: flex;
    margin-left: 150px;
    margin-top: 15px;
`;
export const BtnSearch = styled.button`
    width: 32px;
    height: 32px;
    margin-right: 150px;
    border-radius: 5px;
    background-color: #f99090;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;
export const SearchIcon = styled.img`
    height: 17px;
    margin-top: 3px;
`;
export const SearchEmp = styled.input`
    outline: none;
    font-size: 17px;
    margin-right: 10px;
    padding: 5px;
    border-radius: 5px;
`;
export const BtnAddEmp = styled.button`
    font-size: 15px;
    font-weight: 700;
    padding: 5px;
    border-radius: 10px;
    background-color: #f99090;
    border: 3px solid #ac3535;
    &:hover {
        cursor: pointer;
        border: 3px solid #d63434;
        opacity: 0.9;
    }
`;
export const Body = styled.div`
    height: 257px;
    margin-top: 30px;
`;
export const HeaderBody = styled.div`
    display: flex;
    border-bottom: 3px solid black;
`;
export const TitleHeader = styled.p`
    font-size: 17px;
    font-weight: 700;
    padding: 10px;
    width: 380px;
    text-align: center;
    border-right: 3px solid black;
    border-top: 3px solid black;    
    &:first-child {
        border-left: 3px solid black;
    }
    
`;
export const BodyBody = styled.div`
    display: flex;
    border-bottom: 3px solid black;
    &:hover {
        cursor: pointer;
        background-color: #e6a2a2;
    }
`;
export const ContentBody = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    padding: 10px;
    width: 380px;
    overflow: hidden;
    text-overflow: ellipsis;
    border-right: 3px solid black;
    &:first-child {
        border-left: 3px solid black;
    }
    &:last-child {
        color: ${({active}) => (active==='true') ? `#15b815;` : `#2d2a2a;`}
        font-weight: 600;
    }
`;
export const Alert = styled.div`
    text-align: center;
    font-size: 30px;
    color: red;
    font-weight: 700;
`;
export const BtnDiv = styled.div`
    position: relative;
    margin-top: 15px;
`;
export const BtnNext = styled.button`
    font-size: 17px;
    font-weight: 700;
    padding: 5px;
    border-radius: 5px;
    position: absolute;
    right: 5px;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
        background-color: #f9dbdb;
    }
`;
export const BtnPrevious = styled.button`
    font-size: 17px;
    font-weight: 700;
    padding: 5px;
    border-radius: 5px;
    position: absolute;
    left: 5px;
    visibility: ${({page}) => (page === 1) ? `hidden` : `visible`};
    &:hover {
        cursor: pointer;
        opacity: 0.9;
        background-color: #f9dbdb;
    }
`;