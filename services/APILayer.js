import React from 'react';
import axios from 'axios';

const ACCESS_TOKEN = '3194105207295251';
const URL = `https://superheroapi.com/api/${ACCESS_TOKEN}`;
const SUPERHERO_URL = 'http://www.superheroes-idb.tk/characters/';

// Create axios client, pre-configured with our URLs
let APILayer = axios.create({
  timeout: 10000,
});

// Define our API call methods
export const getCharacters = async name => {
  console.log('Get Superhero character list', URL);
  var result = [];
  try {
    const response = await APILayer.get(URL + `/search/${name}`);
    if ('error' in response.data) {
      result = [];
    } else {
      console.log('Get Superhero character list', response.data.results[0]);
      result = response.data.results;
    }
  } catch (err) {
    console.log('ERRRR', err);
    result = err;
  }
  return result;
};

export default APILayer;
