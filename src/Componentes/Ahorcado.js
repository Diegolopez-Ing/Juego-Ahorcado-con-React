import React, { Component } from 'react';
import Imagen from './Imagen';
import Botonera from './Botonera';
import PalabraAdivinadaHastaElMomento from './PalabraAdivinadaHastaElMomento';


class Ahorcado extends Component {
  constructor(props) {
    super(props);

    this.getBotoneraVacia = this.getBotoneraVacia.bind(this);
    this.sePulsoBoton = this.sePulsoBoton.bind(this);
    this.getPalabraAAdivinar = this.getPalabraAAdivinar.bind(this);
    this.getPalabraAdivinadaHastaElMomento = this.getPalabraAdivinadaHastaElMomento.bind(this);
    this.openModal = this.openModal.bind(this);

    let palabraAAdivinar = this.getPalabraAAdivinar();

    this.state = {
      numFallos: 0,
      numAciertos: 0,
      palabraAAdivinar: palabraAAdivinar,
      palabraAdivinadaHastaElMomento: this.getPalabraAdivinadaHastaElMomento(palabraAAdivinar),
      botones: this.getBotoneraVacia()
    };
  }

  getPalabraAdivinadaHastaElMomento(palabra) {
    let guiones = "";
    for (let i = 0; i < palabra.length; i++) {
      guiones += "-";
    }
    return guiones;
  }

  getPalabraAAdivinar() {
    let palabras = ["CARACOLA", "ESPECIMEN", "PERSONA","INGENIERRO","GANADOR","GUITARRA"];
    let numAleatorio = Math.floor(Math.random() * palabras.length);
    let palabra = palabras[numAleatorio];
    return palabra;
  }

  getBotoneraVacia() {
    let letras = [
      "A", "B", "C", "D", "E", "F", "G",
      "H", "I", "J", "K", "L", "M", "N",
      "Ñ", "O", "P", "Q", "R", "S", "T",
      "U", "V", "W", "X", "Y", "Z"
    ];

    let botones = [];

    botones = letras.map((l) => ({ letra: l, estado: "no-pulsado" }));

    return botones;

  }

  sePulsoBoton(i) {
    let letra = this.state.botones[i].letra;
    let botonesAux = this.state.botones;

    if (this.hayAcierto(letra)) {
      botonesAux[i].estado = "pulsado-acertado";
      this.setState((prevState) => ({
        botones: botonesAux
      }));
    } else {
      botonesAux[i].estado = "pulsado-no-acertado";
      this.setState((prevState) => ({
        numFallos: ++(prevState.numFallos),
        botones: botonesAux
      }));
    }
  }

  componentDidUpdate() {
    if (this.state.numAciertos == this.state.palabraAAdivinar.length) {
        this.openModal("¡Felicitaciones Ganaste!");
      this.reinicilizar();
    }
    if (this.state.numFallos == 6) {
      this.openModal("¡Perdiste!");
      this.reinicilizar();
    }
  }

  reinicilizar() {
    let palabraAAdivinar = this.getPalabraAAdivinar();

    this.setState({
      numFallos: 0,
      numAciertos: 0,
      palabraAAdivinar: palabraAAdivinar,
      palabraAdivinadaHastaElMomento: this.getPalabraAdivinadaHastaElMomento(palabraAAdivinar),
      botones: this.getBotoneraVacia()
    });
  }

  hayAcierto(letra) {
    let acierto = false;
    for (let i = 0; i < this.state.palabraAAdivinar.length; i++) {
      if (this.state.palabraAAdivinar.charAt(i) === letra) {
        this.setState((prevState) => ({
          numAciertos: ++(prevState.numAciertos),
          palabraAdivinadaHastaElMomento:
            prevState.palabraAdivinadaHastaElMomento.substr(0, i) +
            letra +
            prevState.palabraAdivinadaHastaElMomento.substr(i + 1)
        }));
        acierto = true;
      }
    }
    return acierto;
  }

  render() {
    return (
      <div className="container">
        <div className="row">

        <div class="col-sm-12">
        <div className="jumbotron">
          <h1><center>EXAMEN 1 REACT BASIC 2020</center></h1>
          <h3><center>Diego Alberto Lopez Murillo</center></h3>
          </div>
          </div>
       </div>

        <div className="row justiy-content-start">
          <div class="col-6">
            <div className="jumbotron">
              <center><div class="alert alert-primary" role="alert">
                
                  <h2>Le quedan {6-parseInt(this.state.numFallos)} intentos </h2>
                </div></center>
              <Imagen numFallos={this.state.numFallos} />
              <PalabraAdivinadaHastaElMomento
                PalabraAdivinadaHastaElMomento={this.state.palabraAdivinadaHastaElMomento} />
              
              <alert ref={(el) => { this.dialog = el }} />
            </div>
          </div>

          <div class="col-sm-6">
      <div className="jumbotron">
              <Botonera sePulsoBoton={(i) => this.sePulsoBoton(i)} botones={this.state.botones} />
              
            </div>
       </div>
      </div>

     

      </div>
    );
  }

    openModal(mensaje){
      var mensajes=mensaje + " la palabra era " + this.state.palabraAAdivinar
      alert(mensajes)
     
    }

}



export default Ahorcado;
