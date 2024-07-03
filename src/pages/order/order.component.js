import { 
  useEffect,
  useState,
  useRef
} from "react";
import { 
  Header,
  BtnSearch,
  SearchIcon,
  SearchEmp,
  HeaderBody,
  TitleHeader,
  BodyBody,
  Alert,
  BtnDiv,
  BtnNext,
  BtnPrevious,
  OverLay
} from "../employee/employee.styles";
import { 
  PBody,
  SelectCategory,
  ContentBodyP,
  Image
} from "../product/product.styles";
import DetailProduct from "../../components/detail-product/detail-product.component";
import DetailOrder from "../../components/detail-order/detail-order.component";
import UpdateProduct from "../../components/update-product/update-product.component";
import searchIcon from "../../icons/search.png";
import orderApi from "../../redux/api/order-api-slice";
const Order = () => {
  const [getOrders,{data = []}] = orderApi.useLazyGetOrdersQuery();
  const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [order, setOrder] = useState();
  const [page, setPage] = useState(1);
  const searchRef = useRef(null);
  const filterRef = useRef(null);
  useEffect(()=>{
      getOrders();
  },[]);
  const onOpenDetailForm = (order) => {
    setOrder(order);
    setIsOpenDetailForm(true);
  }
  const onTurnOffDetailForm = () => {
      setIsOpenDetailForm(false);
  }
  const onOpenUpdateForm = () => {
      setIsOpenUpdateForm(true);
  }
  const onTurnOffUpdateForm = () => {
      setIsOpenUpdateForm(false);
  }
  const formatDate = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = (date.getMonth()<9) ? '0'+(date.getMonth()+1) : date.getMonth();
    const day = (date.getDate()<10) ? '0'+date.getDate() : date.getDate();
    const hour = (date.getHours()<10) ? '0'+date.getHours() : date.getHours();
    const minute = (date.getMinutes()<10) ? '0'+date.getMinutes() : date.getMinutes();
    return day+'-'+month+'-'+year+' '+hour+':'+minute;
  }
  const onSearch = () => {
      getOrders({search: searchRef.current.value,filter: filterRef.current.value});
      setPage(1);
  }
  const onNext = async() => {
      if(data.data.length === 5) {
          const nextPage = page + 1;
          await getOrders({page: nextPage,search:searchRef.current.value,filter:filterRef.current.value});
          setPage(nextPage);
      }
  }
  const onPrevious = async () => {
      const previousPage = page - 1;
      await getOrders({page: previousPage,search:searchRef.current.value,filter:filterRef.current.value});
      setPage(previousPage);
  }
  return (
      <section>
          <Header>
              <input ref={searchRef} type="date"/>
              <SelectCategory ref={filterRef}>
                  <option>Latest</option>
                  <option>Oldest</option>
              </SelectCategory>
              <BtnSearch onClick={onSearch}>
                  <SearchIcon src={searchIcon}/>
              </BtnSearch>
          </Header>
          <PBody>
              {(data.data?.length !== 0) ? <HeaderBody>
                  <TitleHeader>Ngày Tạo</TitleHeader>
                  <TitleHeader>Tổng Số Lượng</TitleHeader>
                  <TitleHeader>Tổng Giá</TitleHeader>
                  <TitleHeader>Ghi Chú</TitleHeader>
              </HeaderBody> : <Alert>Chưa Có Hóa Đơn Nào</Alert>}
               
              {data.data?.map(item => (
                  <BodyBody key={item._id} onClick={() => {onOpenDetailForm(item)}}>
                  <ContentBodyP>{formatDate(item.createdAt)}</ContentBodyP>
                  <ContentBodyP>{item.total_quantity}</ContentBodyP>
                  <ContentBodyP>{item.total_price}</ContentBodyP>
                  <ContentBodyP>{(item.note) ? item.note : 'Không Có Ghi Chú !'}</ContentBodyP>
              </BodyBody>
              ))}
          </PBody>
          <BtnDiv>
              {(page > 1) && <BtnPrevious onClick={onPrevious} page={page}>Previous</BtnPrevious>}
              {(data.data?.length === 5) && <BtnNext onClick={onNext} data={data.length}>Next</BtnNext>}
          </BtnDiv>
          {(isOpenDetailForm || isOpenUpdateForm) && <OverLay/>}
          {(isOpenDetailForm) && <DetailOrder page={page} onTurnOffDetailForm={onTurnOffDetailForm} onOpenUpdateForm={onOpenUpdateForm} order={order}/>}
          {(isOpenUpdateForm) && <UpdateProduct onTurnOffUpdateForm={onTurnOffUpdateForm} onTurnOffDetailForm={onTurnOffDetailForm} setIsOpenDetailForm={setIsOpenDetailForm} order={order}/>}
      </section>
  );
}
export default Order;