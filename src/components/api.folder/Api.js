import React, { useState } from 'react';
import { Input, Button } from 'antd';




const FormComponent = () => {
    const [name, setName] = useState('');
    const [years, setYears] = useState('');
    const [shortAnswer, setShortAnswer] = useState('');
    const [fullAnswer, setFullAnswer] = useState('');
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleYearsChange = (e) => {
      setYears(e.target.value);
    };
  
    const handleShortAnswerChange = (e) => {
      setShortAnswer(e.target.value);
    };
  
    const handleFullAnswerChange = (e) => {
      setFullAnswer(e.target.value);
    };
  
    const handleSearch = () => {
      // Handle search button click
      // Perform necessary actions with the form data
      console.log('Search button clicked');
    };
  
    const handleReset = () => {
      // Handle reset button click
      // Reset the form fields
      setName('');
      setYears('');
      setShortAnswer('');
      setFullAnswer('');
    };
  
    return (
      <div>
        <Input placeholder="Name" value={name} onChange={handleNameChange} />
        <Input placeholder="Number of Years" value={years} onChange={handleYearsChange} />
        <Input placeholder="Short Answer" value={shortAnswer} onChange={handleShortAnswerChange} />
        <Input placeholder="Full Answer" value={fullAnswer} onChange={handleFullAnswerChange} />
        <Button type="primary" onClick={handleSearch}>
          جستجو
        </Button>
        <Button onClick={handleReset}>
          راه‌اندازی مجدد
        </Button>
      </div>
    );
  };