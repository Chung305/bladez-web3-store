import {
  Accordion,
  AccordionItem,
  AccordionBody,
  AccordionHeader,
} from "reactstrap";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const About = () => {
  const [load, setLoading] = useState(null);
  const { publicKey } = useWallet();

  return (
    <div className="page-container">
      <h1>About Us updated </h1>
      <div></div>
    </div>
  );
};

export default About;
