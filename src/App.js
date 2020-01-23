import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from './Components/NoteListNav/NoteListNav';
import NotePageNav from './Components/NotePageNav/NotePageNav';
import NoteListMain from './Components/NoteListMain/NoteListMain';
import NotePageMain from './Components/NotePageMain/NotePageMain';
import AddFolder from './Components/AddFolder/AddFolder';
import ApiContext from './ApiContext';
import config from './config';
import './App.css';
import {getNotesForFolder, findNote, findFolder} from './noteful-helpers';

class App extends Component {
  
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/notes`)
      .then(res => {
        if (res.ok) {
          return res.json();
          } else {
            throw new Error(res.statusText);
          }
      })
      .then(data => {
        this.setState({ notes: [...data]});
      })
      .catch(e => console.log(e));

      fetch(`${config.API_ENDPOINT}/folders`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then(data => {
        this.setState({ folders: [...data] });
      })
      .catch(e => console.log(e));
}

handleDeleteNote = noteId => {
  this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
  });
};

handleAddFolder = (folder) => {
  this.setState({
    fodlers: [...this.state.folders, folder]
  })
}
  

  renderNavRoutes() {
    
    const {notes, folders} = this.state;
    return (
        <>
            
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    render={routeProps => (
                        <NoteListNav
                            folders={folders}
                            notes={notes}
                            {...routeProps}
                        />
                    )}
                />
            ))}
            <Route
                path="/note/:noteId"
                render={routeProps => {
                    const {noteId} = routeProps.match.params;
                    const note = findNote(notes, noteId) || {};
                    const folder = findFolder(folders, note.folderId);
                    return <NotePageNav {...routeProps} folder={folder} />;
                }}
            />
            <Route path="/add-folder" component={AddFolder} />
            <Route path="/add-note" component={NotePageNav} />
        </>
    );
}

renderMainRoutes() {
    const {notes, folders} = this.state;
    return (
        <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    render={routeProps => {
                        const {folderId} = routeProps.match.params;
                        const notesForFolder = getNotesForFolder(
                            notes,
                            folderId
                        );
                        return (
                            <NoteListMain
                                {...routeProps}
                                notes={notesForFolder}
                            />
                        );
                    }}
                />
            ))}
            <Route
                path="/note/:noteId"
                render={routeProps => {
                    const {noteId} = routeProps.match.params;
                    const note = findNote(notes, noteId);
                    return <NotePageMain {...routeProps} note={note} />;
                }}
            />
        </>
    );
}

render() {
  const value ={
    notes:this.state.notes,
    folders: this.state.folders,
    deleteNote: this.handleDeleteNote,
    addFolder: this.handleAddFolder
  }
    return (
        <div className="App">
          <ApiContext.Provider value ={value}>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
            <header className="App__header">
                <h1>
                    <Link to="/">Noteful</Link>{' '}
                    <FontAwesomeIcon icon="check-double" />
                </h1>
            </header>
            <main className="App__main">{this.renderMainRoutes()}</main>
          </ApiContext.Provider>
        </div>
    );
}
  
}

export default App;