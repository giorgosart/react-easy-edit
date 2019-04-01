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
    let attributes = {
      id: 'name-two',
      disabled: true
    };

    return (
        <div className="App">
          <header className="App-header">
            <div>
              <h1>React Easy Edit</h1>
              <h3>Input Field</h3>
              <h4>type "text"</h4>
              <EasyEdit
                  type="text"
                  value="Can't click this"
                  onSave={App.onTest}
                  allowEdit={false}
              />
              <EasyEdit
                  type="text"
                  placeholder="I'm disabled!"
                  onSave={App.onTest}
                  onValidate={() => true}
                  attributes={attributes}
              />
              <EasyEdit
                  type="text"
                  value="Edit me!"
                  onSave={App.onTest}
                  instructions="TETEWWEEWETWET"
              />
              <h4>type "range"</h4>
              <EasyEdit
                  type="range"
                  onSave={App.onTest}
                  instructions="TETEWWEEWETWET"
              />
              <h4>type "color"</h4>
              <EasyEdit
                  type="color"
                  value="#ff00ff"
                  onSave={App.onTest}
                  instructions="TETEWWEEWETWET"
              />
              <h4>type "date"</h4>
              <EasyEdit
                  type="date"
                  onSave={App.onTest}
                  instructions="TETEWWEEWETWET"
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
                  instructions="TETEWWEEWETWET"
              />
              <h3>Textarea</h3>
              <EasyEdit
                  type="textarea"
                  value="Test Textarea"
                  onSave={App.onTest}
                  instructions="TETEWWEEWETWET"
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
                  instructions="TETEWWEEWETWET"
              />
              <h3>Checkbox</h3>
              <EasyEdit
                  type="checkbox"
                  options={App.generateOptions()}
                  onSave={App.onTest}
                  instructions="TETEWWEEWETWET"
              />
              <EasyEdit
                  type="checkbox"
                  options={App.generateOptions()}
                  onSave={App.onTest}
                  value={App.generateValues()}
              />
            </div>
          </header>
        </div>
    );
  }
}

export default App;
