import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardText,
  Table,
  Button,
  UncontrolledCarousel,
  CarouselItem,
  Badge,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import styles from "../../../styles/dashboard-styles/ViewProduct.module.css";
import AddInventory from "./AddInventory";

const ViewProducts = () => {
  const [products, setProducts] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [editProductModal, setEditProductModal] = useState(false);
  const [addInventoryModal, setAddInventoryModal] = useState(false);

  const editToggle = () => setEditProductModal(!editProductModal);
  const addToggle = () => setAddInventoryModal(!addInventoryModal);

  //   const next = () => {
  //     const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
  //     setActiveIndex(nextIndex);
  //   };

  //   const previous = () => {
  //     const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
  //     setActiveIndex(nextIndex);
  //   };

  useEffect(() => {
    const fetchProducts = () => {
      fetch("../api/products")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProducts(data);
        });
    };
    fetchProducts();
  }, []);

  console.log(products && products);

  return (
    <div>
      {products &&
        products.map((product, i) => (
          <div key={i}>
            <Card>
              <CardHeader>{product.name}</CardHeader>

              <CardBody className={styles.cardBody}>
                <UncontrolledCarousel
                  items={product.imageUrl.map((image, i) => {
                    return { key: i, caption: "", src: image };
                  })}
                />

                <div>
                  <Table hover>
                    <tbody>
                      <tr>
                        <th scope="row">Price:</th>
                        <td>{product.price} USDC</td>
                      </tr>
                      <tr>
                        <th scope="row">NFT Holders:</th>
                        <td>
                          {product.onlyHolder.toString()}
                          <Button>Change</Button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Available:</th>
                        <td>
                          {product.available.toString()}
                          <Button>Change</Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div>
                    <Badge color="dark">{product.category}</Badge>
                    <Badge color="dark">{product.type}</Badge>
                  </div>
                </div>
                <CardText>{product.description}</CardText>
              </CardBody>

              <CardBody>
                <Button onClick={addToggle}>Add Inventory</Button>
                <Offcanvas
                  direction="bottom"
                  isOpen={addInventoryModal}
                  toggle={addToggle}
                >
                  <OffcanvasHeader toggle={addToggle}>
                    Add Inventory
                  </OffcanvasHeader>
                  <OffcanvasBody>
                    <AddInventory productId={product.id} />
                  </OffcanvasBody>
                </Offcanvas>

                <Button onClick={editToggle}>Edit Product</Button>
                <Offcanvas
                  direction="bottom"
                  isOpen={editProductModal}
                  toggle={editToggle}
                >
                  <OffcanvasHeader toggle={editToggle}>
                    Edit Product
                  </OffcanvasHeader>
                  <OffcanvasBody>
                    <strong>Edit Product</strong>
                  </OffcanvasBody>
                </Offcanvas>
              </CardBody>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default ViewProducts;
