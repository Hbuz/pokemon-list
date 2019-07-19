import * as React from 'react'
import Grid from "@material-ui/core/Grid";

export default function PokemonSearchForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item>
            <input type="text" name="searchKey" placeholder="Search Pokemon..." onChange={props.handleChange} />
        </Grid>
        <Grid item>
          <button type="submit">Search</button>
        </Grid>
      </Grid>
    </form>
  )
}