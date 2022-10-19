import React from "react";

import cookie from "react-cookies";

// reactstrap components
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, NavLink } from "reactstrap";

function session_nav() {
    // console.log("aaa " + cookie.load('admin'))
    // console.log("aaa " + sessionStorage.getItem("user"))

    if (cookie.load("admin") == "admin" && sessionStorage.getItem("user") == null) {
        sessionStorage.setItem("user", cookie.load("admin"));
    } else if (cookie.load("admin") == undefined && sessionStorage.getItem("user") == "admin") {
        cookie.remove("admin", { path: "/" });
        sessionStorage.clear();
    }
    return (
        <div>
            {sessionStorage.getItem("user") == null && (
                <div className="header_top_user">
                    <a href="/login">
                        <strong>LOGIN</strong>
                    </a>
                    <a href="/signin">
                        <strong>SIGNUP</strong>
                    </a>
                </div>
            )}
            {sessionStorage.getItem("user") != null && (
                <div className="header_top_user">
                    <div className="header_top_user_photo" />
                    <UncontrolledDropdown nav style={{ padding: "0px", height: "30px", background: 0 }}>
                        <DropdownToggle
                            caret
                            color="default"
                            data-toggle="dropdown"
                            nav
                            onClick={(e) => e.preventDefault()}
                            style={{ padding: "0px" }}
                        >
                            <button type="button" className="header_top_user_btn js_arr_toggle js_user_open">
                                {sessionStorage.getItem("user")}
                            </button>
                            <b className="caret d-none" />
                            <p className="d-lg-none">Log out</p>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-navbar" right tag="ul">
                            {/* <NavLink tag="li">
                        <DropdownItem className="nav-item" href="/src/mypage.html">MyPage</DropdownItem>
                    </NavLink> */}
                            <NavLink tag="li">
                                <DropdownItem className="nav-item" href="/user_setting">
                                    Settings
                                </DropdownItem>
                            </NavLink>
                            <DropdownItem divider tag="li" />
                            <NavLink tag="li">
                                <DropdownItem className="nav-item" href="/login">
                                    Log out
                                </DropdownItem>
                            </NavLink>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )}
        </div>
    );
}

export default session_nav;
