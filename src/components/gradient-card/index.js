import React, {Component} from 'react';

import Copied from './components/copied'
import clickOutSide from '../click-outside';
import Slider from "./components/slider/index";
import Label from './components/label';
import {colorAtPoint, hex2rgb,getCssGradient} from '../../helpers/color';


import {CopyToClipboard} from 'react-copy-to-clipboard';

import './style.css'


class GradientCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      edit: false,
      originalColors: [],
      degree: '45deg'
    };
    this.onCopy = this.onCopy.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.onClickDegreeHorizont = this.onClickDegreeHorizont.bind(this);
    this.onClickDegreeVertical = this.onClickDegreeVertical.bind(this);
    this.onClickDegreeDiagonal = this.onClickDegreeDiagonal.bind(this);
    this.onClickDegreeRadial = this.onClickDegreeRadial.bind(this);
    this.onClickNeed = this.onClickNeed.bind(this);
    this.onClickRandom = this.onClickRandom.bind(this);
  }
  
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.gradient.colors !== this.state.originalColors) {
      this.setState({
        originalColors: [...nextProps.gradient.colors]
      })
    }
    if (nextProps.focused === false && this.props.focused === true) {
      this.setState({
        edit: false,
        copied: false
      });
    }
  }

  onClickDegreeHorizont() {
    this.setState({
      degree: 'to right'
    })
  }

  onClickDegreeVertical() {
    this.setState({
      degree: 'to bottom'
    })
  }

  onClickDegreeRadial() {
    this.setState({
      degree: 'ellipse at center'
    })
  }

  onClickDegreeDiagonal() {
    this.setState({
      degree: '45deg'
    })
  }

  componentDidMount() {
    this.setState({
      originalColors: [...this.props.gradient.colors]
    })
  }

  render() {
    const {gradient} = this.props;
    const {colors} = gradient;
    const {degree} = this.state;

    return (
      <div className='row'>
        <Copied active={this.state.copied}/>
        <div className='col-md-8'>
          <div className="Gradient__preview">
            <div className="gradient-box" style={{background: getCssGradient({...gradient, degree:degree})}}/>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='Gradient__settings'>
            <div className="Gradient__settings--content">
              <h1>CSS Gradient Generator</h1>
              <Slider
                background={getCssGradient({
                  ...gradient,
                  degree:'to right',
                  colors:this.state.originalColors
                })}
                colors={colors}
                onChange={this.onSliderChange}
              />
              <div className="color-names">
                {
                  colors.map((color, index) => (
                    <Label
                      key={index}
                      onChange={(color) => {
                        this.changeColor(color, index)
                      }}
                      color={colors[index].color}
                      edit={this.state.edit}/>
                  ))
                }
              </div>
            </div>
            <div className='btn-group'>
              <button
                onClick={this.toggleEdit}
                className="btn btn-block">
                Edit colors <i className={`fa ${this.state.edit === true ? 'fa-times' : 'fa-pencil'}`}/>
              </button>
              <button
                onClick={this.onClickRandom}
                className="btn btn-block">
                Random <i className='fa fa-refresh'/>
              </button>
            </div>
            <div className='Gradient__degree'>
                <button className='Gradient__degree--btn'
                  onClick={this.onClickDegreeHorizont}
                >
                  <i className="fa fa-exchange"/>
                  horizontal
                </button>
                <button className='Gradient__degree--btn'
                  onClick={this.onClickDegreeVertical}
                >
                  <i className="fa fa-exchange vertical_icon"/>
                  vertical
                </button>
                <button className='Gradient__degree--btn'
                  onClick={this.onClickDegreeRadial}
                >
                  <i className="fa fa-bullseye"/>
                  radial
                </button>
                <button className='Gradient__degree--btn'
                  onClick={this.onClickDegreeDiagonal}
                >
                  <i className="fa fa-arrows-h diagonal_icon"/>
                  diagonal
                </button>
            </div>
            <div className='Gradient__code'>
              <pre>
                background:{getCssGradient({...gradient, degree:degree})};
              </pre>
              <CopyToClipboard text={`background:${getCssGradient({...gradient, degree:degree})};`} onCopy={this.onCopy}>
                  <button className='btn btn-block btn-green'>
                    Copy CSS <i className="fa fa-css3"/>
                  </button>
              </CopyToClipboard>
            </div>
            <button className='btn btn-block btn-yellow'
              onClick={this.onClickNeed}
            >
              Need inspiration? <i className="fa fa-paint-brush"/>
            </button>
          </div>
        </div>
      </div>
    );
  }

  onClickNeed() {
    this.props.parentObject.toggleDemoColors(true);
  }

  onClickRandom() {
    this.props.parentObject.setRandomColor();
  }

  onSliderChange(index, position) {

    console.log(this.state.originalColors)
    const lastColor = this.state.originalColors[this.state.originalColors.length - 1].color;
    const firstColor = this.state.originalColors[0].color;
    const resultColor = colorAtPoint(
      position,
      hex2rgb(lastColor),
      hex2rgb(firstColor)
    );
    this.props.onChange(this.props.gradient.colors.map((color, colorIndex) => {
      if (colorIndex === index) {
        return {
          ...color,
          color: resultColor,
          degree: this.state.degree,
          position
        };
      }
      return color
    }))
  }


  changeColor(resultColor, index) {
    const {colors} = this.props.gradient;
    const result = colors.map((color, colorIndex) => {
      const position = colorIndex / (colors.length - 1);
      if (colorIndex === index) {
        return {
          ...color,
          position,
          degree: this.state.degree,
          color: resultColor
        };
      } else {
        return {
          ...color,
          degree: this.state.degree,
          position
        }
      }
    });
    this.setState({
      originalColors: result
    });
    this.props.onChange(result)
  }

  onCopy() {
    this.setState({copied: true})
    setTimeout(() => {
      this.setState({copied: false})
    }, 1200)
  }

  toggleEdit() {
    this.setState({
      edit: this.state.edit === false
    })
  }
}

export default clickOutSide(GradientCard);
