import React, { Component} from 'react'
import {connect} from 'react-redux'
import {signIn, signOut}  from '../actions'

class GoogleAuth extends Component {
    state = {
        isSignedIn: null
    }
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '168687164961-49rpfc8biu935qinef70lvcf866pg6fh.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
              this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)

            })
        })
    }
    onAuthChange = isSignedIn => {
       const currentUser =  this.auth.currentUser.get().getId()
       isSignedIn?(this.props.signIn(currentUser)) : (this.props.signOut())
    }

    onSignInClick  = () => {
            this.auth.signIn()
    }
    onSignOutClick  = () => {
            this.auth.signOut()
    }
    
  

    renderAuthButton() {
     const { isSignedIn} = this.props
        if(isSignedIn === null) {
            return null
            }
        else if(isSignedIn) {
            return <button className='ui red google button' onClick={this.onSignOutClick}>
                <i className="google icon"/>
                Sign out
            </button>
            }
        else {
            return <button className='ui green google button' onClick={this.onSignInClick}>
            <i className="google icon"/>
            Sign in with Google
        </button>
        }   

    }

    render() {
        return(
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = ({auth:{isSignedIn}}) => {
    return { isSignedIn: isSignedIn}  
}

export default connect(mapStateToProps, { signIn, signOut})(GoogleAuth)