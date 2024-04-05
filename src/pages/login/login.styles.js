import styled from 'styled-components';
import { 
    Form,
    HeaderForm,
    InputForm,
    FooterForm,
    SubmitForm,
    Navigate,
    NoticeForm
} from '../../components/common-components/common-components.styles';
export const LoginForm = styled(Form)`
    height: 300px;
    width: 500px;
`;
export const Header = styled(HeaderForm)`
    padding: 25px 0px;
`;
export const Body = styled.div``;
export const Input = styled(InputForm)`
    margin-left: 90px;
`;
export const Footer = styled(FooterForm)`
    justify-content: center;
    gap: 50px;
    margin: 50px 70px;
`;
export const Submit = styled(SubmitForm)``;
export const ToRegistration = styled(Navigate)`
    font-size: 20px;
`;

export const Notice = styled(NoticeForm)`
    margin-left: 170px;
`;