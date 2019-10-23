import React from 'react';
import PropTypes from 'prop-types';


export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  drag = (e) => {
    e.dataTransfer.setData('transfer', e.target.id)
    console.log(document.getElementById(e.target.id))
  }

  noAllowDrop = (e) => {
    e.stopPropagation()
  }

  render() {
    return (
      <div 
      id={this.props.id} 
      className='item-wrapper' 
      name='itemWrapper' 
      imgsrc={this.props.imgsrc} 
      draggable='true' 
      onDragStart={this.drag} 
      onDragOver={this.noAllowDrop}>
       {this.props.children}
      </div>
    );
  }
}

Item.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
}
