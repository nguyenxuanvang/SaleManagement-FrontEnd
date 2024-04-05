import { styled } from "styled-components";
export const Body = styled.div`
    display: flex;
    height: 550px;
    background: #e6a2a2;
    border: 3px solid black;
    margin-top: 15px;
`;
export const LeftBody = styled.div`
    flex: 2;
    padding-top: 30px;
`;
export const RightBody = styled.div`
    flex: 1.3;
    border-left: 3px solid black;
`;
export const BodyTitle = styled.p`
    font-size: 21px;
    font-weight: 700;
    color: #a50909;
    margin-bottom: 15px;
    text-align: center;
`;
export const LeftBodyProductList = styled.div`
    height: 315px;
    overflow-y: auto;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
`;
export const ProductRow = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    border-top: 3px solid black;
    padding: 5px;
    border-bottom: 3px solid black;
    &:first-child {
        border-top: none;
    }
`;
export const ProductRowContent = styled.p`
    font-size: 17px;
    font-weight: 700;
    padding-top: 6px;
    width: 100px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:nth-child(5),&:nth-child(6) {
        color: #d71d1d;
    }
    &:nth-child(2) {
        width: 30px;
    }
`;
export const BtnDelete = styled.button`
    font-size: 17px;
    padding: 3px;
    border-radius: 5px;
    background: #ff3f3f;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;
export const ChangeQuantity = styled.div`
    display: flex;
    gap: 10px;
`;
export const BtnChangeQuantity = styled.button`
    font-size: 17px;
    width: 17px;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;
export const NoticeTotal = styled.div`
    display: flex;
    margin: 20px 30px;
    border: 3px solid black;
    border-radius: 10px;
    padding: 15px;
    gap: 10px;
`;
export const Notice = styled.div`
    width: 400px;
`;
export const NoticeTitle = styled.p`
    font-size: 17px;
    font-weight: 700;
`;
export const NoticeInput = styled.div`
    height: 70px;
    width: 100%;
    outline: none;
    background-color: #fff;
    border: 1px solid black;
`;
export const Total = styled.div`
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;
export const TotalContent = styled.p`
    font-size: 17px;
    font-weight: 700;
`;
export const HeaderRightBody = styled.p`
    text-align: center;
    font-size: 21px;
    font-weight: 700;
    margin-top: 30px;
    margin-bottom: 15px;
`;
export const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 320px;
    padding: 15px 0px;
    padding-left: 10px;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
    overflow-y: auto;
    gap: 10px;
`;
export const ProductDiv = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    width: 270px;
    background-color: #dc5c5c;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;
export const ProductImage = styled.div`
    width: 100px;
    height: 100px;
`;
export const Image = styled.img`
    width: 100%;
    height: 100%;
`;
export const ProductContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
`;
export const Content = styled.p`
    font-size: 17px;
    font-weight: 700;
    &:last-child {
        color: blue;
    }
`;
export const BtnCancelBuyDiv = styled.div`
    display: flex;
    justify-content: center;
    gap: 70px;
    margin-top: 50px;
`;
export const BtnCancelBuy = styled.button`
    font-size: 17px;
    font-weight: 700;
    padding: 10px;
    border-radius: 10px;
    background-color: #73ff73;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;
export const Alert = styled.p`
    position: absolute;
    width: 100%;
    padding-left: 200px;
    font-size: 21px;
    font-weight: 700;
    color: red;
    padding-top: 120px;
`;
export const Alert2 = styled.p`
    width: 100%;
    padding-left: 270px;
    font-size: 21px;
    font-weight: 700;
    color: red;
    padding-top: 130px; 
`;