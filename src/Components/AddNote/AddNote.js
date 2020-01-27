import React from 'react'
import ApiContext from '../../ApiContext'
import config from '../../config'
import './AddNote.css'
import ValidationError from '../ValidationError/ValidationError'


class AddNote extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      name: {
        value: '',
        touched: false
      },
      folder: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      }
    }
  }

  static contextType = ApiContext;

  updateName (name) {
    this.setState({name: {value: name, touched: true}})
  }
  updateFolder(folder) {
    this.setState({folder: {value: folder, touched: true}})
  }
  updateContent(content) {
    this.setState({content: {value: content, touched: true}})
  }
  
  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    }
  }

  validateFolder() {
    const folder = this.state.folder.value.trim();
    if (folder === '...') {
      return 'Folder is required'
    } else if (folder.length === 0) {
      return 'Folder is required'
    }
  }

  handleAddNewNote = (event) => {
    event.preventDefault()
    const newNote = {
      name: event.target['noteName'].value,
      content: event.target['noteContent'].value,
      folderId: event.target['folderId'].value,
      modified: new Date()
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(event => Promise.reject(event))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const nameError = this.validateName();
    const folderError = this.validateFolder()
    const { folders } = this.context
    return (
      <section className="Noteful-form">
        <h2 className="addNoteHeader">Create a new note</h2>
        <form onSubmit={this.handleAddNewNote}>
          <div>
            <label className="addFormLabel" htmlFor="nameInput">
              Name:
            </label>
            <input 
            type="text"
            id="nameInput"
            name="noteName"
            onChange={e=> this.updateName(e.target.value)}/>
             {this.state.name.touched && 
                <ValidationError 
                  message={nameError} />}
          </div>
          <div>
            <label className='addFormLabel' htmlFor='folderSelect'>
                Folder:  
            </label>
              <select id='folderId' name='folderId' onChange={e => this.updateFolder(e.target.value)}>
                <option value={null}>...</option>
                {folders.map(folder =>
                  <option 
                    key={folder.id} 
                    value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
              {this.state.name.touched && 
                <ValidationError 
                  message={folderError} />}
              <div>
              <label className='addFormLabel' htmlFor='noteContent'>
                Content:  
              </label>
              <textarea 
                id='noteContent'
                name='noteContent'
                onChange={e=> this.updateContent(e.target.value)} />
              </div>
              <button
               type="submit"
               disabled={
               this.validateFolder() ||
               this.validateName()
               }
               >Add Note</button>
          </div>
        </form>
      </section>
    )
  }
}
export default AddNote