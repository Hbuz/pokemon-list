import React, { PureComponent } from 'react'
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export default class SignupForm extends PureComponent {
  state = {}

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <Grid container direction="column" spacing={4} alignItems="center">

            <Grid item container spacing={2}>
              <Grid item>
                USERNAME
                </Grid>
              <Grid item>
                <input type="username" name="username" value={this.state.username || ''}
                  onChange={this.handleChange} />
              </Grid>
            </Grid>

            <Grid item container spacing={2}>
              <Grid item>
                PASSWORD
                </Grid>
              <Grid item>
                <input type="password" name="password" value={this.state.password || ''}
                  onChange={this.handleChange} />
              </Grid>
            </Grid>

            <Grid item container spacing={2} justify="center">
              <Grid item>
                <Button type="submit">SIGN UP</Button>
              </Grid>
              <Grid item>
                <Link to="/login">
                  <Button type="button"> Cancel </Button>
                </Link>
              </Grid>
            </Grid>

          </Grid>

        </form>
      </div>
    )
  }
}