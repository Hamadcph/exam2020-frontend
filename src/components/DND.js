import React, { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
import facade from "../apiFacade";
import { Container, InputGroup, FormControl } from "react-bootstrap";
/*
const DND = () => {
  const [hasError, setErrors] = useState(false);
  const [DND, setDND] = useState({});
  const [id, setId] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(DNDList);
      res
        .json()
        .then(res => setDND(res))
        .catch(err => setErrors(err));
    }

    fetchData();
  }, []);

  return (
    <div>
      <JSONPretty id="json-pretty" data={DND}></JSONPretty>

      <hr />
      <span>Has error: {JSON.stringify(hasError)}</span>
    </div>
  );
};
export default DND;
*/

export default function LoggedIn() {
  const [data, setData] = useState({});
  const [id, setId] = useState("");

  useEffect(() => {
    facade.fetchSpell(id).then(res => setData(res));
    //facade.fetchData().then(res => setData(res));
  }, [id]);

  return (
    <Container>
      <h2>Data Received from server</h2>
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Search term"
            id="id"
            value={id}
            onChange={event => setId(event.target.value)}
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </div>
      {id !== "" && <JSONPretty id="json-pretty" data={data}></JSONPretty>}
    </Container>
  );
}