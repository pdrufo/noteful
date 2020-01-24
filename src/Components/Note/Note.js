import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import config from '../../config'
import ApiContext from '../../ApiContext'
import PropTypes from 'prop-types'
 
class Note extends React.Component {
 

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
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(data => {
      this.context.deleteNote(this.props.id);
      this.props.handleDeleteNote(this.props.id);
    })
    .catch(e => console.log(e));
      

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
              {format(new Date(this.props.modified), 'Do MMM yyyy')}
              {/* {this.props.modified} */}
            </span>
          </div>
        </div>
      </div>
  )
    }
}
Note.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string
}
export default Note