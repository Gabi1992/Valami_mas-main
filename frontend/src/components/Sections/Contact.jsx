import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from '@mui/material/Select';
import Slider, { SliderMarkLabel } from '@mui/material/Slider';
import dayjs from 'dayjs';
import { API_URL } from "../../constant/apiConstant";
import { FormControl, Input, InputLabel, TextField, MenuItem, Checkbox, ListSubheader, Button } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import Container from '@mui/material/Container';

export default function Contact() {

  //Services dropdown and storage
  const [options, setOptions] = useState([]);
  const [selectedServiceOptions, setSelectedServiceOptions] = useState([]);
  const [selectedServiceOptionIds, setSelectedServiceOptionIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL+"api/szolgaltatasok/");
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleServiceOptionToggle = (option) => {
    const currentIndex = selectedServiceOptions.indexOf(option.id);
    const newSelectedServiceOptions = [...selectedServiceOptions];
    const newSelectedServiceOptionIds = [...selectedServiceOptionIds];

    if (currentIndex === -1) {
      newSelectedServiceOptions.push(option.id);
      newSelectedServiceOptionIds.push(option.id);
    } else {
      newSelectedServiceOptions.splice(currentIndex, 1);
      newSelectedServiceOptionIds.splice(currentIndex, 1);
    }

    setSelectedServiceOptions(newSelectedServiceOptions);
    setSelectedServiceOptionIds(newSelectedServiceOptionIds);
  };

  const categoryOptions = options.reduce((acc, option) => {
    if (!acc[option.kategoria]) {
      acc[option.kategoria] = [];
    }
    acc[option.kategoria].push(option);
    return acc;
  }, {});

  const menuItems = Object.keys(categoryOptions).map((category) => ([
    <ListSubheader key={category}>{category}</ListSubheader>,
    ...categoryOptions[category].map((option) => (
      <MenuItem key={option.id} value={option.id} data-id={option.id}>
        <Checkbox
          checked={selectedServiceOptions.indexOf(option.id) !== -1}
          onChange={() => handleServiceOptionToggle(option)}
        />
        <span>{option.neve}</span>
      </MenuItem>
    ))
  ]));

  //Cars dropdown and storage
  const [data, setData] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL+"api/autok/");
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  const handleCarOptionChange = (event) => {
    setSelectedCarId(event.target.value);
  };

  // Weekend validation
  const isWeekend = (date) => {
    const day = date.day();
  
    return day === 0 || day === 6;
  };

  const handleClearSelection = () => {
    setSelectedServiceOptions([]);
    setSelectedServiceOptionIds([]);
  }

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }


  //Variables to be POSTed
  const [currentYear, setCurrentYear] = React.useState(getCurrentYear);
  const [name, setName] = useState([ ])
  const [email, setEmail] = useState([ ])
  const [phone, setPhone] = useState([ ])
  const [orderDate, setOrderDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [orderTime, setOrderTime] = useState(dayjs())

  const handleSliderChange = (event, newValue) => {
    setCurrentYear(newValue);
  };

//Sending order function
/* function sendOrder() { 
  let data = {
    "nev": name,
    "telefonszam": phone,
    "email": email,
    "auto": selectedCarId,
    "szolgaltatas": selectedServiceOptionIds,
    "datum": orderDate,
    }
  
  fetch(API_URL+"api/createmegrendelok/",{
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
} */


const sendOrder = async () => {
  try {
    const response = await fetch(API_URL+"api/createmegrendelok/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "nev": name,
        "telefonszam": phone,
        "email": email,
        "auto": selectedCarId,
        "szolgaltatas": selectedServiceOptionIds,
        "datum": orderDate,
      }),
    });

    if (response.ok) {
      window.alert('Your order has been successfully submitted!'); // added confirmation message
    }
  } catch (error) {
    console.error(error);
  }
};

  //Function for hour and minute to be visible only
  function HourAndMinute(time) {
    time = dayjs()
    return (`${time.hour()}:${time.minute()}`);
  }

  //Validations
  const [error, setError] = useState(false);

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setError(!isValidEmail(value));
  };

  const isValidEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const isHungarianPhoneNumber = (phoneNumber) => {
    const hungarianPhoneRegex = /^(?:\+36|06)(?:(?:20|30|31|50|70)(?:\s|-)?\d{3}(?:\s|-)?\d{4})$/;
    return hungarianPhoneRegex.test(phoneNumber);
  };

  const handlePhoneChange = (event) => {
    const input = event.target.value;
    if (isHungarianPhoneNumber(input)) {
      setPhone(input);
    } else if (input === "" || /^\d+$/.test(input)) {
      // Allow empty string and only digits
      setPhone(input);
    }
  };

  const eightAM = dayjs().set('hour', 8).startOf('hour');
  const eightPM = dayjs().set('hour', 20).startOf('hour');

  return (
    <Wrapper id="contact">
      <div className="lightBg">
        <Container maxWidth="lg">
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
                <TextField required id="name" label="Name" onChange={(event) => {setName(event.target.value)}} variant="standard" sx={{mb: 2}} ></TextField>
                <TextField
                  id="email"
                  type="email"
                  label="Email"
                  value={email}
                  onChange={handleEmailChange}
                  inputMode="email"
                  error={error}
                  helperText={error ? 'Please enter a valid email' : ''}
                  sx={{ mb: 2 }}
                  variant="standard"
                  required
                />
                <TextField
                  id="phone"
                  type="tel"
                  label="Phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  error={!isHungarianPhoneNumber(phone)}
                  helperText={
                    !isHungarianPhoneNumber(phone) && "Please enter a valid Hungarian phone number"
                  }
                  sx={{ mb: 2 }}
                  variant="standard"
                  required
                />
                <FormControl sx={{
                    mb: 2,
                  }} >
                  <InputLabel>Select Options</InputLabel>
                  <Select
                    id="selectOption"
                    label="Select Options"
                    multiple
                    required
                    value={selectedServiceOptionIds}
                    onChange={(e) => setSelectedServiceOptionIds(e.target.value)}
                    renderValue={(selected) =>
                      selected
                        .map((optionId) =>
                          options.find((option) => option.id === optionId).neve
                        )
                        .join(', ')
                    }
                  >
                    {menuItems}
                  </Select>
                  <Button variant="contained" onClick={handleClearSelection}>Clear</Button>
                </FormControl>
                <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel id="vehicleMake">Vehicle make</InputLabel>
                  <Select
                    id="vehicleMake"
                    label="Vehicle make"
                    required
                    value={selectedCarId}
                    onChange={handleCarOptionChange}
                  >
                    {data.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.marka}
                      </MenuItem>
                    ))}
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
                  //onChange={(event) => {setVehicleYear(event.target.value)}}
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
            </div>
            <CalendarBox fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker
                  id="date-time"
                  label="Preferred date and time"
                  format="YYYY/MM/DD HH:mm"
                  orientation="landscape"
                  step={30}
                  minDate={dayjs()}
                  maxTime={eightPM}
                  minTime={eightAM}
                  defaultValue={dayjs()}
                  shouldDisableDate={isWeekend}
                  displayPast={false}
                  value={dayjs(`${orderDate} ${orderTime}`, 'YYYY/MM/DD hh:mm')}
                  onAccept={(newOrderDateTime) => {
                    setOrderDate(newOrderDateTime.format('YYYY/MM/DD'));
                    setOrderTime(newOrderDateTime.format('HH:mm'));
                  }}
                  />
              </LocalizationProvider>
            </CalendarBox>
          </div>
          <SumbitWrapper className="flex">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                sendOrder();
              }}
              style={{ maxWidth: "220px" }}
            >
              Book appointment
            </Button>
          </SumbitWrapper>
        </Container>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;

const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
  text-align: center;
`;

const SumbitWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ButtonInput = styled(Button)`
  background-color: #7620ff;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  max-width: 220px;
  padding: 12px 16px;

  &:hover {
    background-color: #9a61ff;
  }
`;

const CalendarBox = styled.div`
  margin-left: 40px;

  @media (max-width: 960px) {
    margin: 0;
    margin-top: 20px;
  }
`;



