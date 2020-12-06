import { deepOrange, deepPurple } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: deepOrange,
        secondary: deepPurple
    }
})

export default theme;