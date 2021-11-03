import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fetchJsonp from "fetch-jsonp";
import List from "./List";

export default function Airlines() {
  const [list, setList] = useState([]);
  const [alliances, setAlliances] = useState({
    OW: false,
    ST: false,
    SA: false,
  });

  const url =
    "https://www.kayak.com/h/mobileapis/directory/airlines/homework?format=json?callback=JSONP";

  useEffect(() => {
    const JSONP = async () => {
      await fetchJsonp(url, {
        jsonpCallback: "jsonp",
        jsonpCallbackFunction: "invalidCallbackFunctionName",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          setList(Object.values(json));
        })
        .catch(function (ex) {
          console.log(ex);
        });
    };
    JSONP();
  }, []);

  const handleCheckbox = (event) => {
    setAlliances((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  };

  useEffect(() => {
    renderItems();
  }, [alliances]);

  function renderItems() {
    let hasNoFilters = Object.keys(alliances).every(
      (value) => alliances[value] === false
    );

    if (hasNoFilters) {
      return list.map((item, index) => {
        return (
          <List
            key={index}
            logoURL={item.logoURL}
            name={item.name}
            alliance={item.alliance}
            phone={item.phone}
            site={item.site}
          />
        );
      });
    } else {
      let filters = Object.keys(alliances).filter(
        (itemID) => alliances[itemID] === true
      );
      return list.map((item, index) => {
        let validItem = filters.find((alliance) => alliance === item.alliance);
        if (validItem)
          return (
            <List
              key={index}
              logoURL={item.logoURL}
              name={item.name}
              alliance={item.alliance}
              phone={item.phone}
              site={item.site}
            />
          );
      });
    }
  }

  return (
    <Container>
      <div style={{ width: "100%" }}>
        <Title>Airlines</Title>
        <Filter>
          <h3>Filter by Alliances</h3>
          <Checkboxes>
            <Label>
              <Input
                name="OW"
                type="checkbox"
                onChange={handleCheckbox}
                checked={alliances.OW}
              />
              Oneworld
            </Label>
            <Label>
              <Input
                name="ST"
                type="checkbox"
                onChange={handleCheckbox}
                checked={alliances.ST}
              />
              Sky Team
            </Label>
            <Label>
              <Input
                name="SA"
                type="checkbox"
                onChange={handleCheckbox}
                checked={alliances.SA}
              />
              Star Alliance
            </Label>
          </Checkboxes>
        </Filter>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {renderItems()}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 67px 0 73px 94px;
  font-size: 44px;
  font-weight: 900;
  color: #000;
`;

const Filter = styled.div`
  margin-left: 94px;
  & h3 {
    font-size: 16px;
    font-weight: bold;
    color: #192024;
  }
`;

const Checkboxes = styled.div`
  margin: 23px 0 56px 0;
`;

const Input = styled.input`
  margin-right: 10px;
`;

const Label = styled.label`
  margin-right: 24px;
  font-size: 14px;
  font-weight: normal;
  color: #192024;
`;
