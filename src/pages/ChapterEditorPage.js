import React , {Component} from 'react'
import { connect } from 'react-redux';

import ChapterTextEditor from '../components/ChapterTextEditor'

class ChapterEditorPage extends Component{
    render(){
        return(<div className="container-fluid">
            <div className="row">
                <div className="col"></div>
                <div className="col-lg-8 bg-info">
                    <ChapterTextEditor />
                </div>
                <div className="col"></div>
            </div>
        </div>)
    }
}


const mapStateToProps = state =>{
    return{}
}

const mapDispatchToProps = dispatch =>{
    return {}
}
export default connect(mapStateToProps , mapDispatchToProps)(ChapterEditorPage)