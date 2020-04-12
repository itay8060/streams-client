import streams from '../apis/streams'
import history from '../history'
import {
     SIGN_IN, 
     SIGN_OUT, 
     CREATE_STREAM,
     FETCH_STREAMS,
     FETCH_STREAM,
     DELETE_STREAM,
     EDIT_STREAM 
    } from './types'

export const signIn = ( userId ) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = formValues => async (dispath, getSate) => {
    const {userId} = getSate().auth
    const response = await streams.post('/streams', {...formValues, userId})
    
    dispath({
        type: CREATE_STREAM,
        payload: response.data
    })
    history.push('/');
}

export const editStream = (id, formValues) => async (dispath, getSate) => {
    const {userId} = getSate().auth
    const response = await streams.patch(`/streams/${id}`,
        formValues
    )

    dispath({
        type:EDIT_STREAM,
        payload: response.data
    })
    history.push('/');
}

export const fetchStreams = () => async dispath => {
    const response = await streams.get('/streams');

    dispath({
        type: FETCH_STREAMS,
        payload: response.data
    })
}

export const fetchStream = (id) => async dispath => {
    const response = await streams.get(`/streams/${id}`)

    dispath({
        type: FETCH_STREAM,
        payload: response.data
    })
}

export const deleteStream = (id) => async dispath => {
    await streams.delete(`/streams/${id}`)

    dispath({
        type: DELETE_STREAM,
        payload: id
    })
    history.push('/');
}