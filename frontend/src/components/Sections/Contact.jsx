import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { API_URL } from "../../constant/apiConstant";
import { useMediaQuery, FormControl, InputLabel, TextField, MenuItem, Checkbox, ListSubheader, Button } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimeField } from '@mui/x-date-pickers';
import FormHelperText from '@mui/material/FormHelperText';

export default function Contact() {

  //Services dropdown and storage
  const [options, setOptions] = useState([]);
  const [selectedServiceOptions, setSelectedServiceOptions] = useState([]);
  const [selectedServiceOptionIds, setSelectedServiceOptionIds] = useState([]);
  const isSmallScreen = useMediaQuery('(max-width:960px)');

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

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

  useEffect(() => {
    // Calculate total price and time whenever the selected menu items change
    let newTotalPrice = 0;
    let newTotalTime = 0;
    selectedServiceOptions.forEach((optionId) => {
      const option = options.find((option) => option.id === optionId);
      newTotalPrice += option.ara;
      newTotalTime += option.ido;
    });
    setTotalPrice(newTotalPrice);
    setTotalTime(newTotalTime);
  }, [selectedServiceOptions, options]);

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

  const showHelperText = selectedServiceOptionIds.length > 0;


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

  //Variables to be POSTed
  const [name, setName] = useState([ ])
  const [email, setEmail] = useState([ ])
  const [phone, setPhone] = useState([ ])
  const [orderDate, setOrderDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [orderTime, setOrderTime] = useState(dayjs())
  const [vehicleYear, setVehicleYear] = useState('');


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
        window.alert('Sikeres megrendelés!');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <div className="whiteBg">
        <Container maxWidth="lg">
          <HeaderInfo>
            <h1 className="font40 extraBold">Foglaljon időpontot</h1>
            <p className="font13">
            </p>
          </HeaderInfo>
          <div className="row" style={{}}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <FormControl fullWidth sx={{
                    mb: 2
                  }} >
                <TextField required id="name" label="Név" onChange={(event) => {setName(event.target.value)}} variant="standard" sx={{mb: 2}} ></TextField>
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
                  label="Telefonszám"
                  value={phone}
                  defaultValue={""}
                  onChange={handlePhoneChange}
                  helperText={"Például: 06301231234"}
                  sx={{ mb: 2 }}
                  variant="standard"
                  required
                />
                <FormControl sx={{
                    mb: 2,
                  }} >
                  <InputLabel>Válassz szolgáltatást</InputLabel>
                  <Select
                    id="selectOption"
                    label="Válassz szolgáltatást"
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
                  <FormHelperText>{showHelperText ? `Összesen: ${totalPrice} HUF*, Időtartam ${totalTime} perc*` : null}</FormHelperText>
                  <Button variant="contained" size="small" onClick={handleClearSelection}>Törlés</Button>
                </FormControl>
                <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel id="vehicleMake">Autó márkája</InputLabel>
                  <Select
                    id="vehicleMake"
                    label="Autó márkája"
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
                  <FormControl fullWidth sx={{mt: 2}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Autó évjárata"
                      views={['year']}
                      value={dayjs()}
                      onChange={(newValue) => {
                        setVehicleYear(newValue);
                      }}
                      inputFormat="yyyy"
                      maxDate={dayjs()}
                    />
                  </LocalizationProvider>
                  </FormControl>
                </FormControl>
              </FormControl>
            </div>
            <CalendarBox>
            {isSmallScreen ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimeField
                label="Preferált dátum és idő"
                minutesStep={20}
                sx={{ 
                  margin: 2,
                  mt: 1
                }}
                value={dayjs(`${orderDate} ${orderTime}`, 'YYYY/MM/DD hh:mm')}
                onChange={(newOrderDateTime) => {
                  setOrderDate(newOrderDateTime.format('YYYY/MM/DD'));
                  setOrderTime(newOrderDateTime.format('HH:mm'));
                }}
                inputFormat="YYYY/MM/DD HH:mm"
                renderInput={(params) => <TextField {...params} />}
              />
              </LocalizationProvider>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker
                  id="date-time"
                  label="Preferált dátum és idő"
                  format="YYYY/MM/DD HH:mm"
                  orientation="landscape"
                  minutesStep={20}
                  minDate={dayjs()}
                  maxTime={eightPM}
                  minTime={eightAM}
                  defaultValue={dayjs()}
                  shouldDisableDate={isWeekend}
                  displayPast={false}
                  value={dayjs(`${orderDate} ${orderTime}`, 'YYYY/MM/DD hh:mm')}
                  onChange={(newOrderDateTime) => {
                    setOrderDate(newOrderDateTime.format('YYYY/MM/DD'));
                    setOrderTime(newOrderDateTime.format('HH:mm'));
                  }}
                  hideTabs={true}
                />
              </LocalizationProvider>
            )}
          </CalendarBox>
          </div>
          <SumbitWrapper className="flex" style={{paddingBottom:"30px"}}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                sendOrder();
              }}
              style={{ maxWidth: "220px" }}
            >
              Foglalas
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

const CalendarBox = styled.div`
  margin: 0 0 20px 40px;
  
  @media (max-width: 960px) {
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;



