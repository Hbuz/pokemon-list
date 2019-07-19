import React, { PureComponent } from 'react'
import request from 'superagent'
import PokemonList from './PokemonList'
import PokemonDetails from './PokemonDetails'
import PokemonSearchForm from './PokemonSearchForm'
import UserSection from './UserSection'
import { logout } from '../../actions/auth'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import jsPDF from 'jspdf';



const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  container: {
    padding: 24
    // flexWrap: "wrap"
  },
  paper: {
    padding: 32
  },
  user: {
    marginRight: 32
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});


const PokemonContainer = withStyles(styles)(
  class extends PureComponent {

    constructor(props) {
      super(props)
      this.state = {
        pokemons: null,
        selected: null,
        favorites: null,
        favorite: false
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.loggingOut = this.loggingOut.bind(this)
    }

    componentDidMount() {
      //Get all pokemons
      request('http://localhost:4001/pokemons')
        .then(response => {
          this.setState({ pokemons: response.body.pokemons })
        })
        .then(() => {
          //Request 
          //UNCOMMNET TODO
          request(`http://localhost:4001/pokemons/favorites/${this.props.currentUser.userId}`)
            .then(response => {
              this.setState({ favorites: response.body.favorites.map(elem => (elem.pokemonId)) })
            })
        })

    }

    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(event) {
      event.preventDefault()
      request('http://localhost:4001/pokemons')
        .query({ name: this.state.searchKey })
        .then(response => {
          this.setState({ pokemons: response.body.pokemons })
        })     
    }

    showDetails = (pokemonName) => {
      request(`http://localhost:4001/pokemons/${pokemonName}`)
        .then(response => {
          this.checkFavorite(response.body.pokemon, this.state.favorites)
          this.setState({ selected: response.body.pokemon })
        })
    }

    changeFavorite = event => {
      const pokemonName = this.state.selected.name
      this.setState({ favorite: event.target.checked });
      if (event.target.checked) {
        //Add element to favorites in the state
        this.setState(prevState => ({
          favorites: [...prevState.favorites, prevState.selected.id]
        }))

        request
          .post(`http://localhost:4001/users/${this.props.currentUser.userId}`)
          .query({ name: pokemonName })
          .then(response => {
            console.log(`Pokemon ${pokemonName} added as favorite`)
          })
      } else {
        //Remove element from favorites in the state
        this.setState({ favorites: this.state.favorites.filter(fav => fav !== this.state.selected.id )})
        
        request
          .del(`http://localhost:4001/users/${this.props.currentUser.userId}`)
          .query({ name: pokemonName })
          .then(response => {
            console.log(`Pokemon ${pokemonName} removed from favorites`)
          })
      }
    }

    checkFavorite = selected => {
      request(`http://localhost:4001/pokemons/favorites/${this.props.currentUser.userId}`)
        .then(response => {
          const favorites = response.body.favorites.map(elem => (elem.pokemonId))
          if (favorites.includes(selected.id)) {
            this.setState({ favorite: true })
          } else {
            this.setState({ favorite: false })
          }
        })
    }


    loggingOut = () => {
      this.props.logout()
    }


    generatePdf = () => {
      const doc = new jsPDF()
      doc.text(`Id: ${this.state.selected.id}`, 10, 10)
      doc.text(`Name: ${this.state.selected.name}`, 10, 20)
      doc.text(`Weight: ${this.state.selected.weight}`, 10, 30)
      doc.text(`Height: ${this.state.selected.height}`, 10, 40)
      doc.text(`Base experience: ${this.state.selected.base_experience}`, 10, 50)
      doc.text(`Image URL: ${this.state.selected.image}`, 10, 60, { maxWidth: "180" })
      doc.text(`Favorite: ${this.state.favorite}`, 10, 80)
      doc.save('pokemon_details.pdf')
    }


    render() {
      const { classes } = this.props

      if (!this.state.pokemons) return "Loading..."

      return (
        <div>
          <Grid container className={classes.container} justify="space-evenly">
            <Grid item>
              <Grid container className={classes.container} direction="column">
                <Grid item>
                  <PokemonSearchForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
                </Grid>

                <Grid item>
                  <Grid container>
                    <PokemonList pokemons={this.state.pokemons} showDetails={this.showDetails}
                      favorites={this.state.favorites} />
                  </Grid>
                </Grid>

              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <UserSection loggingOut={this.loggingOut} currentUser={this.props.currentUser} />
                </Grid>

                <Grid item className={classes.paper}>
                  <PokemonDetails selected={this.state.selected} changeFavorite={this.changeFavorite}
                    favorite={this.state.favorite} currentUser={this.props.currentUser}
                    generatePdf={this.generatePdf} />
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </div>)
    }
  }
)

const mapStateToProps = function (state) {
  return {
    currentUser: state.currentUser,
    error: state.login.error
  }
}

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(PokemonContainer)