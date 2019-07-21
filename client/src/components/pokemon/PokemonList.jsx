import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  list: {
    width: '100%',
    maxWidth: 360,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 400,
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  listElem: {
    onMouseOver: {backgroundColor: 'yellow'}
  },
  container: {
    padding: 16,
  }
}));

export default function PokemonList(props) {

  const classes = useStyles();

  return (
    <Grid container className={classes.container} direction="column">
      <Grid item>
        <Typography variant="h5">List of pokemons</Typography>
      </Grid>
      <Grid item>
        <ul className={classes.list}>
          {props.favorites && props.pokemons && props.pokemons.map(pokemon =>
            <li key={pokemon.id}>
              <div onClick={() => props.showDetails(pokemon.name)}>
                {props.favorites.includes(pokemon.id) &&
                  <span style={{ color: 'red' }}>{pokemon.id}: {pokemon.name}</span>
                }
                {!props.favorites.includes(pokemon.id) &&
                  <span>{pokemon.id}: {pokemon.name}</span>
                }
                <span> {props.favorites.includes(pokemon.id) && "X"}</span>
              </div>
            </li>
          )}
        </ul>
      </Grid>
    </Grid>
  )
}