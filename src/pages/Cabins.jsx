import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import getCabins from "../services/apiCabins";

function Cabins() {
  const [cabins, setCabins] = useState([]);

  useEffect(function () {
    getCabins()
      .then((data) => setCabins(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <img src={cabins[0]?.image} />
    </Row>
  );
}

export default Cabins;
