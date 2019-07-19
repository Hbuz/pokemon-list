import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { login } from '../../actions/auth'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: 64,
    //flexWrap: 'wrap'
  },

})


const LoginFormContainer = withStyles(styles)(
  class extends Component {

    state = { username: '', password: '' }

    handleSubmit = (event) => {
      this.props.login(event.username, event.password)
    }


    render() {
      if (this.props.currentUser) return (
        <Redirect to="/pokemons" />
      )

      const { classes } = this.props

      return (
        <div className={classes.root}>
          <Grid container className={classes.container} spacing={8} direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h2">
                LOGIN PAGE
              </Typography>
            </Grid>

            <Grid item>
              <LoginForm handleSubmit={this.handleSubmit} />
              {this.props.error && <span style={{ color: 'red' }}>{this.props.error}</span>}
            </Grid>
            
            <Grid item>
              <Link to="/signup">
                <Button>SIGN UP</Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
)


const mapStateToProps = function (state) {
  return {
    currentUser: state.currentUser,
    error: state.login.error
  }
}

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer)