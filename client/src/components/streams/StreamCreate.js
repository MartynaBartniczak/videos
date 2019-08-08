import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import  { connect } from 'react-redux'
import {createStream} from '../../actions'
import {compose } from 'redux'

class StreamCreate extends Component {
renderInput = ({input,label, meta:{touched, error}}) => {
const className = `field ${error && touched? 'error' :''}`
    return(
         <div className={className}>
            <label>{label}</label>
                <input {...input} autoComplete='off'/>
                { touched && error && 
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
                 } 
        </div>
            )
    }

onSubmit = formValues => {
 this.props.createStream(formValues)
}

 render() {
    const { handleSubmit} = this.props
        return (
            <form className="ui form error" onSubmit={handleSubmit(this.onSubmit)}>
                <Field name='title' component={this.renderInput} label="Enter title" />
                <Field name='description' component={this.renderInput} label="Enter description"/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
  
}
const validate = (formValues) => {
    const errors = {}
    if(!formValues.title) {
     errors.title= 'you must enter the title'
    }
    if(!formValues.description) {
        errors.description= 'you must enter description'
       }
    return errors
}

export default compose(
    connect(null, {createStream}),
    reduxForm({
        form: 'streamCreate',
        validate
})
)(StreamCreate)