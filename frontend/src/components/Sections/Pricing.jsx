import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PricingTable from "../Elements/PricingTable";
import { API_URL } from "../../constant/apiConstant";

export default function Pricing() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "api/szolgaltatasok/");
        const data = await response.json();

        // Group services by category
        const groupedServices = {};
        data.forEach((service) => {
          if (!groupedServices[service.kategoria]) {
            groupedServices[service.kategoria] = [];
          }
          groupedServices[service.kategoria].push(service);
        });

        // Sort categories by number of services
        const sortedCategories = Object.keys(groupedServices).sort((a, b) => {
          return groupedServices[b].length - groupedServices[a].length;
        });

        // Convert grouped services to pricing tables
        const pricingTables = sortedCategories.map((category) => {
          const services = groupedServices[category];
          let lowestPrice = services[0].ara;
          services.forEach((service) => {
            if (service.ara < lowestPrice) {
              lowestPrice = service.ara;
            }
          });
          const tableData = {
            priceFrom: lowestPrice + " Ft-tol",
            categoryTitle: category,
            offers: services.map((service) => ({ name: service.neve, price: service.ara + "Ft", time: service.ido})),
          };
          return (
            <TableBox key={category}>
              <PricingTable {...tableData} />
            </TableBox>
          );
        });

        setCategories(pricingTables);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Wrapper id="pricing">
        <Header>
          <h1>Tekintse át árainkat</h1>
          <p>Válasszon széleskörű, megfizethető szolgáltatásainkból.</p>
        </Header>
        <TablesWrapper>{categories}</TablesWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding: 50px 0;
  background-color: #f8f8f8;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  h1 {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 16px;
    text-align: center;
    color: #1a1a1a;
  }
  p {
    font-size: 20px;
    text-align: center;
    color: #5f5f5f;
  }
`;

const TablesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const TableBox = styled.div`
  width: calc(33% - 16px);
  margin-bottom: 32px;
  @media (max-width: 1024px) {
    width: calc(50% - 16px);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;