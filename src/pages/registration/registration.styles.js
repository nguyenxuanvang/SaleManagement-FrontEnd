import { styled } from "styled-components";
import { 
    Form,
    HeaderForm,
    InputForm,
    FooterForm,
    SubmitForm,
    Navigate,
    NoticeForm
} from "../../components/common-components/common-components.styles";
export const RegistrationForm = styled(Form)`
    height: 450px;
    width: 650px;
`;
export const Header = styled(HeaderForm)`
    padding: 15px 0px;
`;
export const Body = styled.div``;
export const Input = styled(InputForm)`
    margin-left: 30px;
`;
export const PhoneEmail = styled.div`
    display: flex;
    margin-left: 30px;
    margin-top: 15px;
`;
export const Phone = styled.input`
    margin-left: 78px;
    margin-right: 15px;
`;
export const Email = styled.input`
    margin-left: 15px;
`;
export const Footer = styled(FooterForm)`
    justify-content: space-between;
    margin: 30px 200px;
`;
export const Submit = styled(SubmitForm)``;
export const ComeBack = styled(Navigate)`
    font-size: 17px;
`;
export const Notice = styled(NoticeForm)`
    margin-left: 150px;
`;