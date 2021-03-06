import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../../noteful-helpers'
import './NoteListNav.css'
import ApiContext from '../../ApiContext'
import propTypes from 'prop-types'


class NoteListNav extends React.Component {
  static contextType = ApiContext;
  render() {

    const { folders, notes } = this.context
return (
  <div className='NoteListNav'>
  <ul className='NoteListNav__list'>
    {folders.map(folder =>
      <li key={folder.id}>
        <NavLink
          className='NoteListNav__folder-link'
          to={`/folder/${folder.id}`}
        >
          <span className='NoteListNav__num-notes'>
            {countNotesForFolder(notes, folder.id)}
          </span>
          {folder.name}
        </NavLink>
      </li>
    )}
  </ul>
  <div className='NoteListNav__button-wrapper'>
    <CircleButton
      tag={Link}
      to='/add-folder'
      type='button'
      className='NoteListNav__add-folder-button'
    >
      <FontAwesomeIcon icon='plus' />
      <br />
      Folder
    </CircleButton>
  </div>
</div>
)
}
}
NoteListNav.propTypes = {
  key: propTypes.string,
  path: propTypes.string
}

export default NoteListNav