import Home from '../pages/Home';
import MyAccount from '../pages/MyAccount/MyAccount';
import Login from '../pages/MyAccount/Login';
import Register from '../pages/MyAccount/Register';
import Category from '../pages/Category';
import NewPost from '../pages/NewPost';
import CategoryDetail from '../pages/CategoryDetail';
import ProductDetail from '../pages/SaleProductDetail/ProductDetail';
import Menu from '../pages/Menu';
import ChatList from '../pages/SaleProductDetail/ChatList';
import ChatDetail from '../pages/ChatDetail';
import Location from '../pages/Location';
import ProductChatList from '../pages/ProductChatList';

const pages = {
  home: Home,
  MyAccount: MyAccount,
  login: Login,
  register: Register,
  category: Category,
  categorydetail: CategoryDetail,
  location: Location,
  menu: Menu,
  productdetail: ProductDetail,
  productchatlist: ProductChatList,
  chatdetail: ChatDetail,
  chatlist: ChatList,
  newpost: NewPost,
};

export default pages;
