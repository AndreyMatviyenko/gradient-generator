import React, {Component} from 'react';

import './App.css';
import GradientCard from "./components/gradient-card";
import Footer from "./components/footer/index";
import {getCssGradient} from './helpers/color'

const randomColor = () => {
  return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
}

const makeGradientObject = () => {
  return {
    colors: [
      {color: randomColor(), position: 0},
      {color: randomColor(), position: 1}
    ]
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      gradients: [
        makeGradientObject()
      ],
      demoGradients: [
        {"colors": [{ "color": "#fcdf8a" }, { "color": "#f38381" }]},
        {"colors": [{ "color": "#52ACFF" }, { "color": "#FFE32C" }]},
        {"colors": [{ "color": "#8EC5FC" }, { "color": "#E0C3FC" }]},
        {"colors": [{ "color": "#2BD2FF" }, { "color": "#2BFF88" }]},
        {"colors": [{ "color": "#FF3CAC" }, { "color": "#2B86C5" }]},
        {"colors": [{ "color": "#85FFBD" }, { "color": "#FFFB7D" }]},
        {"colors": [{ "color": "#A9C9FF" }, { "color": "#FFBBEC" }]},
        {"colors": [{ "color": "#EE74E1" }, { "color": "#3EECAC" }]},
        {"colors": [{ "color": "#434343" }, { "color": "#000000" }]},
        {"colors": [{ "color": "#d558c8" }, { "color": "#24d292" }]},
        {"colors": [{ "color": "#dcb0ed" }, { "color": "#99c99c" }]},
        {"colors": [{ "color": "#a8caba" }, { "color": "#5d4157" }]},
        {"colors": [{ "color": "#16a085" }, { "color": "#f4d03f" }]},
        {"colors": [{ "color": "#e8198b" }, { "color": "#c7eafd" }]},
        {"colors": [{ "color": "#0fd850" }, { "color": "#f9f047" }]},
        {"colors": [{ "color": "#cc208e" }, { "color": "#f9d423" }]},
      ],
      showDemo: false
    };
    this.onChange = this.onChange.bind(this);
    this.toggleDemoColors = this.toggleDemoColors.bind(this);
    this.setRandomColor = this.setRandomColor.bind(this);
    this.setDemoColors = this.setDemoColors.bind(this);
  }

  setRandomColor() {
    this.setState({
      gradients: [
        makeGradientObject()
      ]
    })
  }

  render() {
    return (
      <div>
        <section>
          <div className='container-fluid'>
            {
              this.state.gradients.map((gradient, index) => (
                <GradientCard
                  gradient={gradient}
                  key={index}
                  parentObject={this}
                  onChange={(gradient) => this.onChange(index, gradient)}/>
              ))
            }
          </div>
        </section>
        <div className={`Gradient__demo ${this.state.showDemo ? 'show' : ''}`}>
          <button className='demo-close'
            onClick={this.toggleDemoColors}
          >
           Close <i className="fa fa-close"/>
          </button>
          <div className='Gradient__demo--inner row'>
            {
              this.state.demoGradients.map((colors, index) => (
                <div className='col-xs-6 col-sm-4 col-md-3' key={index}>
                  <div className='Gradient__demo--card' style={{background: getCssGradient({colors: colors.colors, degree:'to right'})}}
                    onClick={this.setDemoColors.bind(this, colors)}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  setDemoColors(colors) {
    this.setState({
      gradients: [
        colors
      ],
      showDemo: !this.state.showDemo
    })
  }

  toggleDemoColors() {
    this.setState({
      showDemo: !this.state.showDemo
    })
  }

  onChange(index, result) {
    this.setState({
      gradients: this.state.gradients.map((gradient, gradientIndex) => {
        if (index === gradientIndex) {
          return {
            ...gradient,
            colors: [
              ...result
            ]
          };
        }
        return gradient
      })
    })
  }
}

export default App;
