import styles from "../../styles/AccountNfts.module.css";
import { useState } from "react";
import {
  Button,
  Modal,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Table,
} from "reactstrap";

export default function AccountNfts({ nfts }) {
  // Modal open state
  const [modal, setModal] = useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={nfts.image} />

      <p>{nfts.name}</p>
      <div>
        <Button className={styles.button} color="primary" onClick={toggle}>
          Check Metadata
        </Button>
        <Modal
          isOpen={modal}
          toggle={toggle}
          size="xl"
          modalTransition={{ timeout: 200 }}
        >
          <ModalBody className={styles.modalContainer}>
            <h1>{nfts.name} </h1>
            <div className={styles.attributeContainer}>
              <h3>Attributes</h3>

              <Table className={styles.table}>
                <thead className={styles.tableTitle}>
                  <tr>
                    <th>TRAIT</th>
                    <th>VALUE</th>
                  </tr>
                </thead>
                <tbody className={styles.tableValue}>
                  {nfts.attributes.map((attribute, i) => (
                    <tr key={i}>
                      <th scope="row">{attribute.trait_type}</th>
                      <td>{attribute.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <h3>Mint Authority Address</h3>
              <p>{nfts.mintAddress}</p>

              <h3>Update Authority Address</h3>
              <p>{nfts.updateAuthority}</p>

              <h3>IPFS URI</h3>
              <p className={styles.break}>{nfts.image}</p>

              <h3>Seller Fee (Royalties)</h3>
              <p>{nfts.sellerFeeBasisPoints / 100 + "%"}</p>

              {nfts.properties.creators.map((creators, i) => (
                <div key={i}>
                  <h3>Creator Address</h3>
                  <p>{creators.address}</p>
                  <p>Share: {creators.share}%</p>
                </div>
              ))}
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
