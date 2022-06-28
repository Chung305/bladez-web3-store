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
  Carousel,
  CarouselItem,
  Badge,
} from "reactstrap";
import styles from "../../../styles/dashboard-styles/ViewProduct.module.css";

const ViewProducts = () => {
  const [products, setProducts] = useState(null);

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

  return (
    <div>
      {products &&
        products.map((product, i) => (
          <div key={i}>
            <Card>
              <CardHeader>{product.name}</CardHeader>

              <CardBody className={styles.cardBody}>
                <Carousel activeIndex={0} slide={true}>
                  {product.imageUrl.map((image, i) => (
                    <CarouselItem key={i}>
                      <img src={image} width={300} />
                    </CarouselItem>
                  ))}
                </Carousel>

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
                <Button>Add Inventory</Button>
                <Button>Edit Product</Button>
              </CardBody>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default ViewProducts;
