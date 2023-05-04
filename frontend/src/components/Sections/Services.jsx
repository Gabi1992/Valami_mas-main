import React from "react";
import styled from "styled-components";
// Components
import ServiceBox from "../Elements/ServiceBox";
// Assets
import ServiceImg1 from "../../assets/img/services/breaks.png";
import ServiceImg2 from "../../assets/img/services/axle.png";
import ServiceImg3 from "../../assets/img/services/services.png";
import ServiceImg4 from "../../assets/img/services/filters.png";
import ServiceImg5 from "../../assets/img/services/mot.png";
import ServiceImg6 from "../../assets/img/services/exhaust.png";
import MOT from "../../assets/img/MOT.jpg";

export default function Services() {

  return (
    <Wrapper id="services">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Szolgáltatások</h1>
            <p className="font15">
            Szakembereink jártasak széles körű autószolgáltatások kezelésében. Legyen szó személygépkocsiról, közepes méretű teherautóról vagy terepjáróról, szerelőink mindent megtesznek annak érdekében, hogy járműve a lehető legjobban teljesítsen.
            </p>
          </HeaderInfo>
          <div className="row textCenter">
            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4">
              <ServiceBox
                id="breaks"
                img={ServiceImg1}
                name="FÉKJAVÍTÁS"
                text="Szakszerű és hatékony fékjavítást biztosítunk autószervizünkben."
              />
            </div>
            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4">
              <ServiceBox
                id="axle"
                img={ServiceImg2}
                name="FUTÓMŰ"
                text="A futómű javítása elengedhetetlen az autó biztonságos és kényelmes vezetése érdekében."
              />
            </div>
            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4">
              <ServiceBox
                id="services"
                img={ServiceImg3}
                name="SZERVÍZ"
                text="Az autó biztonságos és hosszú élettartamának érdekében fontos a vezérműszíj és a kuplung karbantartása, míg az állapotfelmérés, hibakód kiolvasás/törlés, fényszóró állítás és akkumulátor cseréje biztosítják az autó zavartalan működését."
              />
            </div>
            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4">
              <ServiceBox
                id="filters"
                img={ServiceImg4}
                name="SZŰRŐK"
                text="Az autókban levő szűrők rendszeres cseréje elengedhetetlen az autó motorjának hosszú élettartama és hatékony működése szempontjából."
              />
            </div>
            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4">
              <ServiceBox
                id="mot"
                img={ServiceImg5}
                name="MŰSZAKI VIZSGA"
                text="Az autók műszaki vizsgája Magyarországon a közlekedésbiztonságot és a járművek megfelelőségét ellenőrzi, amely nélkül a közlekedés tilos. A vizsga az állami hatóság által felügyelt vizsgaállomásokon történik, és tartalmazza a jármű műszaki állapotának és környezeti előírásainak megfelelőségét."
              />
            </div>
            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4">
              <ServiceBox
                id="exhaust"
                img={ServiceImg6}
                name="KIPUFOGÓ RENDSZER"
                text="Az autók kipufogó rendszerének szervizelése fontos a jármű hatékony működése és környezetvédelmi előírásoknak való megfelelése szempontjából."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lightBg">
        <div className="container">
          <Advertising className="flexSpaceCenter">
            <AddLeft>
              <AddLeftInner>
                <ImgWrapper className="flexCenter">
                  <img className="radius8" src={MOT} alt="add" />
                </ImgWrapper>
              </AddLeftInner>
            </AddLeft>
            <AddRight>
              <h4 className="font15 semiBold">carHouse egy állami hatóság által felügyelt vizsgaállomás</h4>
              <h2 className="font40 extraBold">A műszaki vizsga</h2>
              <p className="font13">
              Tartalmazza a jármű műszaki állapotának és környezeti előírásainak megfelelőségét. Magyarországon a közlekedésbiztonságot és a járművek megfelelőségét ellenőrzi, amely nélkül a közlekedés tilos.
              </p>
            </AddRight>
          </Advertising>
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
  padding: 200px 0;
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
