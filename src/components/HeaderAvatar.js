import React , {Component} from 'react'
import { connect } from 'react-redux';

class HeaderAvatar extends Component{
    render(){
        return<div>
            <img src="" alt="header-avatar"/>
            <p>{"Username"}</p>
        </div>
    }
}

const mapStateToProps = (state) =>{
    return {user: state.user}
}
export default connect(mapStateToProps)(HeaderAvatar)