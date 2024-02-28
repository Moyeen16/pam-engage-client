import React, { Component } from "react";
import { TopNavbar } from "ms-custom-react-components-library";
import logo from "./../assets/Icons/zs-logo-small.png";

export class NavMenu extends Component {
    render() {
        return <TopNavbar applicationName="Find Your Leader" logo={logo} />;
    }
}
