import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../../ApiContext'
import { findNote } from '../../noteful-helpers'
import './NotePageMain.css'


class  NotePageMain extends React.Component {
  // static defaultProps = {
  //   match: {
  //     params: {}
  //   }
  // }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    // const { notes=[] } = this.context
    // const { noteId } = this.props.match.params
    // const note = findNote(notes, noteId) || { content: '' }
    return (
      <section className='NotePageMain'>
        <Note
          id={this.props.note.id}
          name={this.props.note.name}
          modified={this.props.note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {this.props.note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}
NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}

export default NotePageMain