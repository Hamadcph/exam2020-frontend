import React, { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
import facade from "../apiFacade";
import { Container, InputGroup, FormControl } from "react-bootstrap";

export default function LoggedIn() {
  const [data, setData] = useState({});
  const [id, setId] = useState("");

  useEffect(() => {
    facade.movieInfoSimple(id).then(res => setData(res));
  }, [id]);

  return (
    <Container>
      <h2>Movie Info</h2>
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
