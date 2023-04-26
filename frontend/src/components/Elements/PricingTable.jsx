import React, {useState, useEffect} from "react";
import styled from "styled-components";

// Assets
import AxleIcon from "../../assets/svg/Services/AxleIcon";
import BreakIcon from "../../assets/svg/Services/BreakIcon";
import WheelIcon from "../../assets/svg/Services/WheelIcon";

import { API_URL } from '../../constant/apiConstant';

export default function PricingTable({ icon, priceFrom, category, text, action }) {
  let getIcon;

  switch (icon) {
    case "axle":
      getIcon = <AxleIcon />;
      break;
    case "break":
      getIcon = <BreakIcon />;
      break;
    case "wheel":
      getIcon = <WheelIcon />;
      break;
    default:
      getIcon = "";
      break;
  }

  const [services, setServices] = useState([ ])

  useEffect(() => {
    fetch(API_URL+"szolgaltatasok/")
    .then(res => res.json())
    .then(data => {
      setServices(data)
      console.log(data)
    })
  }, [ ])

  const categories = []
  const categoriesOther = []
  const categoriesBreaks = []
  const categoriesFilter = []
  const categoriesExhaust = []
  const categoriesAxle = []
  const categoriesServices = []
  const categoriesMOT = []

  for (let index = 0; index < services.length; index++) {
    const kategoria = services[index].kategoria;
    if (!categories.includes(kategoria)) {
      categories.push(kategoria);
    }
  }

  category = ""
  for (let index = 0; index < categories.length; index++) {
    category = categories[index]
  }

  console.log(categories)

    for (let index = 0; index < services.length; index++) {
      const kategoria = services[index].kategoria;
      if (!categories.includes(kategoria)) {
        categories.push(kategoria);
      }
    }

  return (
    <Wrapper className="whiteBg radius8 shadow">
      <div className="flexSpaceCenter">
        {getIcon}
        <p style={{ fontVariant: "all-small-caps" }} className="font30 extraBold">{priceFrom}</p>
      </div>
        <div style={{ margin: "30px 0" }}>
          <h4 style={{ fontVariant: "all-small-caps" }} className="font30 extraBold">{category}</h4>
        </div>
      <div>
        {services
          ? services.map((item, index) => (
            <div>
              {item.neve}
              {item.ara}
              {item.ido}
            </div>
            ))
          : null}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  text-align: left;
  padding: 20px 30px;
  margin-top: 30px;
`;
