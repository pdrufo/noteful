import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from './Components/NoteListNav/NoteListNav';
import NotePageNav from './Components/NotePageNav/NotePageNav';
import NoteListMain from './Components/NoteListMain/NoteListMain';
import NotePageMain from './Components/NotePageMain/NotePageMain';
import dummyStore from './dummy-store';
import './App.css';
import {getNotesForFolder, findNote, findFolder} from './noteful-helpers';

class App extends Component {
  
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    // setTimeout(() => this.setState(dummyStore), 600);
    // fake date loading from API call
    this.setState(dummyStore)
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
            <Route path="/add-folder" component={NotePageNav} />
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
    return (
        <div className="App">
            <nav className="App__nav">{this.renderNavRoutes()}</nav>
            <header className="App__header">
                <h1>
                    <Link to="/">Noteful</Link>{' '}
                    <FontAwesomeIcon icon="check-double" />
                </h1>
            </header>
            <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
    );
}
  
}

export default App;