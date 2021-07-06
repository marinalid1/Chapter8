import { createMuiTheme } from '@material-ui/core/styles'
import { blueGrey, lightGreen } from '@material-ui/core/colors'

// Change primary color from #8eacbb to #bb8e8e
const theme = createMuiTheme({
    palette: {
      primary: {
      light: '#8eacbb',
      main: '#bb8e8e',
      dark: '#34515e',
      contrastText: '#fff',
    },
    // Change secondary color from to #59f7ff
    secondary: {
      light: '#e7ff8c',
      main: '#59f7ff',
      dark: '#7ecb20',
      contrastText: '#000',
    },
      openTitle: blueGrey['400'],
      protectedTitle: lightGreen['400'],
      type: 'light'
    }
  })

  export default theme