import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-onsenui'
import { type } from 'os';

// class OrgChart extends Component<{}, { activeIndex: number, data: ChartNode, text: string, file: File | undefined }>{
let App: React.FC = () => {

  let pt: PetTracker = new PetTracker({});


  return (
    pt.render()
  );
}

type petType = "Dog" | "Cat" | "Small Mammal";
type petClass = "Rogue" | "Cleric" | "Paladin" | "Ranger" | "Barbarian"
interface Behavior {
  description: string;
  weight: number;
  tally: number;
}

class PetTracker extends Component<{}, { petType: petType, petClass: petClass, level: number, duration: number, behaviors: Behavior[] }>{
  constructor(props: any) {
    super(props);
    this.state = {
      petType: "Cat",
      petClass: "Barbarian",
      level: 0,
      duration: 0,
      behaviors: [
        {
          description: "Eating normal food",
          weight: 1,
          tally: 0
        }

      ]
    };
    this.incrementBehaviorTally.bind(this);
  }

  renderButton = (props: { onClick: Function, index: number }): JSX.Element => {
    return (
      <Button onClick={() => this.incrementBehaviorTally(props.index)}>+</Button>
    )
  }

  incrementBehaviorTally(behaviorInd: number) {
    this.setState((prevState) => {
      let oldB = prevState.behaviors.slice();
      oldB[behaviorInd].tally++
      return ({
        behaviors: oldB
      })
    })
  }

  renderBehaviorTable() {

    let tbody = this.state.behaviors.map((element: Behavior, index: number) => {
      let behavior = this.state.behaviors[index];
      return (
        <tr>
          <td>{behavior.description}</td>
          <td>{behavior.tally}</td>
          <td>{this.renderButton({ onClick: this.incrementBehaviorTally, index: index })}</td>
        </tr>
      )
    });

    let tbl = <table>
      <thead><tr><th>Behavior</th><th>Tally</th><th>Add</th></tr></thead>
      <tbody>{tbody}</tbody>
    </table>

    return tbl;
  }

  renderClassPicker() {

  }

  renderTypePicker() {

  }


  render(): JSX.Element {
    return (
      <div>
        {this.renderBehaviorTable()}
      </div>
    )
  }
}

export default PetTracker;
