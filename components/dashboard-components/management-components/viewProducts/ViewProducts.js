import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
  Badge,
  Modal,
  ModalBody,
  Spinner,
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
import EditImages from "./EditImages";

const ViewProducts = () => {
  //used to refresh page on onlyHolder/available when updated
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [inventoryEdit, setInvetoryEdit] = useState(true);
  const toggleEdit = () => setInvetoryEdit(!inventoryEdit);

  const [addEditImage, setAddEditImage] = useState(false);
  const toggleImage = () => setAddEditImage(!addEditImage);

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    console.log("render");
    const fetchProducts = async () => {
      fetch("../api/products")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProducts(data);
        });
    };
    setTimeout(() => {
      fetchProducts();
    }, 500);
    setLoading(false);
  }, [refresh, !modal]);

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
                    <Button className={styles.button} onClick={toggleImage}>
                      Add/Edit
                    </Button>
                    <Offcanvas
                      isOpen={addEditImage}
                      toggle={toggleImage}
                      direction="end"
                    >
                      <OffcanvasHeader toggle={toggleImage}>
                        Add/Remove Image
                      </OffcanvasHeader>
                      <OffcanvasBody>
                        <EditImages images={product.imageUrl} />
                      </OffcanvasBody>
                    </Offcanvas>
                  </td>

                  <td>{product.name} </td>

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
                        <div className={styles.addEditContainer}>
                          <Button onClick={toggleEdit}>Switch</Button>
                          <span>
                            {inventoryEdit ? "Edit Product" : "Inventory"}
                          </span>
                        </div>
                      </ModalBody>
                    </Modal>
                  </td>
                  <td>
                    <Button
                      className={styles.button}
                      id="UncontrolledPopover"
                      type="button"
                    >
                      Pool
                    </Button>
                    <UncontrolledPopover
                      placement="left"
                      target="UncontrolledPopover"
                      trigger="legacy"
                    >
                      <PopoverHeader>Current Inventory</PopoverHeader>
                      <PopoverBody>
                        <Table>
                          <tbody>
                            <tr>
                              <th>Size</th>
                              <th>Color</th>
                              <th>Quantity</th>
                            </tr>
                            {product.inventory.map((inv, i) => (
                              <tr key={i}>
                                <td>{inv.size}</td>
                                <td>{inv.color}</td>
                                <td>{inv.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </PopoverBody>
                    </UncontrolledPopover>
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
