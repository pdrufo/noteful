import React from 'react'
import ApiContext from '../../ApiContext'
import config from '../../config'
import './AddNote.css'

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
  

  handleAddNewNote = (event) => {
    event.preventDefault()
    const newNote = {
      name: event.target['noteName'].value,
      content: event.target['noteContent'].value,
      folder_id: event.target['folderId'].value,
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
          </div>
          <div>
            <label className='addFormLabel' htmlFor='folderSelect'>
                Folder:  
            </label>
              <select id='folderSelect' name='folderId' onChange={e => this.updateFolder(e.target.value)}>
                <option value={null}>...</option>
                {folders.map(folder =>
                  <option 
                    key={folder.id} 
                    value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
              <div>
              <label className='addFormLabel' htmlFor='noteContent'>
                Content:  
              </label>
              <textarea 
                id='noteContent'
                name='noteContent'
                onChange={e=> this.updateContent(e.target.value)} />
              </div>
              <button type="submit">Add Note</button>
             
            </div>

        </form>
      </section>
    )
  }
}
export default AddNote