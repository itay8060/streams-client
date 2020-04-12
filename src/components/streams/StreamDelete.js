import React from 'react'
import Modal from '../Modal'
import history from '../../history'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends React.Component {

    renderActions () {
        const { id } = this.props.match.params

        return (
            <>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </>
        )
    }

    componentDidMount() {
        if(!this.props.stream) {
            const streamId = this.props.match.params.id
            this.props.fetchStream(streamId)
        }
    }

    renderTitle() {
        if(!this.props.stream) {
            return 'Delete stream?'
        }
        return `Delete ${this.props.stream.title} stream`
    }

    renderContent() {
        if(!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }
        return `Are you sure you want to delete stream with title: ${this.props.stream.title}`
    }

    render() {
        return (
            <Modal
                title={this.renderTitle()}
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />    
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream, deleteStream}) (StreamDelete)