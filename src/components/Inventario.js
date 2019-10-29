import React, {Component} from 'react';
import '../App.css';
import firebase from 'firebase';
import Slot from './Slot.js';
import Item from './Item.js';
import Header from './Header.js';
import Footer from './Footer.js'; 
import UploadForm from './Uploadform.js'; 
import { Modal } from 'reactstrap';

class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'view',
      modal: false,
      inventario: [],
      itemSelected: []
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
 
//Function to fill slots with items 
  populateSlots = (slotid) => {
      let r = this.state.inventario.filter((item) => item.slotid === slotid)
      if (r.length > 0) {
      return (
      <Item id={String(r[0].id)} > 
        <img 
        className='item-img mx-auto d-block' 
        name='imagen' 
        id={String(r[0].id)} 
        src={r[0].url} 
        alt={r[0].description}
        /> 
      </Item>
      )
    }
  }

//On image drop passes new position to firebase 
  dropDos = (itemId, slot ) => {
    let itemFound = this.state.inventario.filter((item) => item.id == itemId)
    //Search index of item in state
    let indexItem = this.state.inventario.indexOf(itemFound[0])
    //Modify state with new item-position writes to firebase
    let newState = this.state.inventario;
    newState[indexItem].slotid = parseInt(slot.id);
    this.setState({ inventario: newState})
    //Copy to firebase
    this.writeUserData(newState)
    console.log('DATA WRITTEN')
  }

//Capture initial state from firebase
  getUserData = () => {
    let that = this;
    let ref = firebase.database().ref('/Inventario');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      that.setState(state);
    })
    console.log('DATA RETRIEVED');
  }

//Pass state to firebase
  writeUserData = (newState) => {
    firebase.database().ref('/Inventario/inventario').set(newState);
    console.log('DATA SAVED');
}

  suboAInventario = (newItem) => {
    let newState = this.state.inventario;
    //Edit item
    if (this.state.mode === 'edit') {
      let itemEdited = this.state.inventario.filter((item) => item.id == newItem.id)
      let i = this.state.inventario.indexOf(itemEdited[0])
    //replace item (edit)
      newState[i] = newItem
      console.log(newItem)
      this.setState({itemSelected: newItem})
    } 
    //Create new item
    else {
      newItem.id = ((newState[newState.length - 1].id) + 1)
      newState.push(newItem); 
    }
    this.setState({ inventario: newState})
    this.writeUserData(newState)
    this.toggle()
  }

  showDetails = (e) => {
    //Check if slot has no items
    let isEmpty = document.getElementById(e.target.id).innerHTML === "";
    if (isEmpty === false) {
    //Search in inventory for selected item
      let itemSelected = this.state.inventario.filter((item) => item.id == e.target.id)
    //Write state with item selected
      this.setState({itemSelected: itemSelected[0]})
    } else {
      this.setState({currentEmptySlot: e.target.id})
      this.newItem()
    }
  }

  newItem = () => {
    this.setState({mode: 'new'})
    this.toggle()
  }

  editItem = () => {
    this.setState({mode: 'edit'})
    this.toggle()
  }

  deleteItem = (item) => {
    //Capture actual inventory
    let newState = this.state.inventario
    console.log(newState)
    //Capture index of item to erase
    let indexItem = this.state.inventario.indexOf(item)
    console.log(newState[indexItem])
    //Delete element in the index
    newState.splice(indexItem, 1); 
    this.setState({ inventario: newState})
    this.setState({ itemSelected: []})
    this.writeUserData(newState)
  }

//Capture state from firebase 
  componentDidMount() {
    this.getUserData()
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className='inventory'>
          <div className='container'>
          <h5>Hay {this.state.inventario.length} elementos en el inventario</h5>
          {
            Array.apply(null, { length: (96 )}).map((e, i) => (
            <Slot 
            className='slot' 
            key={String(i)} 
            id={String(i)} 
            dropDos={this.dropDos}
            showDetails={this.showDetails}
            > 
              {
                this.populateSlots(i)
              }
            </Slot>
            ))
          }
          </div>
        </div>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          {
            this.state.idCounter !== undefined && 
            <UploadForm 
            toggle={this.toggle}
            suboAInventario = {this.suboAInventario}
            mode= {this.state.mode}
            itemSelected={this.state.itemSelected}
            currentEmptySlot={this.state.currentEmptySlot}
            />
          }
        </Modal>
        <Footer 
          itemSelected={this.state.itemSelected}
          deleteItem={this.deleteItem}
          editItem={this.editItem}
        />
      </div>
    );
  }
  
}



export default Inventario;
