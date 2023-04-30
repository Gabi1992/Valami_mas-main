import React from "react";
import styled from "styled-components";

export default function PricingTable({ priceFrom, categoryTitle, categoryDescription, offers, action }) {

  return (
    <Table>
      <thead>
        <TableRow>
          <TableHeader colSpan="3">
            <div className="flexSpaceCenter">
              <h4 className="font20 bold">{categoryTitle}</h4>
              <p className="font20 bold">{priceFrom}</p>
            </div>
          </TableHeader>
        </TableRow>
        <TableRow>
          <TableHeader>Szerviz tipusa</TableHeader>
          <TableHeader>Ara</TableHeader>
          <TableHeader>Ido (perc)</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {offers ? offers.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCellTime>{item.time}</TableCellTime>
          </TableRow>
        )) : null}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const TableHeader = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: bold;
  color: #444;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 16px;
  text-align: left;
  color: #444;
  border-bottom: 1px solid #ddd;
`; 

const TableCellTime = styled.td`
  padding: 16px;
  text-align: center;
  color: #444;
  border-bottom: 1px solid #ddd;
`; 