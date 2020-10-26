[![Test](https://img.shields.io/npm/v/react-easy-edit.svg?style=flat)](https://www.npmjs.com/package/react-easy-edit)
[![NPM](https://img.shields.io/npm/dm/react-easy-edit.svg)](https://www.npmjs.com/package/react-easy-edit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CircleCI](https://circleci.com/gh/giorgosart/react-easy-edit.svg?style=shield)](https://circleci.com/gh/giorgosart/react-easy-edit) 
[![Known Vulnerabilities](https://snyk.io/test/github/giorgosart/react-easy-edit/badge.svg?targetFile=package.json)](https://snyk.io/test/github/giorgosart/react-easy-edit?targetFile=package.json)
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
For the full list of props, please visit **[our documentation](https://giorgosart.gitbook.io/react-easy-edit/props)**.

## :page_facing_up: Examples
More examples can be found **[here](https://giorgosart.gitbook.io/react-easy-edit/examples)**
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

You can use a custom EditComponent and still use the saveOnBlur behavior. An ```onBlur``` function will be passed to your custom component, for you to trigger the behavior.

```jsx
class CustomComponent extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div>
      <p>Custom editor</p>
      <input onBlur={this.props.onBlur} />
    </diV>;
  }
}
```

## :handshake: Contributing
Contributions, issues and feature requests are welcome.

Feel free to check [issues page](https://github.com/giorgosart/react-easy-edit/issues) if you want to contribute.

## :1234: Versioning
For transparency and insight into our release cycle, releases will be numbered with the following format:

```<major>.<minor>.<patch>```

And constructed with the following guidelines:

- Breaking backwards compatibility bumps the major
- New additions without breaking backwards compatibility bumps the minor
- Bug fixes and misc changes bump the patch
- For more information on semantic versioning, please visit http://semver.org/.

## :scroll: Licence
Copyright © 2020 [George Artemiou](https://github.com/giorgosart).

This project is [MIT licensed](https://github.com/giorgosart/react-easy-edit/blob/master/LICENSE).
