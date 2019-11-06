import React from 'react'
import { connect } from 'react-redux';

const ProfileHeader = props =>{
    return(<>
    <h2>{props.userData.currentUser.username}</h2>
    </>)
}

const mapStateToProps = state =>{
    return{
        userData: state.user
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(ProfileHeader)