[![Test](https://img.shields.io/npm/v/react-easy-edit.svg?style=flat)](https://www.npmjs.com/package/react-easy-edit)
[![NPM](https://img.shields.io/npm/dm/react-easy-edit.svg)](https://www.npmjs.com/package/react-easy-edit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CircleCI](https://circleci.com/gh/giorgosart/react-easy-edit.svg?style=shield)](https://circleci.com/gh/giorgosart/react-easy-edit) [![Greenkeeper badge](https://badges.greenkeeper.io/giorgosart/react-easy-edit.svg)](https://greenkeeper.io/)
[![install size](https://packagephobia.now.sh/badge?p=react-easy-edit@latest)](https://packagephobia.now.sh/result?p=react-easy-edit@latest)
[![DeepScan grade](https://deepscan.io/api/teams/6030/projects/7886/branches/87202/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=6030&pid=7886&bid=87202)

![](https://i.imgur.com/vwqcqeD.gif)

# react-easy-edit
A React library that allows inline editing on HTML5 input components, try the sandbox **[here](https://codesandbox.io/s/react-easy-edit-sandbox-2y97j)**!

For full library documentation, **[visit this site](https://giorgosart.gitbook.io/react-easy-edit/)**!

### :pencil: Features
- Supports `input` (most types, even inputs with `datalist`), `textarea`,`radio`, `checkbox` and `select` HTML types
- Validates user input
- Allows customisation on all elements including the save and cancel buttons
- Supports custom editComponent and custom displayComponent for each type

## :rocket: Installation
```npm i react-easy-edit``` or ```yarn add react-easy-edit```

## :pray: Show your support
Give a :star: if this project helped you in any way!

[![paypal](https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TUJKB5DPLHA3N&currency_code=GBP&source=url)
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Y8Y611NE2)

## :cool: Props
| Prop              | Type                      | Required | Default         | Description                                                                                                                                                                                   |
|-------------------|---------------------------|----------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type              | string                    | Yes      |                 | The type of the input element to display. Supported types are `text`, `number`, `color`, `textarea`, `date`, `datetime-local`,`time`, `month`, `week`, `radio`, `email`, `checkbox`, `select`, `range` and `datalist`|
| value             | string or number or array | No       | null            | The value of the input element depended on its type                                                                                                                                           |
| options           | array                     | No       |                 | A key value pair object that is used as available options for select, radio and checkbox.``` options = [{label:'Test One', value: '1'},{label:'Test Two', value: '2'}]; ```                   |
| saveButtonLabel   | string or element         | No       | Save            | The label to be used for the "Save" button                                                                                                                                                    |
| saveButtonStyle   | string                    | No       | easy-edit-button| One or more CSS classes to be used to style the "Save" button                                                                                                                                 |
| cancelButtonLabel | string or element         | No       | Cancel          | The label to be used for the "Cancel" button                                                                                                                                                  |
| cancelButtonStyle | string                    | No       | easy-edit-button| One or more CSS classes to be used to style the "Cancel" button                                                                                                                               |
| buttonsPosition   | string                    | No       | after           | The position for both save and cancel buttons, accepts `before` and `after`                                                                                                                               |
| placeholder       | string                    | No       | Click to edit   | The text to be shown as a hint that describes the expected value of the input element                                                                                                         |
| onCancel          | function                  | No       | () => {}        | A function that will be called when editing is cancelled. Also called when the <kbd>Esc</kbd> button is pressed                                                                               |
| onSave            | function                  | Yes      |                 | A function that will be called when editing is saved. Also called when the <kbd>Enter</kbd> button is pressed (for Textarea component it's <kbd>Ctrl</kbd> + <kbd>Enter</kbd>)                                                                                 |
| onValidate        | function                  | No       | () => {}        | A function that will be called before the onSave() event. It must return true or false and has one parameter which is the value of the component being edited                                 |
| validationMessage | string                    | No       |                 | The text to be displayed if validation fails                                                                                                                                                  |
| allowEdit         | boolean                   | No       | true            | Determines whether the component itself should be editable or not                                                                                                                             |
| attributes        | object                    | No       | {}              | A key value pair of HTML attributes to be applied on the element when the component is in Edit mode                                                                                                                             |
| viewAttributes    | object                    | No       | {}              | A key value pair of HTML attributes to be applied on the element when the component is in View mode                                                                                                                              |
| instructions      | string                    | No       |                 | Instructions to be shown below the component                                                                                                                              |
| disableAutoSubmit | boolean                   | No       | false           | Whether the component can be auto submitted when the user hits the <kbd>Enter</kbd> key                                                                                                                              |
| disableAutoCancel | boolean                   | No       | false           | Whether the component can be auto cancelled when the user hits the <kbd>Esc</kbd> key                                                                                                                              |
| editComponent     | element                   | No       | null            | The custom component to be displayed when editing the value. This will override the standard input shown for the ```type``` provided                                                     |
| displayComponent  | element                   | No       | null            | The custom component to be displayed the value when not editing                                                                                                                        |
| cssClassPrefix  | string                   | No       | ''            | A prefix to be appended to all the `EasyEdit` default CSS classes, can be used to also reset the style of a specific `EasyEdit` component
| hideButtons  | string                   | No       | false            | Whether the save and cancel buttons should be shown.

## :page_facing_up: Examples
#### A simple example - Textbox
```jsx
import React, { Component } from 'react';
import EasyEdit from 'react-easy-edit';

function App() {

  const save = (value) => {alert(value)}
  const cancel = () => {alert("Cancelled")}

  return (
    <EasyEdit
      type="text"
      onSave={save}
      onCancel={cancel}
      saveButtonLabel="Save Me"
      cancelButtonLabel="Cancel Me"
      attributes={{ name: "awesome-input", id: 1}}
      instructions="Star this repo!"
    />
  );
}
```

#### Radio buttons
```jsx
<EasyEdit
  type="radio"
  value="one"
  onSave={save}
  options={[
      {label: 'First option', value: 'one'},
      {label: 'Second option', value: 'two'}]}
  instructions="Custom instructions"
/>
```

#### Date
```jsx
<EasyEdit
  type="date"
  onSave={save}
  instructions="Select your date of birth"
/>
```

#### Dropdown
```jsx
<EasyEdit
  type="select"
  options={[
      {label: 'First option', value: 'one'},
      {label: 'Second option', value: 'two'}]}
  onSave={save}
  placeholder="My Placeholder"
  instructions="Custom instructions"
/>
```

#### Datalist
```jsx
<EasyEdit
  type="datalist"
  options={[
      {label: 'First option', value: 'one'},
      {label: 'Second option', value: 'two'}]}
  onSave={save}
  instructions="Custom instructions"
/>
```

#### Checkboxes
```jsx
<EasyEdit
  type="checkbox"
  options={[
      {label: 'First option', value: 'one'},
      {label: 'Second option', value: 'two'}]}
  onSave={save}
  value={['one', 'two']} // this will preselect both options
/>
```

#### Custom components

When using custom input components, they must be passed in as props, like so:
```jsx
<EasyEdit
    type="text"
    onSave={() => {}}
    editComponent={<CustomInput />}
    displayComponent={<CustomDisplay />}
/>
```

When defining a custom input component, the function ```setParentValue``` is injected into your custom component, which must be called in order to pass the desired value up to the parent ```EasyEdit``` component.

For example, if your component was a text field that needed to set the ```EasyEdit``` value as a user id based on a username entered, you would need to pass the id to ```this.props.setParentValue``` in order to get that value to the ```EasyEdit``` component.

e.g.
```jsx
// Inside your custom input

onChange(searchTerm) {
  getUserIdByUsername(searchTerm).then((userId) => {
    this.props.setParentValue(userId);
  })
}
```
## :handshake: Contributing
Contributions, issues and feature requests are welcome.

Feel free to check [issues page](https://github.com/giorgosart/react-easy-edit/issues) if you want to contribute.

### Contributors
| ![giorgosart](https://avatars1.githubusercontent.com/u/1062121?s=100&v=4) | ![mnnalxndr](https://avatars1.githubusercontent.com/u/12860917?s=100&v=4) | ![liamwithers](https://avatars2.githubusercontent.com/u/1030150?s=100&v=4)|
|-----------|----------|----------|
| [@giorgosart](https://github.com/giorgosart)        | [@mnnalxndr](https://github.com/mnnalxndr) | [@liamwithers](https://github.com/liamwithers)|
|[:construction:](https://github.com/giorgosart/react-easy-edit "Maintenance")[:computer:](https://github.com/giorgosart/react-easy-edit/commits?author=giorgosart "Code")[:bug:](https://github.com/giorgosart/react-easy-edit/commits?author=giorgosart "Bug fix")| [:computer:](https://github.com/giorgosart/react-easy-edit/commits?author=mnnalxndr "Code")[:bug:](https://github.com/giorgosart/react-easy-edit/commits?author=mnnalxndr "Code")| [:bug:](https://github.com/giorgosart/react-easy-edit/commits?author=liamwithers "Bug")


## :1234: Versioning
For transparency and insight into our release cycle, releases will be numbered with the following format:

```<major>.<minor>.<patch>```

And constructed with the following guidelines:

- Breaking backwards compatibility bumps the major
- New additions without breaking backwards compatibility bumps the minor
- Bug fixes and misc changes bump the patch
- For more information on semantic versioning, please visit http://semver.org/.

## :scroll: Licence
Copyright © 2019 [George Artemiou](https://github.com/giorgosart).

This project is [MIT licensed](https://github.com/giorgosart/react-easy-edit/blob/master/LICENSE).
