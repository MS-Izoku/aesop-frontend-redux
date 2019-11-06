import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getStories} from '../actions/storyActions'

import HomeCardContainer from '../containers/HomeCardContainer'

import CreateStoryButton from '../components/CreateStoryButton'

class HomePage extends Component{
    componentDidMount(){
       // this.props.getStories(1)
    }

    render(){
        return<div>
            <CreateStoryButton />
            <HomeCardContainer />
        </div>
    }
}

const mapStateToProps = (state) =>{
    return {user: state.user,
        stories: state.stories}
}
const mapDispatchToProps = (dispatch)=>{
    //return { getStories: (userID)=>dispatch(getStories(userID))}
}

export default connect(mapStateToProps , mapDispatchToProps)(HomePage)