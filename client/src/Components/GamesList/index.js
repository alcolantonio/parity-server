import 'whatwg-fetch'
import _ from 'lodash'
import React, { Component } from 'react'
import TopNav from '../TopNav'
import SideNav from '../SideNav'
import Loading from '../Loading'

export default class GamesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      games: []
    }
  }

  componentWillMount() {
    fetch('/api/games')
      .then(response => response.json())
      .then(games => { this.setState({loading: false, games: games}) })
  }

  renderGames (games) {
    return _.map(games, (game) => {
      const gameName = `${game.homeTeam} vs ${game.awayTeam}`
      return (
        <li key={gameName}>
          { gameName }
        </li>
      )
    })
  }

  renderNav () {
    return (
      <TopNav>
        <SideNav/>
      </TopNav>
    )
  }

  renderMain () {
    const { loading, games } = this.state

    if (loading) return (<Loading />)

    return (
      <ul>
        { this.renderGames(games) }
      </ul>
    )
  }

  render () {
    return (
      <div>
        { this.renderNav() }
        { this.renderMain() }
      </div>
    )
  }
}
