import React, { Component } from 'react';

class Imagen extends Component {
  constructor(props){
    super(props);

    this.getNombreImagen = this.getNombreImagen.bind(this);
  }

  getNombreImagen(){
    return "img/" + this.props.numFallos + ".jpg";
  }

  render() {
    return (
        <center><img src={this.getNombreImagen()} alt="80" /></center>
    );
  }
}

export default Imagen;
