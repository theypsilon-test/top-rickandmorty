import Grid from '@mui/material/Grid'
import { debounce } from 'lodash'
import TextField from '@mui/material/TextField';

const TextFilter = ({label, handler, defaultValue}: {label: string, handler: any, defaultValue: string}) => {
    const onChange = debounce(e => handler(e.target.value), 500)

    return (
      <Grid item xs={12} md={2}>
        <TextField
          id="outlined-name"
          label={label}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      </Grid>
    )
}

export default TextFilter