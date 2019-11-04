import React , {Component} from 'react'

class CharacterManager extends Component{
    render(){
        return(<div></div>)
    }
}

const mapStateToProps = state =>{
    return{
        story: state.user.currentStory
    }
}

const mapDispatchToProps = state =>{
    return{

    }
}

export default CharacterManager