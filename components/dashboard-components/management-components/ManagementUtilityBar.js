import CreateProduct from "./CreateProduct";
import ViewProducts from "./ViewProducts";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { useState } from "react";

import styles from "../../../styles/dashboard-styles/ManagementUtilityBar.module.css";

export default function ManagementUtilityBar() {
  // const [modal1, setModal1] = useState(false);
  // const [modal2, setModal2] = useState(false);
  // const addToggle = () => setModal1(!modal1);
  // const viewToggle = () => setModal2(!modal2);

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink className="active" onClick={function noRefCheck() {}}>
            Tab1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="" onClick={function noRefCheck() {}}>
            More Tabs
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab="1">
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      {/* <div>
        <Button color="danger" onClick={addToggle}>
          Add Product
        </Button>
        <Modal
          isOpen={modal1}
          toggle={addToggle}
          size="xl"
          modalTransition={{ timeout: 200 }}
        >
          <ModalHeader toggle={addToggle}>Create Product</ModalHeader>

          <ModalBody>
            <CreateProduct />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </Modal>
      </div>

      <div>
        <Button color="danger" onClick={viewToggle}>
          View Products
        </Button>
        <Modal
          isOpen={modal2}
          toggle={viewToggle}
          scrollable={true}
          size="xl"
          modalTransition={{ timeout: 200 }}
        >
          <ModalHeader toggle={viewToggle}>Products</ModalHeader>

          <ModalBody>
            <ViewProducts />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </Modal>
      </div> */}
    </div>
  );
}
