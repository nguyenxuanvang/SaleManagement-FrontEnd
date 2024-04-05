import { styled } from "styled-components";
import { 
    Body,
    LeftBody,
    RightBody
} from "../sale/sale.styles";
export const Container = styled(Body)`
    height: 500px;
`;
export const LeftContainer = styled(LeftBody)`
    padding-top: 5px;
`;
export const HeaderLeftContainer = styled.div`
    display:flex;
    justify-content: center;
    gap: 15px;
    position: relative;
    margin-top: 25px;
    margin-bottom: 15px;
`;
export const PLeftContainer = styled.p`
    font-size: 21px;
    font-weight: 700;
    align-self: center;
`;
export const InputLeftContainer = styled.input`
    outline: none;
    border-radius: 10px;
    padding: 5px;
`;
export const Popup = styled.div`
    position: absolute;
    background-color: #fff;
    width: 200px;
    height: 100px;
    top: 28px;
    right: 245px;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
    visibility: ${({isfocus}) => (isfocus === 'true') ? `visible;` : `hidden;`}
`;
export const ItemPopup = styled.p`
    padding: 7px 0px;
    padding-left: 10px;
    &:hover {
        cursor: pointer;
        background-color: #e2caca;
    }
`;
export const BodyLeftContainer = styled.div`
   height: 420px;
   overflow-y: auto;
   border-top: 3px solid black; 
`;
export const HeaderBodyLeftContainer = styled.div`
    display: flex;
    border-bottom: 3px solid
`;
export const DeleteBtn = styled.button`
    padding: 5px;
    border-radius: 10px;
    background-color: #ff3f3f;
    font-size: 17px;
    font-weight: 700;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;
export const TittleHeaderBodyLeftContainer = styled.p`
    font-size: 19px;
    font-weight: 700;
    width: 130px;
    padding: 5px;
    text-align: center;
    border-right: 3px solid black;
    &:last-child {
        border-right: none;
    }
`;
export const BodyBodyLeftContainer = styled.div`
    display: flex;
    border-bottom: 3px solid black;
`;
export const ContentBodyLeftContainer = styled.p`
    font-size: 17px;
    width: 130px;
    padding: 5px;
    text-align: center;
    border-right: 3px solid black;
    padding-top: 13px;
    
    &:first-child {
        padding-top: 5px;
    }
    &:last-child {
        border-right: none;
    }
`;
export const RightContainer = styled(RightBody)`
    
`;
export const HeaderRightContainer = styled.div`
    display: flex;
    justify-content: end;
    gap: 15px;
    padding-top: 25px;
    padding-right: 15px;
    & p {
        font-size: 20px;
    }
    & p:first-child {
        font-weight: 700;
    }
`;
export const BodyRightContainer = styled.div`
    
`;
export const HeaderBodyRightContainer = styled.p`
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
    color: #5a3d3d;
`;
export const BodyBodyRightContainer = styled.div`
    border-top: 3px solid black;
    border-bottom: 3px solid black;
`;
export const RowBodyRightContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px 0px;
    & p {
        width: 120px;
        font-size: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
export const FooterBodyRightContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px 0px;
    border-bottom: 3px solid black;
    & p {
        font-size: 17px;
        font-weight: 700;
    }
`;
export const FooterRightContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-top: 15px;
    & button {
        font-size: 17px;
        font-weight: 700;
        padding: 5px;
        border-radius: 10px;
        background-color: #73ff73;
    }
    & button:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;
export const Notice = styled.p`
    text-align: center;
    font-size: 17px;
    font-weight: 700;
    color: red;
    margin: 15px 0px;
`;