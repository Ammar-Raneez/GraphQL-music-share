import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import { AddBoxOutlined, Link } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
//justifies whether a given url is playable
import ReactPlayer from 'react-player'

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

function AddSong() {
    const [dialog, setDialog] = useState(false);
    const classes = useStyles();
    const [url, setUrl] = useState("");
    const [playable, setPlayable] = useState(false);

    useEffect(() => {
        //only valid urls will work
        const isPlayable = ReactPlayer.canPlay(url);
        setPlayable(isPlayable);
    }, [url])

    function handleSetDialog() {
        setDialog(false);
    }

    return (
        <div className={classes.container}>
            <Dialog className={classes.dialog} open={dialog} onClose={handleSetDialog}>
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img alt="Thumbnail" className={classes.thumbnail} src="https://api.time.com/wp-content/uploads/2019/09/karaoke-mic.jpg?w=800&quality=85" />
                    <TextField fullWidth margin="dense" name="title" label="Title" />
                    <TextField fullWidth margin="dense" name="artist" label="Artist" />
                    <TextField fullWidth margin="dense" name="thumbnail" label="Thumbnail" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSetDialog} color="secondary">Cancel</Button>
                    <Button variant="outlined" color="primary">Add Song</Button>
                </DialogActions>
            </Dialog>
            <TextField 
                className={classes.urlInput}
                onChange={event => setUrl(event.target.value)}
                value={url}
                placeholder="Add YouTube or SoundCloud URL"
                fullWidth margin="normal"
                type="url"
                inputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <Link />
                        </InputAdornment>
                    )
                }}
            />
            <Button disabled={!playable} className={classes.addSongButton} onClick={() => setDialog(true)} variant="contained" color="primary" endIcon={ <AddBoxOutlined /> }>
                Add
            </Button>
        </div>
    )
}

export default AddSong
