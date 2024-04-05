import { styled } from "styled-components";
export const ContentSubP = styled.p`
    color: ${({isError}) => (isError) ? `red;` : `black;`}
    font-size: 18px;
    width: 170px;
    margin-left: 165px;
    font-weight: 700;
`;