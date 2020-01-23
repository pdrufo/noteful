import React from 'react'
import config from '../../config'
import ApiContext from '../../ApiContext'

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
static contextType = ApiContext;

updateName(name){
  this.setState({name: {value:name, touched:true}});
}

handleAddNewFolder = (event) => {
  event.preventDefault();
  const {name} = this.state;
  fetch(`${config.API_ENDPOINT}/folders`,
  {
    method: 'POST',
    body: JSON.stringify(name),
    headers: {
      'Content-Type' : 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("This is a problem");
    }
    return response;
  })
  .then(response => response.json())
  .then(data => {
    this.context.addFolder(data)
    this.props.history.push('/');
  })
  .catch(e => console.log(e));
}


render(){
  return (
    <form onSubmit={this.handleAddNewFolder}>
      <label htmlFor="addFolder"> Add New Folder</label>
        <div className="form-input">
          <input
           required
           type="text"
           name="addFolder"
           id="addFolder"
           onChange={e => this.updateName(e.target.value)}
           />
        </div>
      <div className="submit-button">
        <button type="submit"> Submit </button> 
      </div>
      
        

    </form>
  )
}
}

export default AddFolder