import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";


const useStyles = makeStyles( theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    paddingTop: 32,
  }
}));


export default function UserSection(props) {

  const classes = useStyles(); 
  
  return (
    <Grid container>
      <Grid item>
        <TextField
          label="Username"
          className={classes.textField}
          value={props.currentUser && props.currentUser.username}
          margin="normal"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item className={classes.button}>
        <Link to="/login">
          <Button type="button" onClick={props.loggingOut}>Log Out</Button>
        </Link>
      </Grid>
    </Grid>
  )
}