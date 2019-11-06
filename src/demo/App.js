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
              />
              <h3>Input Field</h3>
              <h4>type "text"</h4>
              <EasyEdit
                  type="text"
                  value="Test Input Field"
                  onSave={App.onTest}
                  allowEdit={false}
              />
              <EasyEdit
                  type="text"
                  onSave={App.onTest}
                  onValidate={() => true}
                  attributes={attributes}
              />
              <EasyEdit
                  type="text"
                  value="Edit me!"
                  onSave={App.onTest}
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
                  type="textarea"
                  value="Test Textarea"
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
                  attributes={{class: 'test', checked:'checked'}}
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
