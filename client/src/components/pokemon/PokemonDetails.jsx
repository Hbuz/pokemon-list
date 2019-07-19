import * as React from 'react'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import { CSVLink } from "react-csv";



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: 200,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  points: {
    maxWidth: 175,
  },
  checkbox: {
    width: 25,
    height: 25
  }
}));


export default function PokemonDetails(props) {

  const classes = useStyles();

  if (!props.selected) return "Select a Pokemon from the list"

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Typography gutterBottom variant="h5">
              <strong>{props.selected.name.toUpperCase()}</strong>
            </Typography>
          </Grid>
          <Grid item className={classes.image}>
            <img className={classes.img} src={props.selected.image} alt={props.selected.image} />
          </Grid>
          <Grid item container className={classes.points} spacing={1} direction="column">
            <Grid item container justify="space-between" alignItems="baseline">
              <Grid item>
                <Typography variant="h6">
                  Weight:
                  </Typography>
                  </Grid>
              <Grid item>
                <Typography variant="h5">
                  {props.selected.weight}
                </Typography></Grid>
            </Grid>
            <Grid item container justify="space-between" alignItems="baseline">
              <Grid item>
                <Typography variant="h6">
                Height: 
                </Typography>
                </Grid>
              <Grid item>
                <Typography variant="h5">
              {props.selected.height}
              </Typography>
              </Grid>

            </Grid>
            <Grid item container justify="space-between" alignItems="baseline">
              <Grid item>
                <Typography variant="h6">
                Base Exp: 
                </Typography>
                </Grid>
              <Grid item>
                <Typography variant="h5">
              {props.selected.base_experience}
              </Typography>
              </Grid>
            </Grid>

            {props.currentUser &&
              <Grid item container justify="space-between" alignItems="baseline">
                <Grid item>
                  <Typography gutterBottom variant="h6">
                    Favorite
                  </Typography>
                </Grid>
                <Grid item>
                  <input
                  className={classes.checkbox}
                    type="checkbox"
                    value="Favorite"
                    checked={props.favorite}
                    onChange={props.changeFavorite}
                  />
                </Grid>
              </Grid>
            }
            <Grid item container justify="space-between" alignItems="baseline">
              <Grid item>
                <Typography variant="h6">
                  Export
                </Typography>
              </Grid>
              <Grid item>
                
                <CSVLink data={[props.selected]} filename={"pokemon_details.csv"}>
                  <button>CSV</button>
                </CSVLink>
                <button onClick={props.generatePdf}>PDF</button>
               
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Paper>
    </div>
  )
}