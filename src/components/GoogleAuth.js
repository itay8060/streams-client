import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'


class GoogleAuth extends React.Component {

componentDidMount () {
    window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
            clientId: '563439112649-tv99bv3bavgm2u76fapi4qhp74s4qf9h.apps.googleusercontent.com',
            scope: 'email'
        }).then(() => {
            this.auth = window.gapi.auth2.getAuthInstance();
            this.onAuthChanged(this.auth.isSignedIn.get())
            this.auth.isSignedIn.listen(this.onAuthChanged);
        })
    })
}

onAuthChanged = (isSignedIn) => {
    if(isSignedIn) {
        this.props.signIn(this.auth.currentUser.get().getId())
    } else {
        this.props.signOut()
    }
}

signInClicked = () => {
    this.auth.signIn()
}

onSignOutClicked = () => {
   this.auth.signOut() 
}

renderAuthButton() {
    console.log(this.props.auth)
    if(this.props.isSignedIn === null) {
        return null;
    } else if(this.props.isSignedIn) {
        return (
            <button onClick={this.onSignOutClicked} className="ui red google button">
                <i className="google icon" />
                Sign Out
            </button>
            );
    } else {
        return (
            <button onClick={this.signInClicked} className="ui red google button">
                <i className="google icon" />
                Sign In
            </button>
            )
    }
}

    render () {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut }) (GoogleAuth)