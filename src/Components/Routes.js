import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../Routes/Login";
import Feed from "../Routes/Feed";
import Cart from "../Routes/Cart";
import Join from "../Routes/Join";
import WishList from "../Routes/WishList";
import Mypage from "../Routes/Mypage";
import Product from "../Routes/Product";
import QnA from "../Routes/QnA";
import Notice from "../Routes/Notice";
import Write from "../Routes/Write";
import NoticeDetail from "../Routes/NoticeDetail";
import QnADetail from "../Routes/QnADetail";
import Order from "../Routes/Order";
import Payment from "../Routes/Payment";
import Profile from "../Routes/Profile";


const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route exact path="/product/:id" component={Product} />
    <Route exact path="/board/qna" component={QnA} />
    <Route exact path="/board/notice" component={Notice} />
    <Route exact path="/board/write" component={Write} />
    <Route exact path="/cart" component={Cart} />
    <Route exact path="/mypage" component={Mypage} />
    <Route exact path="/wishlist" component={WishList} />
    <Route exact path="/board/notice/:id" component={NoticeDetail} />
    <Route exact path="/board/qna/:id" component={QnADetail} />
    <Route exact path="/order" component={Order} />
    <Route exact path="/payment" component={Payment} />
    <Route exact path="/profile" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/login" component={Login} />
    <Route exact path="/cart" component={Cart} />
    <Route exact path="/product/:id" component={Product} />
    <Route exact path="/board/qna" component={QnA} />
    <Route exact path="/board/notice" component={Notice} />
    <Route exact path="/board/write" component={Write} />
    <Route exact path="/join" component={Join} />
    <Route exact path="/board/notice/:id" component={NoticeDetail} />
    <Route exact path="/board/qna/:id" component={QnADetail} />
    <Route exact path="/payment" component={Payment} />
    <Redirect from="/mypage" to={`/login?returnUrl=/mypage`} />
    <Redirect from="/order" to={`/login?returnUrl=/order`}/>
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;