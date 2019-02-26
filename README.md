[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


# react-easy-edit
A simple react library for input inline editing

## Features
- Supports all HTML5 input components
- Highly customisable!

## Installation
```npm i react-easy-edit```

## Usage
A simple example
```
import React, { Component } from 'react';
import Editable from 'react-easy-edit';

class App extends Component {
  render() {
    return (
        <Editable
          type="text"
          value="Text fieadsld"
          onSave={()=>{}}
          name="ads"
        />
    );
  }
}

export default App;
```
