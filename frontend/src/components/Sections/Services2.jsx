import React, { useState, useEffect } from "react";
import styled from "styled-components";
// Components
import ServiceBox from "../Elements/ServiceBox";
// Assets
import ServiceImg1 from "../../assets/img/services/axle.png";
import ServiceImg2 from "../../assets/img/services/breaks.png";
import ServiceImg3 from "../../assets/img/services/tires.png";
import { API_URL } from "../../constant/apiConstant";

export default function Services() {

  const [services, setServices] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "api/szolgaltatasok/");
        const data = await response.json();
        const servicesObj = {};
        for (const service of data) {
          if (!servicesObj[service.kategoria]) {
            servicesObj[service.kategoria] = [service];
          } else {
            servicesObj[service.kategoria].push(service);
          }
        }
        setServices(servicesObj);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getServiceImage = (kategoria) => {
    switch(kategoria) {
      case 'FÉKJAVÍTÁS':
        return ServiceImg2;
      case 'FUTÓMŰ':
        return ServiceImg1;
      case 'Tires':
        return ServiceImg3;
      default:
        return ServiceImg1;
    }
  }

  return (
    <Wrapper id="services">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Services</h1>
            <p className="font13">
              Our professionals know how to handle a wide range of car services. Whether you drive a passenger car or medium sized truck or SUV, our mechanics strive to ensure that your vehicle will be performing at its best.
            </p>
          </HeaderInfo>
          <div className="row textCenter">
            {Object.keys(services).map((kategoria, index) => (
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4" key={index}>
                <ServiceBox
                  id={services[kategoria][0].id}
                  img={getServiceImage(kategoria)}
                  name={kategoria}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  padding: 100px 0;
  margin: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 60px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;
const AddLeft = styled.div`
  position: relative;
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
  }
`;
const AddLeftInner = styled.div`
  width: 100%;
  position: absolute;
  top: -300px;
  left: 0;
  @media (max-width: 1190px) {
    top: -250px;
  }
  @media (max-width: 920px) {
    top: -200px;
  }
  @media (max-width: 860px) {
    order: 1;
    position: relative;
    top: -60px;
    left: 0;
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  padding: 0 15%;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 400px) {
    padding: 0;
  }
`;