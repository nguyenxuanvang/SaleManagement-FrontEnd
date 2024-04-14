import { 
    Outlet,
    useLocation,
    useNavigate
} from "react-router-dom";
import { 
    Section,
    Menu,
    Logo,
    ImageLogo,
    Link,
    SectionUser,
    User,
    ImageUser,
    NameUser,
    Icon,
    PopUpSetting
} from "./template.styles";
import userApi from "../../redux/api/user-api.slice";
import settingIcon from '../../icons/setting.png';
import logoKiot from '../../images/kiotViett.jpg';
import userIcon from '../../icons/user.png';
const Template = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {data:user = []} = userApi.useGetUserInforQuery();
    const [logOut] = userApi.useLogoutMutation();
    const onLogout = async() => {
        const res =await logOut();
        if(res.data) {
            navigate('/login');
        }
    }
    return (
        <Section>
            <Menu>
                <Logo>
                    <ImageLogo src={logoKiot} alt="Logo"/>
                </Logo>
                <Link to = '/home' location = {location.pathname}>Tổng Quan</Link> 
                <Link to = '/product' location = {location.pathname}>Hàng Hóa</Link>
                <Link to = '/importProduct' location = {location.pathname}>Nhập Hàng</Link>
                <Link to = '/employee' location = {location.pathname}>Nhân Viên</Link>
                <Link to = '/sale' location = {location.pathname}>Bán Hàng</Link>
                <SectionUser>
                    <User>
                        <ImageUser src={userIcon} alt="Avt"/>
                    </User>
                    <NameUser>{(user.hoTen) ? user.hoTen.split(' ')[user.hoTen.split(' ').length-1] : ``}</NameUser>
                </SectionUser>
                <Icon src={settingIcon}/>
                <PopUpSetting onClick={onLogout}>
                    Đăng Xuất
                </PopUpSetting>
                
            </Menu>
            <Outlet/>
        </Section>    
    );
}
export default Template;