[![Test](https://img.shields.io/npm/v/react-easy-edit.svg?style=flat)](https://www.npmjs.com/package/react-easy-edit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


# react-easy-edit
A simple react library for input inline editing

## Features
- Supports most of the HTML5 input components
- Highly customisable!

## Props
| Prop              | Type                      | Required | Default         | Description                                                                                                                                                                                   |
|-------------------|---------------------------|----------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type              | string                    | Yes      |                 | The type of the input element to display. Supported types are `text`, `number`, `color`, `textarea`, `date`, `datetime-local`,`time`, `month`, `week`, `radio`, `checkbox`, `select` |
| value             | string or number or array | No       | null            | The value of the input element depended on its type                                                                                                                                           |
| options           | array                     | No       |                 | A key value pair object that is used as available options for select, radio and checkbox.``` options = [{label:'Test One', value: '1'},{label:'Test Two', value: '2'}]; ```                  |
| saveButtonLabel   | string                    | No       | Save            | The label to be used for the "Save" button                                                                                                                                                    |
| saveButtonStyle   | string                    | No       | easy-edit-button | One or more CSS classes to be used to style the "Save" button                                                                                                                                 |
| cancelButtonLabel | string                    | No       | Cancel          | The label to be used for the "Cancel" button                                                                                                                                                  |
| cancelButtonStyle | string                    | No       | easy-edit-button | One or more CSS classes to be used to style the "Cancel" button                                                                                                                               |
| placeholder       | string                    | No       | Click to edit   | The text to be shown as a hint that describes the expected value of the input element                                                                                                         |
| onCancel          | function                  | No       | () => {}        | A function that will be called when editing is cancelled                                                                                                                                      |
| onSave            | function                  | Yes      |                 | A function that will be called when editing is saved                                                                                                                                          |
| name              | string                    | Yes      |                 |                                                                                                                                                                                               |
| min               | string or number          | No       |                 |                                                                                                                                                                                               |
| max               | string or number          | No       |                 |                                                                                                                                                                                               |

## Installation
```npm i react-easy-edit```

## Usage
A simple example
```
import React, { Component } from 'react';
import EasyEdit from 'react-easy-edit';

class App extends Component {
  render() {
    return (
        <EasyEdit
          type="text"
          value="My test field"
          onSave={()=>{}}
          name="test"
        />
    );
  }
}

export default App;
```
## Licence
react-easy-edit is an open source library licensed as MIT.
