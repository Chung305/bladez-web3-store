import React, { useState } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  CardImg,
} from "reactstrap";

import styles from "../styles/FrontPage.module.css";

// Constants

const App = () => {
  const [roadmapToggle, setRoadmapToggle] = useState(false);

  const toggle = () => setRoadmapToggle(!roadmapToggle);
  return (
    <div className={styles.page}>
      <Card className={styles.roadmapCard}>
        <Card className={styles.shopCard}>
          <CardImg className={styles.bannerImage} src="/CBC-logo-6-01.png" />
        </Card>

        <div>
          <CardBody>
            <CardTitle className={styles.spacer} tag="h2">
              Official Roadmap
            </CardTitle>
            <CardImg className={styles.roadmapImage} src="/bladezGif.gif" />
            <CardText>
              Call to Action text to engage with the roadmap button
            </CardText>
          </CardBody>
        </div>
        <div>
          <Button className={styles.ctaButton} color="primary" onClick={toggle}>
            Roadmap
          </Button>
          <Offcanvas isOpen={roadmapToggle} toggle={toggle}>
            <OffcanvasHeader toggle={toggle}>Roadmap</OffcanvasHeader>
            <OffcanvasBody>
              <strong>Roadmap will be placed here</strong>
            </OffcanvasBody>
          </Offcanvas>
        </div>
      </Card>

      <Card className={styles.separator}></Card>
      {/* <Button className={styles.ctaButton} href="/shop" color="primary">
            Shop
          </Button> */}
    </div>
  );
};

export default App;
