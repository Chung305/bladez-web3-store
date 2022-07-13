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
import { truncateWord } from "../../lib/utilities";

export default function AccountNfts({ nfts }) {
  const {
    data: {
      properties: { creators },
    },
  } = nfts;
  // Modal open state
  const [modal, setModal] = useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={nfts.data.image} />

      <div className={styles.nftNameContainer}>
        <span className={styles.nftName}>{nfts.data.name} </span>
        <a onClick={toggle}>
          <img className={styles.buttonImg} src="/search.png" />
        </a>
        {/* <Button className={styles.button} color="primary" >
         
        </Button> */}
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
                  {nfts.data.attributes.map((attribute, i) => (
                    <tr key={i}>
                      <th scope="row">{attribute.trait_type}</th>
                      <td>{attribute.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <h3>Mint Authority Address</h3>
              <p className={styles.data}>{nfts.mintAuthority}</p>

              <h3>Update Authority Address</h3>
              <p className={styles.data}>{nfts.updateAuthority}</p>

              <h3>Image URL</h3>
              <p className={styles.data}>{truncateWord(nfts.data.image, 50)}</p>

              <h3>Seller Fee (Royalties)</h3>
              <p className={styles.data}>
                {nfts.data.seller_fee_basis_points / 100 + "%"}
              </p>

              {creators &&
                creators.map((creator, i) => (
                  <div key={i}>
                    <h3>Creator Address</h3>
                    <p className={styles.data}>{creator.address}</p>
                    <p className={styles.data}>Share: {creator.share}%</p>
                  </div>
                ))}
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
