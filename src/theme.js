import { purple, deepOrange } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: deepOrange,
        secondary: purple
    }
})

export default theme;