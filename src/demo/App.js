import React, {Component} from 'react';
import './App.css';
import EasyEdit from "../lib/EasyEdit";

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
    return (
        <div className="App">
          <header className="App-header">
            <div>
              <h1>React Easy Edit</h1>
              <h3>Input Field</h3>
              <h4>type "text"</h4>
              <EasyEdit
                  type="text"
                  value="Test Input Field"
                  onSave={App.onTest}
                  name="name-one"
                  allowEdit={false}
              />
              <EasyEdit
                  type="text"
                  onSave={App.onTest}
                  name="name-two"
                  onValidate={()=> false}
              />
              <h4>type "color"</h4>
              <EasyEdit
                  type="color"
                  value="#ff00ff"
                  onSave={App.onTest}
                  name="name-three"
              />
              <h4>type "date"</h4>
              <EasyEdit
                  type="date"
                  onSave={App.onTest}
                  name="date-one"
              />
              <h4>type "datetime-local"</h4>
              <EasyEdit
                  type="datetime-local"
                  onSave={App.onTest}
                  name="date-two"
              />
              <h4>type "time"</h4>
              <EasyEdit
                  type="time"
                  onSave={App.onTest}
                  name="date-three"
              />
              <h4>type "week"</h4>
              <EasyEdit
                  type="week"
                  onSave={App.onTest}
                  name="date-four"
              />
              <h4>type "month"</h4>
              <EasyEdit
                  type="month"
                  onSave={App.onTest}
                  name="date-five"
              />
              <h4>type "number"</h4>
              <EasyEdit
                  type="number"
                  value={1}
                  onSave={App.onTest}
                  name="name-four"
                  min={0}
              />
              <EasyEdit
                  type="number"
                  onSave={App.onTest}
                  name="name-five"
              />
              <h4>type "radio"</h4>
              <EasyEdit
                  type="radio"
                  value="testone"
                  onSave={App.onTest}
                  options={App.generateOptions()}
                  name="name-six"
              />
              <h3>Textarea</h3>
              <EasyEdit
                  type="textarea"
                  value="Test Textarea"
                  onSave={App.onTest}
                  name="name-seven"
              />
              <EasyEdit
                  type="textarea"
                  onSave={App.onTest}
                  name="name-eight"
              />
              <h3>Select</h3>
              <EasyEdit
                  type="select"
                  options={App.generateOptions()}
                  onSave={App.onTest}
                  name="select-one"
              />
              <EasyEdit
                  type="select"
                  options={App.generateOptions()}
                  onSave={App.onTest}
                  name="select-two"
                  placeholder="My Placeholder"
              />
              <h3>Checkbox</h3>
              <EasyEdit
                  type="checkbox"
                  options={App.generateOptions()}
                  onSave={App.onTest}
                  name="checkbox-one"
              />
              <EasyEdit
                  type="checkbox"
                  options={App.generateOptions()}
                  onSave={App.onTest}
                  name="checkbox-one"
                  value={App.generateValues()}
              />
            </div>
          </header>
        </div>
    );
  }
}

export default App;
