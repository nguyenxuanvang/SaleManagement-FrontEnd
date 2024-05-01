import { styled } from "styled-components";
import {
    ContentBody,
    Body
} from "../employee/employee.styles";
export const PBody = styled(Body)`
    height: auto;
`;
export const ContentBodyP = styled(ContentBody)`
&:last-child {
    font-weight: 500;
}
`;
export const SelectCategory = styled.select`
    border-radius: 10px;
    border: 1px solid black;
    margin-right: 10px;
`;
export const Image = styled.img`
    height: 100px;
    width: 100px;
`;
