import React, {Component} from 'react';
import '../App.css';
// import {} from 'reactstrap';

class Footer extends Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }

render() {
 let item = this.props.itemSelected
  return (
    <footer className='footer'>
        <div className='container'>
            <div className='row'>
                <div className='col-3'>
                    <img src={item.url} height='180' alt=""/>
                </div>
                <div className='col-9'>
                    <h5>{item.description}</h5>
                    <button onClick={this.props.editItem}>Editar item</button>
                    <button onClick={() => this.props.deleteItem(item)}>Eliminar item</button>
                </div>  
            </div>
        </div>
    </footer>
  );
}
}

export default Footer;