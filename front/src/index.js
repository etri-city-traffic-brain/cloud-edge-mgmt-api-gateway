import React from "react";
import ReactDOM from "react-dom";
import history from "./js/history.js";

import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/ie11"; // For IE 11 support

import { Router, Route, Switch } from "react-router-dom";
import MainLayout from "./view/main.jsx";

import Main from "./view/main.jsx";
import ViewData from "./view/view_data.jsx";
import ViewMypage from "./view/view_mypage.jsx";
import MypageHistory from "./view/mypage_history";
import MypageFavorites from "./view/mypage_favorites";
import LoginDeveloper from "./view/login_developer";
import SigninDeveloper from "./view/signin_developer";
import Findpw from "./view/findpw";
import Newpw from "./view/newpw";
import UserSetting from "./view/user_setting";
import Tool from "./view/tool";
import Privacy from "./view/privacy";
import Clause from "./view/clause";
import Mail from "./view/mail";

import "./assets/scss/black-dashboard-react.scss";

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route path="/src/mypage.html" render={(props) => <ViewMypage {...props} />} />
            <Route path="/src/mypage_search.html" render={(props) => <ViewMypage {...props} SetTypes="1" />} />
            <Route path="/src/mypage_history.html" render={(props) => <MypageHistory {...props} />} />
            <Route path="/src/mypage_favorites.html" render={(props) => <MypageFavorites {...props} />} />
            <Route path="/src/data_recommend.html" render={(props) => <ViewData {...props} dataType="data_recommend" />} />
            <Route path="/src/data_oda.html" render={(props) => <ViewData {...props} dataType="data_oda" />} />
            <Route path="/src/data_file.html" render={(props) => <ViewData {...props} dataType="data_file" />} />
            <Route path="/src/data.html" render={(props) => <ViewData {...props} dataType="data" />} />
            <Route path="/src/data_recommend_bigdata.html" render={(props) => <ViewData {...props} dataType="data_recommend_bigdata" />} />
            <Route path="/src/data_recommend_history.html" render={(props) => <ViewData {...props} dataType="data_recommend_history" />} />

            <Route path="/login" render={(props) => <LoginDeveloper {...props} />} />

            <Route path="/signin" render={(props) => <SigninDeveloper {...props} />} />
            <Route path="/findpw" render={(props) => <Findpw {...props} />} />
            <Route path="/newpw" render={(props) => <Newpw {...props} />} />
            <Route path="/user_setting" render={(props) => <UserSetting {...props} />} />

            <Route path="/tool" render={(props) => <Tool {...props} dataType="tool" />} />
            <Route path="/src/privacy.html" render={(props) => <Privacy {...props} />} />
            <Route path="/src/clause.html" render={(props) => <Clause {...props} />} />
            <Route path="/src/mail.html" render={(props) => <Mail {...props} />} />
            <Route path="/home" render={(props) => <MainLayout {...props} />} />
            <Route path="/" render={(props) => <ViewData {...props} dataType="data" />} />
        </Switch>
    </Router>,
    document.getElementById("root")
);
