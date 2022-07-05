import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  UncontrolledCarousel,
  CarouselItem,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner,
  ModalFooter,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import styles from "../../../../styles/dashboard-styles/ViewProduct.module.css";
import AddInventory from "./AddInventory";
import EditProduct from "./EditProduct";
import {
  updateIsHolder,
  updateAvailable,
} from "../../../../lib/controller/product";

const ViewProducts = () => {
  //used to refresh page on onlyHolder/available when updated
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [inventoryEdit, setInvetoryEdit] = useState(true);
  const toggleEdit = () => setInvetoryEdit(!inventoryEdit);

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    console.log("render");
    const fetchProducts = async () => {
      fetch("../api/products")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setProducts(data);
        });
    };
    setTimeout(() => {
      fetchProducts();
    }, 500);
    setLoading(false);
  }, [refresh]);

  // const refresh = () => {
  //   const change = !refresher;
  //   setRefresher(change);
  //   window.location.reload(false);
  // };
  return (
    <div>
      <div>
        <Table className={styles.table}>
          <tbody>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>NFT Holder</th>
              <th>Available</th>
              <th>Category</th>
              <th>Type</th>
            </tr>
            {products &&
              products.map((product, i) => (
                <tr key={i}>
                  <td className={styles.tableColumnButton}>
                    <img
                      src={product.imageUrl[0]}
                      className={styles.productImage}
                    />
                    <Button className={styles.button}>Add/Edit</Button>
                  </td>

                  <td>{product.name}</td>

                  <td>{product.price} USDC</td>

                  <td>
                    {loading ? (
                      <Spinner color="info" type="grow">
                        loading...
                      </Spinner>
                    ) : (
                      <Button
                        className={
                          product.onlyHolder && product.onlyHolder
                            ? styles.buttonTrue
                            : styles.buttonFalse
                        }
                        onClick={() => {
                          console.log(!product.onlyHolder);
                          updateIsHolder(
                            product.id.toString(),
                            !product.onlyHolder
                          );
                          setRefresh(!refresh);
                        }}
                      >
                        {product.onlyHolder.toString() &&
                          product.onlyHolder.toString()}
                      </Button>
                    )}
                  </td>

                  <td>
                    {loading ? (
                      <Spinner color="info" type="grow">
                        loading...
                      </Spinner>
                    ) : (
                      <Button
                        className={
                          product.available && product.available
                            ? styles.buttonTrue
                            : styles.buttonFalse
                        }
                        onClick={() => {
                          console.log(!product.available);
                          updateAvailable(
                            product.id.toString(),
                            !product.available
                          );
                          setRefresh(!refresh);
                        }}
                      >
                        {product.available.toString() &&
                          product.available.toString()}
                      </Button>
                    )}
                  </td>
                  <td>
                    <Badge color="dark">{product.category}</Badge>
                  </td>
                  <td>
                    <Badge color="dark">{product.type}</Badge>
                  </td>
                  <td>
                    <Button className={styles.button} onClick={toggle}>
                      Edit
                    </Button>
                    <Modal
                      isOpen={modal}
                      toggle={toggle}
                      size="xl"
                      modalTransition={{ timeout: 200 }}
                    >
                      <ModalBody>
                        {inventoryEdit ? (
                          <AddInventory productId={product.id} />
                        ) : (
                          <EditProduct product={product} />
                        )}
                        <div>
                          <Button onClick={toggleEdit}>
                            {inventoryEdit ? "Edit Product" : "Inventory"}
                          </Button>
                        </div>
                      </ModalBody>
                    </Modal>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewProducts;
