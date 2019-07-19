import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

export default class LoginForm extends PureComponent {
  state = {}

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit(this.state)
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
                <input type="text" name="username" value={this.state.username || ''}
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

            <Grid item>
              <Button type="submit">Login</Button>
            </Grid>

          </Grid>
        </form>
      </div>)
  }
}