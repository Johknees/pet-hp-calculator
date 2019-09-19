import React, { Component } from 'react';
import { Box, Grommet, Button, Heading, Collapsible, ResponsiveContext, Layer, Select, Tabs, Tab, TextInput } from 'grommet';
import * as Icons from 'grommet-icons'
import { PetInterface, Behavior, BehaviorCategory, PetClass, PetType } from './pet'
import { BehaviorService } from './behavior.service'

// class OrgChart extends Component<{}, { activeIndex: number, data: ChartNode, text: string, file: File | undefined }>{
let App: React.FC = () => {

  let pt: Pet = new Pet({});


  return (
    pt.render()
  );
}

type saveButtonAction = "add" | "edit"

class Pet extends Component<{}, { petId: number; showSidebar: boolean; petList: PetInterface[], curPet: PetInterface, saveButtonAction: saveButtonAction }> {
  // state: any;
  bS: BehaviorService;
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
    this.state = {
      petId: 2,
      showSidebar: false,
      petList: [{
        id: 0,
        name: "Nacho",
        type: "cat",
        class: "barbarian",
        level: 0,
        duration: 0,
        behaviors: {
          feeding: this.bS.getBehaviorsForCategory("feeding"),
          vocalizations: this.bS.getBehaviorsForCategory("vocalizations"),
          grooming: this.bS.getBehaviorsForCategory("grooming"),
          class: this.bS.getBehaviorsForCategory("barbarian")
        }
      }, {
        id: 1,
        name: "Winnie",
        type: "small mammal",
        class: "rogue",
        level: 0,
        duration: 0,
        behaviors: {
          feeding: this.bS.getBehaviorsForCategory("feeding"),
          vocalizations: this.bS.getBehaviorsForCategory("vocalizations"),
          grooming: this.bS.getBehaviorsForCategory("grooming"),
          class: this.bS.getBehaviorsForCategory("rogue")
        }
      }],
      curPet: {
        id: 2,
        name: "tmp",
        type: "cat",
        class: "barbarian",
        level: 0,
        duration: 0,
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
      newPet.behaviors[props.behaviorCategory] = newBehavior
      newPL[props.petInd] = newPet
      return ({
        petList: newPL
      })
    })
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
        <tr key={rowkey + "-row"}>
          <td key={rowkey + "-des"}>{props.category}</td>
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
    })
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
        <Tab title={pet.name}>
          <Box flex>
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
    return (
      <div>
        {props.pet.name}<br />
        {"Level: " + props.pet.level + " " + props.pet.type + " " + props.pet.class}
        <Button
          icon={<Icons.Edit />}
          onClick={() => {
            this.setState({ showSidebar: true, curPet: props.pet, saveButtonAction: "edit" })
          }}
        />
        <Button
          icon={<Icons.Clear />}
          onClick={() => {
            this.setState({ showSidebar: true, curPet: props.pet, saveButtonAction: "edit" }, () => this.onRemoveItem())
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
          onClick={() => this.setState(prevState => ({ showSidebar: !prevState.showSidebar, saveButtonAction: "add" }))}
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
