import React from "react";
import { Link } from "react-scroll";
import styled from "styled-components";

export default function ServiceBox({ img, name, text, action}) {
  return (
    <Wrapper>
      <Link to="pricing" smooth={true}>
        <ImgBtn className="aniamte pointer" onClick={action ? () => action() : null}>
          <img className="radius8" src={img} alt="project"></img>
        </ImgBtn>
      </Link>
      <h3 className="font30 extraBold" style={{ fontVariant: "all-small-caps" }}>{name}</h3>
      <p className="font14">{text}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  img {
    width: 100%;
    height: auto;
    margin: 20px 0;
  }
  h3 {
    padding-bottom: 10px;
  }
`;
const ImgBtn = styled.button`
  background-color: transparent;
  border: 0px;
  outline: none;
  padding: 0px;
  margin: 0px;
  :hover > img {
    opacity: 0.5;
  }
`;