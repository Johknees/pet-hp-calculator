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

class Pet extends Component<{}, { showSidebar: boolean; petList: PetInterface[], newPet: PetInterface }> {
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
      showSidebar: false,
      petList: [],
      newPet: {
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

  renderNameInput(props: { petInd: number }) {
    return (
      <TextInput
        placeholder="name"
        value={this.state.petList[props.petInd].petName}

      />
    )
  }

  renderClassPicker(props: { petInd: number }) {
    let classList: PetClass[] = this.bS.classList;

    return (
      <Select
        options={classList}
        value={this.state.petList[props.petInd].petClass}
        onChange={(e) => this.setState((prevState) => {
          let newPL: PetInterface[] = prevState.petList.slice();
          let oldP: PetInterface = newPL[props.petInd];
          oldP.petClass = e.value
          oldP.behaviors.class = this.bS.getBehaviorsForCategory(e.value)
          newPL[props.petInd] = oldP
          return ({
            petList: newPL
          })
        })}
      />
    )
  }

  renderTypePicker(props: { petInd: number }) {
    let typeList: PetType[] = this.bS.typeList

    return (
      <Select
        options={typeList}
        value={this.state.petList[props.petInd].petType}

        onChange={(e) => this.setState((prevState) => {
          let newPL: PetInterface[] = prevState.petList.slice();
          let oldP: PetInterface = newPL[props.petInd];
          oldP.petType = e.value
          newPL[props.petInd] = oldP
          return ({
            petList: newPL
          })
        })}
      />
    )
  }

  renderPetTabs() {

    let petTabs = this.state.petList.map((pet: PetInterface, index: number) => {
      return (
        <Tab title={pet.petName}>
          <Box flex>
            {this.renderPetInfo({ petInd: index })}
            {this.renderBehaviorTable({ petInd: index })}
          </Box>
        </Tab>
      )
    });
    return (<Tabs>
      {petTabs}
    </Tabs>)
  }

  renderPetInfo(props: { petInd: number }) {
    return (
      <React.Fragment>
        {this.renderNameInput(props)}
        {this.renderTypePicker(props)}
        {this.renderClassPicker(props)}
      </React.Fragment>
    )
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
        Hello Grommet!
                <Heading level='3' margin='none'>My App</Heading>
        <Button
          icon={<Icons.Notification />}
          onClick={() => this.setState(prevState => ({ showSidebar: !prevState.showSidebar }))}
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
          sidebar
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
            sidebar
          </Box>
        </Layer>)
  }

  renderInputs() {

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
                {this.renderPetTabs()}
              </Box>
              {/* {this.renderTypePicker()} */}
              {/* {this.renderClassPicker()} */}
              {/* {this.renderBehaviorTable()} */}
              {/* {this.renderToolbarPage()} */}
              {/* {this.renderPetList("feeding")} */}
            </Box >
          )}
        </ResponsiveContext.Consumer>
      </Grommet >
    )
  }
}

export default Pet;
