import React, {Component} from 'react';
import '../App.css';
import {Button} from 'reactstrap';

class Footer extends Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }

render() {
 let item = this.props.itemSelected
  return (
    <div className='footer-wrapper'>
        <footer className='footer'>
            <div className='container'>
            {item.description  &&
                <div className='row'>
                    <div className='col-3'>
                        <img src={item.url} height='180' alt=""/>
                    </div>
                    <div className='col-9'>
                        <h5 className='mb-5'>{item.description}</h5>
                        <Button 
                        className='mr-2 mt-5' 
                        color="secondary" 
                        onClick={this.props.editItem}
                        >Editar item</Button>
                        <Button 
                        className='mr-2 mt-5' 
                        color="danger" 
                        // onClick={() => this.props.deleteItem(item)}
                        onClick={() => { if (window.confirm('¿Seguro querés eliminar este item?')) this.props.deleteItem(item) } }
                        >Eliminar item</Button>
                    </div>  
                </div>
            }
            </div>
        </footer>
    </div>
  );
}
}

export default Footer;