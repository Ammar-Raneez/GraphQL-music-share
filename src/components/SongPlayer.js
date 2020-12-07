import { useQuery } from '@apollo/client'
import { Card, CardContent, CardMedia, IconButton, makeStyles, Slider, Typography } from '@material-ui/core'
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons'
import React, { useContext, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { SongContext } from '../App'
import { GET_QUEUED_SONGS } from '../graphql/queries'
import QueueSongList from './QueueSongList'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 15px'
    },
    content: {
        flex: '1 0 auto'
    },
    thumbnail: {
        width: 150
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 38
    }
}))

function SongPlayer() {
    const { data } = useQuery(GET_QUEUED_SONGS);
    const reactPlayerRef = useRef();
    const { state, dispatch } = useContext(SongContext);
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const classes = useStyles();

    function handleTogglePlay() {
        dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' });
    }

    function handleProgressChange(event, newValue) {
        setPlayed(newValue);
    }

    function handleSeekMouseDown() {
        setSeeking(true);
    }

    function handleSeekMouseUp() {
        setSeeking(false);
        reactPlayerRef.current.seekTo(played);
    }

    function formatDuration(seconds) {
        console.log(new Date(seconds * 1000).toISOString())
        return new Date(seconds * 1000).toISOString().substring(11, 19);
    }

    return (
        <div>
            <Card className={classes.container} variant="outlined">
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component="h3">
                            {state.song.title}
                        </Typography>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            {state.song.artist}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={handleTogglePlay}>
                            {state.isPlaying? <Pause className={classes.playIcon} /> : <PlayArrow className={classes.playIcon} />}
                        </IconButton>
                        <IconButton>
                            <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            {formatDuration(playedSeconds)}
                        </Typography>
                    </div>
                    <Slider 
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={handleSeekMouseUp}
                        onChange={handleProgressChange}
                        value={played} type="range" min={0} max={1} step={0.01} 
                    />
                </div>
                <ReactPlayer
                    ref={reactPlayerRef}
                    onProgress={({played, playedSeconds}) => {
                        if(!seeking) {
                            setPlayed(played);
                            setPlayedSeconds(playedSeconds);
                        }
                    }}
                    hidden url={state.song.url} playing={state.isPlaying} 
                />
                <CardMedia 
                    className={classes.thumbnail}
                    image={state.song.thumbnail}
                />
            </Card>
            <QueueSongList queue={data.queue} />
        </div>
    )
}

export default SongPlayer
