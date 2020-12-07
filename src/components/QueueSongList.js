import { useMutation } from '@apollo/client'
import { Avatar, IconButton, makeStyles, Typography, useMediaQuery } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React from 'react'
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations'

function QueueSongList({ queue }) {
    console.log(queue)
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'))

    // const song = {
    //     title: 'LUNE',
    //     artist: 'MOON',
    //     thumbnail: 'http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg'
    // }

    return greaterThanMd && (
        <div style={{ margin: '10px 0' }}>
            <Typography color="textSecondary" variant="button">
                QUEUE ({queue.length})
            </Typography>
            {queue.map((song, i) => (
                <QueuedSong key={i} song={song} />
            ))}
        </div>
    )
}

const useStyles = makeStyles({
    avatar: {
        width: 44,
        height: 44
    },
    text: {
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gridGap: 12,
        alignItems: 'center',
        marginTop: 10
    },
    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
})

function QueuedSong({ song }) {
    const classes = useStyles();
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE);
    const { thumbnail, artist, title } = song

    function handleAddOrRemoveFromQueue() {
        addOrRemoveFromQueue({
            variables: { input: { ...song, __typename: 'Song' }}
        })
    }

    return(
        <div className={classes.container}>
            <Avatar className={classes.avatar} src={thumbnail} alt="Song Thumbnail" />
            <div className={classes.songInfoContainer}>
                <Typography className={classes.text} variant="subtitle2">
                    {title}
                </Typography>
                <Typography className={classes.text} variant="body2" color="textSecondary">
                    {artist}
                </Typography>
            </div>
            <IconButton onClick={handleAddOrRemoveFromQueue}>
                <Delete color="error" />
            </IconButton>
        </div>
    )
}

export default QueueSongList
