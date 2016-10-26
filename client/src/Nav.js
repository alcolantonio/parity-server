// @flow

import _map from 'lodash/map'
import React, { Component } from 'react'
import {Dropdown, NavItem} from 'react-materialize'

type Props = {
  week: number,
  weeks: Array<any>,
  weekChange: (week: number) => void,
};

class Nav extends Component {
  props: Props

  weekText (num: number) {
    if (num === 0) {
      return 'All'
    } else {
      return `Week ${num}`
    }
  }

  renderWeeks (weeks: Array<any>) {
    return _map(weeks, (week) => {
      return (
        <NavItem key={week} onClick={() => { this.props.weekChange(week) } }>
          {this.weekText(week)}
        </NavItem>
      )
    })
  }

  render () {
    let week = this.props.week
    let weeks = this.props.weeks

    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo center hide-on-med-and-down">Parity 2.0</a>
          <a href="#" className="brand-logo left hide-on-large-only">Parity 2.0</a>

          <ul className="left hide-on-med-and-down">
            <li style={{lineHeight: '40px'}}>
              <a href="https://github.com/kevinhughes27/parity-server" target="_blank">
                <i className="fa fa-3x fa-github" aria-hidden="true"></i>
              </a>
            </li>
          </ul>

          <ul className="right">
            <Dropdown trigger={
                <a className="dropdown-button">
                  {this.weekText(week)}
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              }>
              {this.renderWeeks(weeks)}
            </Dropdown>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav