import './App.css';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import AddSong from './components/AddSong'
import { Grid, Hidden, useMediaQuery } from '@material-ui/core'
import { createContext, useContext, useReducer } from 'react';
import songReducer from './reducer';

export const SongContext = createContext({
	song: {
		id: "e7807bc9-46f3-413f-8da1-a2b817f98bdc",
		title: "Perfect (Official Music Video)",
		artist: "Ed Sheeran",
		thumbnail: "http://img.youtube.com/vi/2Vv-BfVoq4g/0.jpg",
		url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
		duration: 280
	},
	isPlaying: false
})

function App() {
	const initialSongState = useContext(SongContext);
	const [state, dispatch] = useReducer(() => songReducer, initialSongState);
	const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'))
	const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'))

	return (
		<SongContext.Provider value={{ state, dispatch }}>
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
		</SongContext.Provider>
	);
}

export default App;
