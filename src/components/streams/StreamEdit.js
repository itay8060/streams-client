import React from 'react'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'


class StreamEdit extends React.Component {

    componentDidMount() {
        if(!this.props.stream) {
            const streamId = this.props.match.params.id
            this.props.fetchStream(streamId)
        }
    }

    onSubmit = (initialValues) => {
        console.log(initialValues)
        this.props.editStream(this.props.match.params.id, initialValues)
    }


        render (){
            console.log(this.props)
            if (!this.props.stream) {
                return <div>Loading...</div>
            }

            return (
            <div>
                <h3>Edit Stream</h3>
                <StreamForm 
                    initialValues={{ title: this.props.stream.title , description: this.props.stream.description}}
                    onSubmit={this.onSubmit}
                />
            </div>
            )
        }
    }
    
    const mapStateToProps = (state, ownProps) => {
        console.log(state)
        return { 
            stream: state.streams[ownProps.match.params.id]
        }
    }
    
    export default connect(mapStateToProps, {fetchStream, editStream}) (StreamEdit)