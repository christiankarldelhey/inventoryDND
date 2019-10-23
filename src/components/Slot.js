import React from 'react';
import { Card } from 'reactstrap';
import PropTypes from 'prop-types';
import Item from './Item.js'


export default class Slot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
 
    };
  }

  drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('transfer')
    this.props.dropDos(data, e.target)
  }

  allowDrop = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <Card 
      className='droppable' 
      name='card' 
      id={this.props.id} 
      onDrop={this.drop} 
      onDragOver={this.allowDrop} 
      onClick={this.props.showDetails}
      >
        {this.props.children}
      </Card>
    );
  }
}

Slot.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
}

