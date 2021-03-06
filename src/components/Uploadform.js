import React, {Component} from 'react';
import '../App.css';
import firebase from 'firebase';
import { Button, ModalHeader, ModalBody, ModalFooter, Form, Input, Label, FormGroup } from 'reactstrap';


class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      uploadValue: 0,
      description: '',
      id: undefined,
      slotid: undefined
    }
  }

  handleInput = (event) => {
    console.log(event)
    console.log(event.target.value)
    console.log(event.target.name)
    this.setState({ [event.target.name]: event.target.value  })
  }
  handleNumber = (event) => {
    console.log(event)
    console.log(event.target.value)
    console.log(event.target.name)
    this.setState({ [event.target.name]: parseInt(event.target.value)  })
  }


  //Subo img del item
  handleUpload = (event) =>
  {
    console.log(this.state.uploadValue)
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/PJs/${file.name}`);
    const task = storageRef.put(file);
      task.on('state_changed' , snapshot =>{
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percentage)
      this.setState({
        uploadValue : percentage
      })
    } , error =>{
      console.log(error.message);
    } , () =>{
         storageRef.getDownloadURL().then(url => {  
        this.setState({
          url: url
        });               
      })
    });
  }


  componentDidMount() {
   //On edit element catch item selected to edit
   if (this.props.mode === 'edit') {
    let itemSelected = this.props.itemSelected
    this.setState({
      ...itemSelected
    })
   } else {
    //On new element catch an empty state with current empty slot and assign an unused id
    console.log(this.props.currentEmptySlot)
    this.setState({slotid:parseInt(this.props.currentEmptySlot)} )
    console.log(this.props.idCounter)
    this.setState({id:this.props.idCounter})
   }
  }  


render() {
    return (
      <div>
        <ModalHeader>{this.props.mode === 'edit' ? 'Editar item' : 'Crear item'}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="examplePassword">Subi la imagen</Label>
                <Input type="file" name="file" id="exampleFile" onChange={this.handleUpload} />
                <progress value={this.state.uploadValue} max='100'></progress>
                  <img className='col-8' width='150' src={this.state.url} alt=""/>
              </FormGroup>
              <FormGroup>
                <Label for="description">Descripcion</Label>
                <Input type="text" name="description" id="description" value={this.state.description} onChange={this.handleInput} placeholder="description" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.props.suboAInventario(this.state)}>Subir item</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancelar</Button>
        </ModalFooter>
      </div>
    )
}

}

export default UploadForm;