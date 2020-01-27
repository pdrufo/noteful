import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import config from '../../config'
import ApiContext from '../../ApiContext'
import PropTypes from 'prop-types'
 
class Note extends React.Component {
  static defaultProps ={
    handleDeleteNote: () => {},
  }

  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(() => {
      this.context.deleteNote(noteId)
      this.props.handleDeleteNote(noteId)
    })
    .catch(error => {
      console.error({ error })
    })
  }

  render () {
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>
        <button
         className='Note__delete' 
         type='button'
         onClick={this.handleClickDelete}
         >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {this.props.modified ? format(new Date(this.props.modified), 'yyyy-MM-dd') : null}
            </span>
          </div>
        </div>
      </div>
  )
    }
}
Note.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string
}
export default Note