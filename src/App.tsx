import React, { Component } from 'react';
import { Box, Grommet, Button, Heading, Collapsible, ResponsiveContext, Layer, Select } from 'grommet';
import Icons from 'grommet-icons'
import './App.css';
import { PetInterface, Behavior, BehaviorCategory, PetClass, PetType } from './pet'
import { BehaviorService } from './behavior.service'

// class OrgChart extends Component<{}, { activeIndex: number, data: ChartNode, text: string, file: File | undefined }>{
let App: React.FC = () => {

  let pt: Pet = new Pet({});


  return (
    pt.render()
  );
}

class Pet extends Component<{}, { showSidebar: boolean; petList: PetInterface }> {
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

  renderTallyUp = (props: { petInd: number, behaviorInd: number, behaviorCategory: BehaviorCategory }): JSX.Element => {
    return (
      <Button
        icon={<Icons.Add />}
        onClick={() => this.incrementBehaviorTally({ asc: true, ...props })}
      />
    )
  }
  renderTallyDn = (props: { petInd: number, behaviorInd: number, behaviorCategory: BehaviorCategory }): JSX.Element => {
    let active: boolean = this.state.petList.behaviors[props.behaviorCategory][props.behaviorInd].tally > 0
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
      let oldP: PetInterface = prevState.petList;
      let oldB: Behavior[] = oldP.behaviors[props.behaviorCategory].slice();
      if (props.asc) {
        oldB[props.behaviorInd].tally++
      } else {
        if (oldB[props.behaviorInd].tally > 0) {
          oldB[props.behaviorInd].tally--
        }
      }
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
          <td key={rowkey + "-inc"}>
            {this.renderTallyDn({ petInd: 0, behaviorInd: index, behaviorCategory: category })}
            {this.renderTallyUp({ petInd: 0, behaviorInd: index, behaviorCategory: category })}</td>
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
      <thead><tr key="behavior-headers"><th>Behavior</th><th>Tally</th></tr></thead>
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
      <div>Class picker</div>
      // onChange={(e) => this.setState((prevState) => {
      //   let oldP: PetInterface = prevState.petList;

      //   oldP.petClass = e.target.value
      //   oldP.behaviors.class = this.bS.getBehaviorsForCategory(e.target.value)
      //   return ({
      //     petList: oldP
      //   })
      // })}
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
      <div>Type Picker</div>
      // onChange={(e) => this.setState((prevState) => {
      //   let oldP: PetInterface = prevState.petList;
      //   oldP.petType = e.target.value
      //   return ({
      //     petList: oldP
      //   })
      // })}
    )
  }

  render(): JSX.Element {
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
      <Grommet theme={this.theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                Hello Grommet!
                <Heading level='3' margin='none'>My App</Heading>
                <Button
                  icon={<Icons.Notification />}
                  onClick={() => this.setState(prevState => ({ showSidebar: !prevState.showSidebar }))}
                />
              </AppBar>
              <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                <Box flex align='center' justify='center'>
                  app body
                </Box>
                {(!this.state.showSidebar || size !== 'small') ? (
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
                        fill
                        background='light-2'
                        align='center'
                        justify='center'
                      >
                        sidebar
                       </Box>
                    </Layer>)}
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
