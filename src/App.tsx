import React, { Component } from 'react';
import './App.css';
import { Button, Select } from 'react-onsenui'
import { PetInterface, Behavior, BehaviorCategory, PetClass, PetType } from './pet'
import { BehaviorService } from './behavior.service'

// class OrgChart extends Component<{}, { activeIndex: number, data: ChartNode, text: string, file: File | undefined }>{
let App: React.FC = () => {

  let pt: Pet = new Pet({});


  return (
    pt.render()
  );
}

class Pet extends Component<{}, { petList: PetInterface }> {
  // state: any;
  bS: BehaviorService;
  constructor(props: any) {
    super(props);
    this.bS = new BehaviorService();
    this.state = {
      petList: {
        petName: "",
        petType: "cat",
        petClass: "barbarian",
        level: 0,
        duration: 0,
        behaviors: {
          feeding: this.bS.getBehaviorsForCategory("feeding"),
          vocalizations: this.bS.getBehaviorsForCategory("vocalizations"),
          grooming: this.bS.getBehaviorsForCategory("grooming"),
          class: this.bS.getBehaviorsForCategory("barbarian")
        }

      }
    };
    this.incrementBehaviorTally.bind(this);
  }

  renderButton = (props: { petInd: number, behaviorInd: number, behaviorCategory: BehaviorCategory }): JSX.Element => {
    return (
      <Button onClick={() => this.incrementBehaviorTally(props)}>+</Button>
    )
  }

  incrementBehaviorTally(props: { petInd: number, behaviorInd: number, behaviorCategory: BehaviorCategory }) {
    this.setState((prevState) => {
      let oldP: PetInterface = prevState.petList;
      let oldB: Behavior[] = oldP.behaviors[props.behaviorCategory].slice();
      oldB[props.behaviorInd].tally++
      oldP.behaviors[props.behaviorCategory] = oldB
      return ({
        petList: oldP
      })
    })
  }

  renderBehaviorRow(category: BehaviorCategory) {
    let categoryRowList = this.state.petList.behaviors[category];
    let tRowList = categoryRowList.map((behavior: Behavior, index: number) => {
      // let behavior = this.state.behaviors[index];
      let rowkey: string = behavior.description.replace(" ", "-");
      return (
        <tr key={rowkey + "-row"}>
          <td key={rowkey + "-des"}>{behavior.description}</td>
          <td key={rowkey + "-tally"}>{behavior.tally}</td>
          <td key={rowkey + "-inc"}>{this.renderButton({ petInd: 0, behaviorInd: index, behaviorCategory: category })}</td>
        </tr>
      )
    });
    let rowkey: string = category;

    return (
      <React.Fragment>
        <tr key={rowkey + "-row"}>
          <td key={rowkey + "-des"}>{category}</td>
        </tr>
        {tRowList}
      </React.Fragment>
    )
  }

  renderBehaviorTable() {

    let tbody = (
      <React.Fragment>
        {this.renderBehaviorRow("feeding")}
        {this.renderBehaviorRow("vocalizations")}
        {this.renderBehaviorRow("grooming")}
        {this.renderBehaviorRow("class")}
      </React.Fragment>
    )

    let tbl = <table>
      <thead><tr key="behavior-headers"><th>Behavior</th><th>Tally</th><th>Add</th></tr></thead>
      <tbody>{tbody}</tbody>
    </table>

    return tbl;
  }

  renderClassPicker() {
    let classList: PetClass[] = this.bS.classList;
    let classOptions = classList.map((petClass: string) => {
      return (
        <option key={petClass}>{petClass}</option>
      )
    });

    return (
      <Select
        value={this.state.petList.petClass}
        onChange={(e) => this.setState((prevState) => {
          let oldP: PetInterface = prevState.petList;

          oldP.petClass = e.target.value
          oldP.behaviors.class = this.bS.getBehaviorsForCategory(e.target.value)
          return ({
            petList: oldP
          })
        })}>
        {classOptions}
      </ Select>
    )
  }

  renderTypePicker() {
    let typeList: PetType[] = this.bS.typeList;
    let typeOptions = typeList.map((petType: string) => {
      return (
        <option key={petType}>{petType}</option>
      )
    });

    return (
      <Select
        onChange={(e) => this.setState((prevState) => {
          let oldP: PetInterface = prevState.petList;
          oldP.petType = e.target.value
          return ({
            petList: oldP
          })
        })}>
        {typeOptions}
      </Select>
    )
  }


  render(): JSX.Element {
    return (
      <div>
        {this.renderTypePicker()}
        {this.renderClassPicker()}
        {this.renderBehaviorTable()}
      </div>
    )
  }
}

export default Pet;
