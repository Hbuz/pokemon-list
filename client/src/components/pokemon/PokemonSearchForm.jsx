import * as React from 'react'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default function PokemonSearchForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item>
            <input type="text" name="searchKey" placeholder="Search Pokemon..." onChange={props.handleChange} />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" size="small" type="submit">Search</Button>
        </Grid>
      </Grid>
    </form>
  )
}