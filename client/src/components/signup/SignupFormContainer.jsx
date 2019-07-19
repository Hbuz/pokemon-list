import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../actions/auth'
import SignupForm from './SignupForm'
import { Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: 24,
    flexWrap: 'wrap'
  }
})



const SignupFormContainer = withStyles(styles)(
  class extends PureComponent {

    handleSubmit = (data) => {
      this.props.postSignup(data.username, data.password)
    }

    render() {
      if (this.props.signup.success) return (
        <Redirect to="/" />
      )

      const { classes } = this.props

      return (
        <div>
            <Grid container className={classes.container} spacing={8} direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h3">
                SIGN UP PAGE
              </Typography>
            </Grid>
            <Grid item>
              <SignupForm onSubmit={this.handleSubmit} />
            </Grid>
            <Grid item>
              <p style={{ color: 'red' }}>{this.props.signup.error}</p>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
)

const mapStateToProps = function (state) {
  return {
    signup: state.signup
  }
}

const mapDispatchToProps = { postSignup: signup }

export default connect(mapStateToProps, mapDispatchToProps)(SignupFormContainer)
