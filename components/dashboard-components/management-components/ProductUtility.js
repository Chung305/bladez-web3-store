import CreateProduct from "./CreateProduct";
import ViewProducts from "./ViewProducts";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { useState } from "react";

import styles from "../../../styles/dashboard-styles/ProductUtility.module.css";

export default function ProductUtility() {
  // Modal open state
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  // Toggle for Modal
  const addToggle = () => setModal1(!modal1);
  const viewToggle = () => setModal2(!modal2);
  return (
    <div>
      <div>
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
      </div>
    </div>
  );
}
