import { useMutation } from '@apollo/client'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import { AddBoxOutlined, Link } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
//justifies whether a given url is playable
import ReactPlayer from 'react-player'
import { ADD_SONGS } from '../graphql/mutations'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    urlInput: {
        margin: theme.spacing(1)
    },
    addSongButton: {
        margin: theme.spacing(1)
    },
    dialog: {
        textAlign: 'center'
    },
    thumbnail: {
        width: '90%'
    }
}))

const DEFAULT_SONG = {
    duration: 0,
    title: "",
    artist: "",
    thumbnail: ""
}

function AddSong() {
    const classes = useStyles();
    const [addSong, { error }] = useMutation(ADD_SONGS);
    const [dialog, setDialog] = useState(false);
    const [url, setUrl] = useState("");
    const [playable, setPlayable] = useState(false);
    const [song, setSong] = useState(DEFAULT_SONG)

    useEffect(() => {
        //only valid urls will work
        const isPlayable = ReactPlayer.canPlay(url);
        setPlayable(isPlayable);
    }, [url])

    function handleChangeSong(event) {
        const { name, value } = event.target;
        //what we do here is update only the texfield that we change
        //whilst keeping everything else the same
        //reference to the edited textfield is obtained through the name property
        setSong(prevSong => ({
            ...prevSong,
            [name]: value
        }))
    }

    async function handleAddSong() {
        try {
            const { url, thumbnail, duration, title, artist } = song
            //logic to make sure all values are filled
            //done through hasura NOT in react
            //we specified "!" for the fields on our gql
            await addSong({
                variables: {
                    url: url.length > 0 ? url : null,
                    thumbnail: thumbnail.length > 0 ? thumbnail : null,
                    duration: duration > 0 ? duration : null,
                    title: title.length > 0 ? title : null,
                    artist: artist.length > 0 ? artist : null,
                }
            })
            handleSetDialog()
            setSong(DEFAULT_SONG)
            setUrl('')
        } catch(error) {
            console.error("Error adding song", error);
        }
    }

    function handleSetDialog() {
        setDialog(false);
    }

    async function handleEditSong({ player }) {
        const nestedPlayer = player.player.player;
        let songData;
        if(nestedPlayer.getVideoData) {
            songData = getYoutubeInfo(nestedPlayer);
        } else if(nestedPlayer.getCurrentSound) {
            songData = await getSoundcloudInfo(nestedPlayer);
        }
        setSong({ ...songData, url })
    }

    function getYoutubeInfo(player) {
        const duration = player.getDuration();
        const { title, video_id, author } = player.getVideoData();
        const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`
        return {
            duration,
            title,
            artist: author,
            thumbnail
        }
    }
    function getSoundcloudInfo(player) {
        return new Promise(resolve => {
            player.getCurrentSound(songData => {
                if(songData) {
                    resolve ({
                        duration: Number((songData.duration) / 1000),
                        title: songData.title,
                        artist: songData.user.username,
                        thumbnail: songData.artwork_url.replace("-large", "-t500x500")
                    })
                }
            })
        })
    }

    function handleDialogInputError(field) {
        return error?.graphQLErrors[0]?.extensions?.path.includes(field);
    }

    const { thumbnail, title, artist } = song;

    return (
        <div className={classes.container}>
            <Dialog className={classes.dialog} open={dialog} onClose={handleSetDialog}>
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img alt="Thumbnail" className={classes.thumbnail} src={thumbnail} />
                    <TextField helperText={handleDialogInputError('title') && 'Fill out field'} 
                        error={handleDialogInputError('title')} onChange={handleChangeSong} value={title} fullWidth margin="dense" 
                        name="title" label="Title" 
                    />
                    <TextField helperText={handleDialogInputError('artist') && 'Fill out field'} 
                        error={handleDialogInputError('artist')} onChange={handleChangeSong} value={artist} fullWidth margin="dense" 
                        name="artist" label="Artist" 
                    />
                    <TextField helperText={handleDialogInputError('thumbnail') && 'Fill out field'} 
                        error={handleDialogInputError('thumbnail')} onChange={handleChangeSong} value={thumbnail} fullWidth margin="dense" 
                        name="thumbnail" label="Thumbnail" 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSetDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleAddSong} variant="outlined" color="primary">Add Song</Button>
                </DialogActions>
            </Dialog>

            <TextField 
                className={classes.urlInput} onChange={event => setUrl(event.target.value)} value={url}
                placeholder="Add YouTube or SoundCloud URL" fullWidth margin="normal" type="url"
                inputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <Link />
                        </InputAdornment>
                    )
                }}
            />

            <Button 
                disabled={!playable} className={classes.addSongButton} onClick={() => setDialog(true)} 
                variant="contained" color="primary" endIcon={ <AddBoxOutlined /> }
            >
                Add
            </Button>

            <ReactPlayer url={url} hidden onReady={handleEditSong} />
        </div>
    )
}

export default AddSong
