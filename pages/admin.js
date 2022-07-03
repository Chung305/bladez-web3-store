import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
} from "reactstrap";
import ViewProducts from "../components/dashboard-components/management-components/viewProducts/ViewProducts";
import CreateProduct from "../components/dashboard-components/management-components/CreateProduct";
import { useState } from "react";
import ViewUsers from "../components/dashboard-components/management-components/viewUsers/ViewUsers";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <div className="page-container">
      {/* <CreateProduct /> */}
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab == "1" ? "active" : ""}
            onClick={() => setActiveTab("1")}
          >
            Products
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab == "2" ? "active" : ""}
            onClick={() => setActiveTab("2")}
          >
            Users
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <ViewProducts />
        </TabPane>

        <TabPane tabId="2">
          <ViewUsers />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Admin;
