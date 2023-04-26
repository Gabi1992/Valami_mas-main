import React, { useState, useEffect } from 'react';
import { API_URL } from "../../constant/apiConstant";
import { FormControl, InputLabel, Select, MenuItem, Checkbox } from "@mui/material";


const SelectComponent = () => {
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL+"szolgaltatasok/");
        const { kategoria, neve } = await response.json();
        setCategories(kategoria);
        setOptions(neve);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleOptionToggle = (option) => {
    const currentIndex = selectedOptions.indexOf(option.id);
    const newSelectedOptions = [...selectedOptions];

    if (currentIndex === -1) {
      newSelectedOptions.push(option.id);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }

    setSelectedOptions(newSelectedOptions);
  };

  return (
    <FormControl>
      <InputLabel>Select Options</InputLabel>
      <Select
        multiple
        value={selectedOptions}
        onChange={(e) => setSelectedOptions(e.target.value)}
        renderValue={(selected) =>
          selected
            .map((optionId) =>
              options.find((option) => option.id === optionId).label
            )
            .join(', ')
        }
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value="" disabled>
            <Checkbox disabled />
            <span>{category.name}</span>
          </MenuItem>
        ))}
        {categories.map((category) =>
          options
            .filter((option) => option.category_id === category.id)
            .map((option) => (
              <MenuItem key={option.id} value={option.id}>
                <Checkbox
                  checked={selectedOptions.indexOf(option.id) !== -1}
                  onChange={() => handleOptionToggle(option)}
                />
                <span>{option.label}</span>
              </MenuItem>
            ))
        )}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;