import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './CompanyCreationComponent.css'

const CompanyCreationComponent = ({ name, onChange, onSave }) => {
  return (
    <div className='creationRoot'>
      <TextField
        label='Input name'
        id='cpmpany-name'
        value={name}
        variant='outlined'
        onChange={onChange}
        size='small'
      />

      <Button variant='contained' color='primary' onClick={onSave}>
        Create Company
      </Button>
    </div>
  )
}

CompanyCreationComponent.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onSave: PropTypes.func
}

export default CompanyCreationComponent
