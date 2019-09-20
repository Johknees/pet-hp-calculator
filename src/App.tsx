import React, { Component } from 'react';
import { Box, Grommet, Button, Heading, Collapsible, ResponsiveContext, Layer, Select, Tabs, Tab, TextInput } from 'grommet';
import * as Icons from 'grommet-icons'
import { PetInterface, Behavior, BehaviorCategory, PetClass, PetType } from './pet'
import { BehaviorService } from './behavior.service'
import { PetDetailsService } from './pet-details.service'
import './App.css'

let App: React.FC = () => {

  let pt: Pet = new Pet({});


  return (
    pt.render()
  );
}

type saveButtonAction = "add" | "edit";

class Pet extends Component<{}, { petId: number; showSidebar: boolean; petList: PetInterface[], curPet: PetInterface, saveButtonAction: saveButtonAction }> {
  // state: any;
  bS: BehaviorService;
  pS: PetDetailsService;
  theme = {
    global: {
      colors: {
        brand: '#228BE6',
      },
    },
  };
  constructor(props: any) {
    super(props);
    this.bS = new BehaviorService();
    this.pS = new PetDetailsService();
    this.state = {
      petId: 0,
      showSidebar: false,
      petList: [],
      curPet: {
        id: 0,
        name: "tmp",
        type: "cat",
        class: "barbarian",
        level: 0,
        duration: 0,
        hp: 0,
        behaviors: {
          feeding: this.bS.getBehaviorsForCategory("feeding"),
          vocalizations: this.bS.getBehaviorsForCategory("vocalizations"),
          grooming: this.bS.getBehaviorsForCategory("grooming"),
          class: this.bS.getBehaviorsForCategory("barbarian")
        }
      },
      saveButtonAction: "add"
    };
    this.incrementBehaviorTally.bind(this);
  }

  componentDidMount() {
    this.setState(this.pS.petState);
  }

  renderTallyUp = (props: { petInd: number, behaviorInd: number, behaviorCategory: BehaviorCategory }): JSX.Element => {
    return (
      <Button
        icon={<Icons.Add />}
        onClick={() => this.incrementBehaviorTally({ asc: true, ...props })}
      />
    )
  }
  renderTallyDn = (props: { petInd: number, behaviorInd: number, behaviorCategory: BehaviorCategory }): JSX.Element => {
    let active: boolean = this.state.petList[props.petInd].behaviors[props.behaviorCategory][props.behaviorInd].tally > 0
    return (
      <Button
        icon={<Icons.Subtract />}
        active={active}
        onClick={() => this.incrementBehaviorTally({ asc: false, ...props })}
      />
    )
  }

  incrementBehaviorTally(props: { petInd: number, behaviorInd: number, behaviorCategory: BehaviorCategory, asc: boolean }) {
    this.setState((prevState) => {
      let newPL: PetInterface[] = prevState.petList.slice();
      let newPet: PetInterface = newPL[props.petInd];
      let newBehavior: Behavior[] = newPet.behaviors[props.behaviorCategory].slice();
      if (props.asc) {
        newBehavior[props.behaviorInd].tally++
      } else {
        if (newBehavior[props.behaviorInd].tally > 0) {
          newBehavior[props.behaviorInd].tally--
        }
      }
      newPet.behaviors[props.behaviorCategory] = newBehavior;
      newPet.level = this.calculateLevel({ pet: newPet });
      newPL[props.petInd] = newPet
      return ({
        petList: newPL
      })
    })
  }

  calculateLevel(props: { pet: PetInterface }) {
    let levelNom: number = 0;
    levelNom += this.getLevelforBehavior(props.pet.behaviors.feeding);
    levelNom += this.getLevelforBehavior(props.pet.behaviors.grooming);
    levelNom += this.getLevelforBehavior(props.pet.behaviors.vocalizations);
    levelNom += this.getLevelforBehavior(props.pet.behaviors.class);
    let denom: number = props.pet.duration
    if (props.pet.duration <= 0) {
      denom = 1;
    }
    let level = Math.floor(levelNom / denom);

    return level;
  }

  calculateHp(props: { pet: PetInterface }) {
    let u = this.calculateLevel(props);
    // b+(um)
    let b = this.bS.getBaseHp({ class: props.pet.class, type: props.pet.type });
    let m = this.bS.getLevelMod({ type: props.pet.type });
    return b + (u * m)
  }

  getLevelforBehavior(behaviorList: Behavior[]) {
    let level: number = 0;
    behaviorList.forEach(behavior => {
      level += (behavior.tally * behavior.weight);
    });
    return level;
  }

  renderBehaviorRow(props: { petInd: number, category: BehaviorCategory }) {
    let categoryRowList = this.state.petList[props.petInd].behaviors[props.category];
    let tRowList = categoryRowList.map((behavior: Behavior, index: number) => {
      // let behavior = this.state.behaviors[index];
      let rowkey: string = behavior.description.replace(" ", "-");
      return (
        <tr key={rowkey + "-row"}>
          <td key={rowkey + "-des"}>{behavior.description}</td>
          <td key={rowkey + "-tally"}>{behavior.tally}</td>
          <td key={rowkey + "-inc"}>
            {this.renderTallyDn({ petInd: props.petInd, behaviorInd: index, behaviorCategory: props.category })}
            {this.renderTallyUp({ petInd: props.petInd, behaviorInd: index, behaviorCategory: props.category })}</td>
        </tr>
      )
    });
    let rowkey: string = props.category;

    return (
      <React.Fragment>
        <tr className="behavior-category-row" key={rowkey + "-row"}>
          <td key={rowkey + "-des"} className="behavior-category-title">{props.category}</td>
        </tr>
        {tRowList}
      </React.Fragment>
    )
  }

  renderBehaviorTable(props: { petInd: number }) {

    let tbody = (
      <React.Fragment>
        {this.renderBehaviorRow({ category: "feeding", ...props })}
        {this.renderBehaviorRow({ category: "vocalizations", ...props })}
        {this.renderBehaviorRow({ category: "grooming", ...props })}
        {this.renderBehaviorRow({ category: "class", ...props })}
      </React.Fragment>
    )

    let tbl = <table>
      <thead><tr key="behavior-headers"><th>Behavior</th><th>Tally</th></tr></thead>
      <tbody>{tbody}</tbody>
    </table>

    return tbl;
  }

  handleInput = (e: any) => {
    let { value } = e.target
    this.setState((prevState) => {
      let newPet = prevState.curPet;
      newPet.name = value;
      return ({
        curPet: newPet
      })
    });
  }


  renderNameInput() {
    return (
      <TextInput
        placeholder="name"
        value={this.state.curPet.name}
        onChange={this.handleInput}
      />
    )
  }

  handleDurationInput = (e: any) => {
    let { value } = e.target
    this.setState((prevState) => {
      let newPet = prevState.curPet;
      newPet.duration = value;
      return ({
        curPet: newPet
      })
    });
  }

  renderDurationInput() {
    return (
      <TextInput
        type="number"
        value={this.state.curPet.duration}
        onChange={this.handleDurationInput}
      />
    )
  }

  renderClassPicker() {
    let classList: PetClass[] = this.bS.classList;

    return (
      <Select
        options={classList}
        value={this.state.curPet.class}

        onChange={(e) => this.setState((prevState) => {
          let newPet = prevState.curPet;
          newPet.class = e.value;
          return ({
            curPet: newPet
          })
        })}
      />
    )
  }

  renderTypePicker() {
    let typeList: PetType[] = this.bS.typeList
    return (
      <Select
        options={typeList}
        value={this.state.curPet.type}

        onChange={(e) => this.setState((prevState) => {
          let newPet = prevState.curPet;
          newPet.type = e.value;
          return ({
            curPet: newPet
          })
        })}
      />
    )
  }

  renderPetTabs() {

    let petTabs = this.state.petList.map((pet: PetInterface, index: number) => {
      return (
        <Tab key={pet.id + "-tab"} title={pet.name}>
          <Box key={pet.id + "info-box"} flex>
            {this.renderPetInfo({ pet: pet })}
            {this.renderBehaviorTable({ petInd: index })}
          </Box>
        </Tab>
      )
    });
    return (<Tabs>
      {petTabs}
    </Tabs>)
  }

  renderPetInfo(props: { pet: PetInterface }) {
    let level = this.calculateLevel(props);
    let hp = this.calculateHp(props);

    return (
      <div>
        <div className="pet-info">
          {props.pet.name}<br />
          {"Level " + level + " " + props.pet.type + " " + props.pet.class}<br />
          {"HP: " + hp}
        </div>
        <Button
          icon={<Icons.Edit />}
          onClick={() => {
            this.setState({ showSidebar: true, curPet: Object.assign({}, props.pet), saveButtonAction: "edit" })
          }}
        />
        <Button
          icon={<Icons.Clear />}
          onClick={() => {
            this.setState({ showSidebar: true, curPet: Object.assign({}, props.pet) }, () => this.onRemoveItem())
          }}
        />
      </div>
    )
  }

  emptyPet(): PetInterface {
    return ({
      id: this.state.petId,
      name: "",
      type: "cat",
      class: "barbarian",
      level: 0,
      duration: 0,
      hp: 0,
      behaviors: {
        feeding: this.bS.getBehaviorsForCategory("feeding"),
        vocalizations: this.bS.getBehaviorsForCategory("vocalizations"),
        grooming: this.bS.getBehaviorsForCategory("grooming"),
        class: this.bS.getBehaviorsForCategory("barbarian")
      }
    })
  }

  renderHeader() {
    let AppBar = (props: any) => (
      <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation='medium'
        style={{ zIndex: '1' }}
        {...props}
      />
    );
    return (
      <AppBar>
        <Heading level='3' margin='none'>Pet HP Calculator</Heading>
        <Button
          icon={<Icons.AddCircle />}
          onClick={() => this.setState(prevState => ({ showSidebar: !prevState.showSidebar, curPet: this.emptyPet(), saveButtonAction: "add" }))}
        />
        <Button
          icon={<Icons.Save />}
          onClick={() => this.pS.update({ curPet: this.state.curPet, petId: this.state.petId, petList: this.state.petList })}
        />
      </AppBar>)
  }



  renderSidebar(size: string) {

    return (!this.state.showSidebar || size !== 'small') ? (
      <Collapsible direction="horizontal" open={this.state.showSidebar}>
        <Box
          flex
          width='medium'
          background='light-2'
          elevation='small'
          align='center'
          justify='center'
        >
          {this.renderInputs()}
        </Box>
      </Collapsible>
    ) : (
        <Layer>
          <Box
            background='light-2'
            tag='header'
            justify='end'
            align='center'
            direction='row'
          >
            <Button
              icon={<Icons.FormClose />}
              onClick={() => this.setState({ showSidebar: false })}
            />
          </Box>
          <Box
            fill
            background='light-2'
            align='center'
            justify='center'
          >
            {this.renderInputs()}
          </Box>
        </Layer>)
  }

  onAddItem = () => {
    this.setState(prevState => {
      let newPL: PetInterface[] = [...prevState.petList, prevState.curPet];
      return {
        petList: newPL,
        petId: prevState.petId + 1,
        curPet: this.emptyPet(),
        showSidebar: false
      };
    });
  };

  onRemoveItem = () => {
    this.setState(prevState => {
      let newPL: PetInterface[] = prevState.petList.filter((pet) => {
        return pet.id !== prevState.curPet.id
      });
      return {
        petList: newPL,
        curPet: this.emptyPet(),
        showSidebar: false
      };
    });
  };

  onEditItem = () => {
    this.setState(prevState => {
      let newPL: PetInterface[] = prevState.petList.map((pet) => {
        if (pet.id === prevState.curPet.id) {
          let lvl: number = this.calculateLevel({ pet: prevState.curPet });
          let hp: number = this.calculateHp({ pet: prevState.curPet });
          let classBehavior: Behavior[] = this.bS.getBehaviorsForCategory(prevState.curPet.class)
          prevState.curPet.level = lvl;
          prevState.curPet.hp = hp;
          prevState.curPet.behaviors.class = classBehavior;
          pet = prevState.curPet
        }
        return pet
      })
      return {
        petList: newPL,
        curPet: this.emptyPet(),
        showSidebar: false
      };
    });
  };

  renderInputs() {
    return (
      <React.Fragment>
        {this.renderNameInput()}
        {this.renderClassPicker()}
        {this.renderTypePicker()}
        {this.renderDurationInput()}
        {this.renderSaveButton()}
      </React.Fragment>
    )
  }

  renderSaveButton() {
    let button: any;
    switch (this.state.saveButtonAction) {
      case "add":
        button = this.renderAddSaveButton()
        break;
      case "edit":
        button = this.renderEditSaveButton()
        break;

      default:
        break;
    }
    return button;
  }

  renderAddSaveButton() {
    return (
      <Button
        icon={<Icons.Add />}
        onClick={() => this.onAddItem()}
      />
    )
  }
  renderEditSaveButton() {
    return (
      <Button
        icon={<Icons.Save />}
        onClick={() => this.onEditItem()}
      />
    )
  }
  renderRemoveButton() {
    return (
      <Button
        icon={<Icons.Clear />}
        onClick={() => this.onRemoveItem()}
      />
    )
  }

  render(): JSX.Element {
    return (
      <Grommet theme={this.theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              {this.renderHeader()}
              <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                {this.renderSidebar(size)}
                <Box flex align="center">
                  {this.renderPetTabs()}
                </Box>
              </Box>
            </Box >
          )}
        </ResponsiveContext.Consumer>
      </Grommet >
    )
  }
}

export default Pet;
