[![Test](https://img.shields.io/npm/v/react-easy-edit.svg?style=flat)](https://www.npmjs.com/package/react-easy-edit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CircleCI](https://circleci.com/gh/giorgosart/react-easy-edit.svg?style=shield)](https://circleci.com/gh/giorgosart/react-easy-edit)

[](https://i.imgur.com/vwqcqeD.gif)

# react-easy-edit
A React library that allows inline editing on HTML5 input components.

- If you would like to see what the next release looks like, visit our [Dev 0.4.0](https://github.com/giorgosart/react-easy-edit/projects/11) project

## Features
- Supports `input` (most of the types, even `color`), `textarea`,`radio`, `checkbox` and `select`
- Validates user input
- Allows customisation on all elements including the save and cancel buttons

## Props
| Prop              | Type                      | Required | Default         | Description                                                                                                                                                                                   |
|-------------------|---------------------------|----------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type              | string                    | Yes      |                 | The type of the input element to display. Supported types are `text`, `number`, `color`, `textarea`, `date`, `datetime-local`,`time`, `month`, `week`, `radio`, `checkbox`, `select` and `range`         |
| value             | string or number or array | No       | null            | The value of the input element depended on its type                                                                                                                                           |
| options           | array                     | No       |                 | A key value pair object that is used as available options for select, radio and checkbox.``` options = [{label:'Test One', value: '1'},{label:'Test Two', value: '2'}]; ```                   |
| saveButtonLabel   | string                    | No       | Save            | The label to be used for the "Save" button                                                                                                                                                    |
| saveButtonStyle   | string                    | No       | easy-edit-button| One or more CSS classes to be used to style the "Save" button                                                                                                                                 |
| cancelButtonLabel | string                    | No       | Cancel          | The label to be used for the "Cancel" button                                                                                                                                                  |
| cancelButtonStyle | string                    | No       | easy-edit-button| One or more CSS classes to be used to style the "Cancel" button                                                                                                                               |
| placeholder       | string                    | No       | Click to edit   | The text to be shown as a hint that describes the expected value of the input element                                                                                                         |
| onCancel          | function                  | No       | () => {}        | A function that will be called when editing is cancelled                                                                                                                                      |
| onSave            | function                  | Yes      |                 | A function that will be called when editing is saved                                                                                                                                          |
| onValidate        | function                  | No       | () => {}        | A function that will be called before the onSave() event. It must return true or false and has one parameter which is the value of the component being edited                                 |
| validationMessage | string                    | No       |                 | The text to be displayed if validation fails                                                                                                                                                  |
| allowEdit         | boolean                   | No       | true            | Determines whether the component itself should be editable or not                                                                                                                             |
| attributes        | object                    | No       | {}              | A key value pair of HTML attributes to be applied on the element                                                                                                                              |

## Installation
```npm i react-easy-edit```

## Usage
A simple example
```
import React, { Component } from 'react';
import EasyEdit from 'react-easy-edit';

export default class App extends Component {

  const attributes = {
    name: 'name-two',
    id: 'name-two',
    disabled: true
  };
    
  render() {
    return (
        <EasyEdit
          type="text"
          onSave={() => {}}
          onValidate={() => true}
          attributes={attributes}
        />
    );
  }
}
```
## Licence
react-easy-edit is an open source library licensed as MIT
