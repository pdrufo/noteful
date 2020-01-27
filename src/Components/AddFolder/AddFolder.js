import React from 'react'
import config from '../../config'
import ApiContext from '../../ApiContext'
import './AddFolder.css'
import ValidationError from '../ValidationError/ValidationError'


class AddFolder extends React.Component{

constructor(props){
  super(props);
  this.state ={
    name: {
      value: '',
      touched: false
    }
  }
}
static defaultProps = {
  history: {
    push: () => { }
  },
}

static contextType = ApiContext;

updateName(name){
  this.setState({name: {value:name, touched:true}});
}

validateFolderName(fieldValue){
  const name = this.state.name.value.trim();
  if (name.length === 0) {
    return 'Name required'
  }
}

handleAddNewFolder = (event) => {
  event.preventDefault();
  const newFolder = {
    name: event.target['addFolder'].value
  }
  fetch(`${config.API_ENDPOINT}/folders`,
  {
    method: 'POST',
    body: JSON.stringify(newFolder),
    headers: {
      'Content-Type' : 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      console.log("An error occured");
      throw new Error("This is a problem");
    }
    return response;
  })
  .then(response => response.json())
  .then(folder => {
    this.context.addFolder(folder)
    this.props.history.push(`/`)
  })
  .catch(e => console.log(e));
}

render(){
  const nameError = this.validateFolderName(); 
  return (
    <form className="Noteful-form" onSubmit={this.handleAddNewFolder}>
      <label htmlFor="addFolder"> Add New Folder</label>
        <div className="form-input">
          <input
           required
           type="text"
           name="addFolder"
           id="addFolder"
           onChange={e => this.updateName(e.target.value)}
           />
           {this.state.name.touched && 
             <ValidationError message={nameError} />
           }
      </div>
      <div className="submit-button">
        <button
         type="submit"
         disabled={this.validateFolderName()}>
            Submit
        </button> 
      </div>
    </form>
    )
  }
}

export default AddFolder