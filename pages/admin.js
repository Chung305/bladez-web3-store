import ManagementUtilityBar from "../components/dashboard-components/management-components/ManagementUtilityBar";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
} from "reactstrap";
import ViewProducts from "../components/dashboard-components/management-components/ViewProducts";
const Admin = () => {
  return (
    <div className="page-container">
      <Nav tabs>
        <NavItem>
          <NavLink className="active" onClick={function noRefCheck() {}}>
            Products
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="" onClick={function noRefCheck() {}}>
            Users
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab="1">
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <ViewProducts />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2"></TabPane>
      </TabContent>
    </div>
  );
};

export default Admin;
