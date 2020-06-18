import React, { Component } from 'react';

import "./Botonera.css";

class Botonera extends Component {
  constructor(props){
    super(props);

    this.getBotonera = this.getBotonera.bind(this);
  }

  getBotonera(){
    return this.props.botones.map((boton, index) => (
      <button type="button" class={boton.estado == "no-pulsado" ? "btn btn-primary" : 
      (boton.estado == "pulsado-acertado" ? "success" : "btn btn-danger")}
             
              key={index}
              disabled={boton.estado != "no-pulsado" ? true : false }
              onClick={() => this.props.sePulsoBoton(index)}>
        {boton.letra}
      </button>
    ));
  }

  render() {
    return (
        <div id="botonera">
          {this.getBotonera()}
        </div>
    );
  }
}

export default Botonera;
