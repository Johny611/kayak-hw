import React, { useState } from "react";
import styled from "styled-components";
import "./Airlines.css";

export default function List(props) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Lists key={props.index}>
      <ItemWrapper
        className="wrapper"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <ItemLogo>
          <Logo src={`https://kayak.com${props.logoURL}`} />
        </ItemLogo>
        <AirInfo>
          <h3 className={`${isHovering ? "small" : "bigger"}`}>{props.name}</h3>
          <Hoverable className={`${isHovering ? "small-light" : "hidden"}`}>
            <p>{props.alliance}</p>
            <p>{props.phone}</p>
            <p className="light-font">{props.site}</p>
          </Hoverable>
        </AirInfo>
      </ItemWrapper>
    </Lists>
  );
}

const AirInfo = styled.div`
  & h3 {
    font-weight: bold;
  }
  & .bigger {
    font-size: 16px;
  }
  & .small {
    font-size: 14px;
  }
  & .small-light {
    font-size: 14px;
    font-weight: normal;
  }
`;

const Hoverable = styled.div`
  & .hidden {
    display: hidden;
  }
  & .light-font {
    word-break: break-word;
    width: 130px;
  }
`;

const Lists = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
  width: 300px;
  margin: 16px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: 1px solid #363f45;
  &:hover {
    scale: 0.5;
  }
`;

const ItemLogo = styled.div`
  margin-right: 15px;
`;

const Logo = styled.img`
  height: 50px;
  width: 50px;
`;
