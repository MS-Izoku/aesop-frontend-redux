import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getStories} from '../actions/storyActions'

import HomeCardContainer from '../containers/HomeCardContainer'

class HomePage extends Component{
    componentDidMount(){
        this.props.getStories()
    }

    render(){
        return<div>
            <HomeCardContainer />
        </div>
    }
}

const mapStateToProps = (state) =>{
    return {user: state.user,
        stories: state.stories}
}
const mapDispatchToProps = (dispatch)=>{
    return { getStories: ()=>dispatch(getStories())}
}

export default connect(mapStateToProps , mapDispatchToProps)(HomePage)