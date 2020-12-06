import './App.css';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import AddSong from './components/AddSong'
import { Grid, Hidden, useMediaQuery } from '@material-ui/core'

function App() {
	const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'))
	const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'))

	return (
		<>
			<Hidden only="xs">
				<Header />
			</Hidden>
			{/* {greaterThanSm && <Header />} */}
			<Grid container={ true } spacing={ 3 }>
				<Grid 
					style={{ 
						paddingTop:  greaterThanSm ?  '80px' : '10px' 
					}} 
					item xs={ 12 } md={ 7 }
				>
					<AddSong />
					<SongList />
				</Grid>
				<Grid 
					style ={ 
						greaterThanMd ? 
							{ position: 'fixed', width: '100%', right: 0, top: 70 }
						:
							{ position: 'fixed', left: 0, bottom: 0, width: '100%' }
					} 
					item xs= { 12 }  md={ 5 }
				>
					<SongPlayer />
				</Grid>
			</Grid>
		</>
	);
}

export default App;
