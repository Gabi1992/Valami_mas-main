import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

import dayjs from 'dayjs';
import { API_URL } from "../../constant/apiConstant";
import { FormControl, Input, InputLabel, TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import ServicesSelect from "../Elements/ServicesSelect";

export default function Contact() {

  const isWeekend = (date) => {
    const day = date.day();
  
    return day === 0 || day === 6;
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }


  //Variables to be POSTed
  const [currentYear, setCurrentYear] = React.useState(getCurrentYear);
  const [selectedDate, setSelectedDate] = useState([ ]);
  const [name, setName] = useState([ ])
  const [email, setEmail] = useState([ ])
  const [phone, setPhone] = useState([ ])
  const [service, setService] = useState([ ])
  const [vehicleYear, setVehicleYear] = useState([ ])
  const [vehicleMake, setVehicleMake] = useState([ ])
  const [orderDate, setOrderDate] = useState([ ])
  const [orderTime, setOrderTime] = useState(dayjs())

  const handleSliderChange = (event, newValue) => {
    setCurrentYear(newValue);
  };


//Sending order function
function sendOrder() { 
  let data = {
    "nev": name,
    "telefonszam": phone,
    "email": email,
    "auto": 2,
    "szolgaltatas": [1, 2]
    }
  
  fetch(API_URL+"createmegrendelok/",{
    method: 'POST',
    headers: {
              'Content-Type': "application/json",
    },
    body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error =>{
        console.log(error)
        })
}

//Function for hour and minute to be visible only
function HourAndMinute(time) {
  time = dayjs()
  return (`${time.hour()}:${time.minute()}`);
}

console.log(HourAndMinute(orderTime))


const [services, setServices] = useState([ ])

useEffect(() => {
  fetch(API_URL+"szolgaltatasok/")
  .then(res => res.json())
  .then(data => {
    setServices(data)
    console.log(data)
  })
}, [ ])



const serviceOptions = [

]

  return (
    <Wrapper id="contact">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Book an appointment</h1>
            <p className="font13">
            </p>
          </HeaderInfo>
          <div className="row" style={{ paddingBottom: "30px" }}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <FormControl fullWidth sx={{
                    mb: 2
                  }} >
                <TextField id="name" label="Name" onChange={(event) => {setName(event.target.value)}} variant="standard" sx={{mb: 2}} ></TextField>
                <TextField id="email" type={"email"}  label="Email" onChange={(event) => {setEmail(event.target.value)}} sx={{mb: 2}} variant="standard" />
                <TextField id="phone" type={"phone"} label="Phone" onChange={(event) => {setPhone(event.target.value)}} sx={{mb: 2}} variant="standard" />
                <ServicesSelect />
                <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel id="demo-simple-select-label">Vehicle make</InputLabel>
                <Select 
                  id="vehicleMake"
                  label="Vehicle make"
                  value={vehicleMake}
                  size="10px"
                  onChange={(event) => {setVehicleMake(event.target.value)}}
                  >
                </Select>
                </FormControl>
                <Input 
                  id="vehicleYear" 
                  value={currentYear}
                  label="Vehicle year"
                  disabled
                  size="small"
                  variant="filled"
                  inputProps={{
                    step: 1,
                    min: 1950,
                    max: 2023,
                    }
                  }
                  onChange={(event) => {setVehicleYear(event.target.value)}}
                />
                <Slider
                  value={typeof currentYear === 'number' ? currentYear : 0}
                  onChange={handleSliderChange}       
                  size="small"
                  label="kkk"
                  defaultValue={2023}
                  marks
                  min={1950}
                  max={2023}
                  >
              </Slider>
              </FormControl>
                <FormControl sx={{mb: 2}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      id="date"
                      label="Prefarrable date"
                      format={'YYYY/MM/DD'}
                      minDate={dayjs()}
                      defaultValue={dayjs()}
                      shouldDisableDate={isWeekend}
                      displayPast={false}
                      value={orderDate}
                      onChange={(newOrderDate) => setOrderDate(newOrderDate)}
                    />
                  </LocalizationProvider>
                </FormControl>
                <FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      id="time"
                      label="Prefarrable time"
                      format="HH:MM"
                      value={orderTime}
                      onChange={(newOrderTime) => setOrderTime(newOrderTime)}
                      sx={{ml: 2}}
                      minutesStep={15}
                    />
                  </LocalizationProvider>
                  </FormControl>
              <SumbitWrapper className="flex">
                <ButtonInput type="submit" value="Book appointment" className="pointer animate radius8" onClick={() => {sendOrder()}} style={{ maxWidth: "220px" }} />
              </SumbitWrapper>
            </div>
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
  padding: 70px 0 30px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const From = styled.form`
  padding: 70px 0 30px 0;
  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }
  @media (max-width: 860px) {
    padding: 30px 0;
  }
`;
const ButtonInput = styled.input`
  border: 1px solid #7620ff;
  background-color: #7620ff;
  width: 100%;
  padding: 15px;
  outline: none;
  color: #fff;
  :hover {
    background-color: #580cd2;
    border: 1px solid #7620ff;
    color: #fff;
  }
  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;
const CalendarBox = styled.div`
    align-self: right;
`;
const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;



