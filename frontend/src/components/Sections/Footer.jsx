import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Footer() {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Column>
            <h2>Kapcsolat</h2>
            <ContactInfo>
              <ContactItem>
                <LocationOnIcon />
                <p>Nagydirkó utca 11</p>
                <p>4031, Debrecen</p>
              </ContactItem>
              <ContactItem>
                <PhoneIcon />
                <p>Telefon: 06 30 123 9876</p>
              </ContactItem>
              <ContactItem>
                <EmailIcon />
                <p>Email: carhouse@gmail.com</p>
              </ContactItem>
            </ContactInfo>
          </Column>
          <Column>
            <h2>Kovess minket</h2>
            <SocialMediaIcons>
              <IconButton>
                <FacebookIcon />
              </IconButton>
              <IconButton>
                <TwitterIcon />
              </IconButton>
              <IconButton>
                <InstagramIcon />
              </IconButton>
              <IconButton>
                <PinterestIcon />
              </IconButton>
              <IconButton>
                <LinkedInIcon />
              </IconButton>
            </SocialMediaIcons>
          </Column>
        </Row>
      </Container>
      <BottomBar>
        <p>&copy; 2023 carHouse. Minden jog fenntartva.</p>
      </BottomBar>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background-color: #333333;
  color: #ffffff;
  padding: 20px 0;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;

const Column = styled.div`
  flex: 1;

  &:first-of-type {
    margin-right: 40px;

    @media (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 40px;
    }
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  p {
    font-size: 1.2rem;
    margin-left: 10px;
    margin-bottom: 0;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  align-items: center;
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  p {
    font-size: 1.2rem;
    margin: 0;

    &:first-of-type {
      margin-right: 10px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;

    p {
      margin-bottom: 10px;
    }
  }
`;