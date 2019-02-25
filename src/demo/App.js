import React, {Component} from 'react';
import './App.css';
import Editable from "../lib/Editable";

class App extends Component {

  static onTest(value){
    alert(value);
  }

  static generateOptions(){
    return [
        {label:'Test One', value: 'testone'},
        {label:'Test Two', value: 'testtwo'},
        {label:'Test Three', value: 'testthree'},
        {label:'Test Four',value: 'testfour'}
      ]
  }

  static generateValues(){
    return ['testone', 'testtwo'];
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <div>
              <Editable
                type="text"
                value="Text fieadsld"
                onSave={App.onTest}
                name="ads"
              />
              <Editable
                  type="select"
                  options={App.generateOptions()}
                  onSave={App.onTest}
                  name="test"
                  value="asd"
              />
              <Editable
                  type="checkbox"
                  options={App.generateOptions()}
                  onSave={App.onTest}
                  name="testfour"
                  value={App.generateValues()}
              />
            </div>
          </header>
        </div>
    );
  }
}

export default App;
