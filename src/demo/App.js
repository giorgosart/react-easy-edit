import React, {Component} from 'react';
import './App.css';
import EasyEdit, {Types} from "../lib/EasyEdit";

import CustomInput from './CustomInput';
import CustomDisplay from './CustomDisplay';

class App extends Component {

  static onTest(value) {
    alert(value);
  }

  static generateOptions() {
    return [
      {label: 'Test One', value: 'testone'},
      {label: 'Test Two', value: 'testtwo'},
      {label: 'Test Three', value: 'testthree'},
      {label: 'Test Four', value: 'testfour'}
    ]
  }

  static generateValues() {
    return ['testone', 'testtwo'];
  }

  render() {
    let attributes = {
      name: 'name-two',
      id: 'name-two',
      disabled: true
    };

    return (
        <div className="App">
          <header className="App-header">
            <div>
              <h1>React Easy Edit</h1>
              <h3>Datalist</h3>
              <EasyEdit
                  type={Types.DATALIST}
                  onSave={App.onTest}
                  options={App.generateOptions()}
                  instructions="Custom instructions"
                  onValidate={value => {return value != null}}
                  buttonsPosition='before'
              />
              <h3>Input Field</h3>
              <h4>type "text"</h4>
              <EasyEdit
                  type="text"
                  value="Test Input Field"
                  onSave={App.onTest}
                  allowEdit={false}
                  viewAttributes={{style:{'color':'red'}, 'data-test':'test', className: 'test2'}}
              />
              <EasyEdit
                  type="text"
                  value="Test Blur (check console)"
                  onSave={App.onTest}
                  onBlur={() => console.log("blur")}
              />
              <EasyEdit
                  type="text"
                  value="Test Focus (check console)"
                  onSave={App.onTest}
                  onFocus={() => console.log("focus")}
              />
              <EasyEdit
                  attributes={{id:'test'}}
                  type="text"
                  value="Delete Me!"
                  onSave={App.onTest}
                  hideDeleteButton={false}
              />
              <EasyEdit
                  type="text"
                  value="Auto-submit onBlur"
                  onSave={App.onTest}
                  saveOnBlur
              />
              <EasyEdit
                  type="text"
                  onSave={App.onTest}
                  onValidate={() => true}
                  attributes={attributes}
              />
              <EasyEdit
                  type="text"
                  value="Custom on hover class"
                  onSave={App.onTest}
                  onHoverCssClass="custom-on-hover"
                  instructions="Custom instructions"
              />
              <h4>Type Password</h4>
              <EasyEdit
                  type={Types.PASSWORD}
                  onSave={App.onTest}
              />
              <h4>type "range"</h4>
              <EasyEdit
                  type="range"
                  onSave={App.onTest}
                  instructions="Custom instructions"
              />
              <h4>type "color"</h4>
              <EasyEdit
                  type="color"
                  value="#ff00ff"
                  onSave={App.onTest}
                  instructions="Custom instructions"
              />
              <h4>type "date"</h4>
              <EasyEdit
                  type="date"
                  onSave={App.onTest}
                  instructions="Custom instructions"
              />
              <h4>type "datetime-local"</h4>
              <EasyEdit
                  type="datetime-local"
                  onSave={App.onTest}
              />
              <h4>type "time"</h4>
              <EasyEdit
                  type="time"
                  onSave={App.onTest}
              />
              <h4>type "week"</h4>
              <EasyEdit
                  type="week"
                  onSave={App.onTest}
              />
              <h4>type "month"</h4>
              <EasyEdit
                  type="month"
                  onSave={App.onTest}
              />
              <h4>type "number"</h4>
              <EasyEdit
                  type="number"
                  value={1}
                  onSave={App.onTest}
                  min={0}
              />
              <EasyEdit
                  type="number"
                  onSave={App.onTest}
              />
              <h4>type "radio"</h4>
              <EasyEdit
                  type="radio"
                  value="testone"
                  onSave={App.onTest}
                  options={App.generateOptions()}
                  instructions="Custom instructions"
              />
              <h3>Textarea</h3>
              <EasyEdit
                  type={Types.TEXTAREA}
                  value="Test Textarea"
                  attributes={{className: 'test'}}
                  onSave={App.onTest}
                  instructions="Custom instructions"
              />
              <EasyEdit
                  type="textarea"
                  onSave={App.onTest}
              />
              <h3>Select</h3>
              <EasyEdit
                  type="select"
                  options={App.generateOptions()}
                  onSave={App.onTest}
              />
              <EasyEdit
                  type="select"
                  options={App.generateOptions()}
                  onSave={App.onTest}
                  placeholder="My Placeholder"
                  instructions="Custom instructions"
              />
              <h3>Checkbox</h3>
              <EasyEdit
                  type="checkbox"
                  options={App.generateOptions()}
                  onSave={App.onTest}
                  value={App.generateValues()}
                  attributes={{className: 'test', checked:'checked'}}
              />
                <h3>Hide Buttons</h3>
                <EasyEdit
                  type="text"
                  value="Hide both buttons"
                  onSave={App.onTest}
                  hideSaveButton
                  hideCancelButton
                />
                <EasyEdit
                  type="text"
                  value="Hide save button"
                  onSave={App.onTest}
                  hideSaveButton
                />
                <EasyEdit
                  type="text"
                  value="Hide cancel button"
                  onSave={App.onTest}
                  hideCancelButton
                />
              <h3>Custom components</h3>
              <EasyEdit
                  type="text"
                  onSave={App.onTest}
                  name="custom-one"
                  editComponent={<CustomInput />}
                  instructions="Custom input capitalises text"
              />
              <EasyEdit
                  type="text"
                  onSave={App.onTest}
                  name="custom-two"
                  displayComponent={<CustomDisplay />}
                  instructions="Custom placeholder reverses text"
              />
              <EasyEdit
                  type="text"
                  onSave={App.onTest}
                  name="custom-three"
                  editComponent={<CustomInput />}
                  displayComponent={<CustomDisplay />}
                  instructions="Both custom components together"
              />
              <EasyEdit
                  type="text"
                  onSave={App.onTest}
                  name="custom-four"
                  value="Predefined value"
                  editComponent={<CustomInput />}
                  displayComponent={<CustomDisplay />}
              />
            </div>
          </header>
        </div>
    );
  }
}

export default App;
