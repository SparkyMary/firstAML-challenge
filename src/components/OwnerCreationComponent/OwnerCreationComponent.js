import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import { ITEM_TYPES, OWNER_STATUS_TYPES } from '../../constants'

export const OwnerCreationComponent = ({ editingCompanyId, onSave }) => {
  const [newOwner, setNewOwner] = useState({})

  const onChangeName = event => {
    const newId = uuidv4()
    setNewOwner({
      ...newOwner,
      id: newId,
      name: event.target.value,
      ownerOf: editingCompanyId
    })
  }

  const onChangeType = event => {
    const updatedType = event.target.value
    const isCompany = updatedType === ITEM_TYPES[0].id
    setNewOwner({
      ...newOwner,
      type: updatedType,
      status: isCompany ? OWNER_STATUS_TYPES[1].id : ''
    })
  }

  const onChangeStatus = event => {
    setNewOwner({ ...newOwner, status: event.target.value })
  }

  const onChangeShares = event => {
    setNewOwner({ ...newOwner, shares: event.target.value })
  }

  const isAllowedToSaveOwner = () => {
    if (!newOwner) return false

    const hasShares =
      newOwner.status === OWNER_STATUS_TYPES[1].id ? !!newOwner.shares : true
    return newOwner.name && newOwner.type && newOwner.status && hasShares
  }

  const saveNewOwner = () => {
    onSave(newOwner)
    setNewOwner({ id: '', name: '', type: '' })
  }

  return (
    <form className={''} noValidate autoComplete='off'>
      <div>
        <TextField
          label='Input name'
          id='owner-name'
          value={newOwner.name}
          variant='outlined'
          onChange={onChangeName}
          size='small'
          data-testid={'input-name-owner'}
        />
      </div>
      {newOwner.name && (
        <div>
          <div>
            <TextField
              id='owner-type'
              select
              label='Select'
              value={newOwner.type}
              onChange={onChangeType}
              helperText='Please select type of the owner'
              variant='outlined'
              size='small'
            >
              {_.map(ITEM_TYPES, option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.type}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {newOwner.type && (
            <div>
              <div>
                <TextField
                  id='owner-status'
                  select
                  label='Select'
                  value={
                    newOwner.type === ITEM_TYPES[1].id
                      ? newOwner.status
                      : OWNER_STATUS_TYPES[1].id
                  }
                  onChange={onChangeStatus}
                  helperText='Please select status of the owner'
                  variant='outlined'
                  size='small'
                >
                  {_.map(OWNER_STATUS_TYPES, option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              {newOwner.status === OWNER_STATUS_TYPES[1].id && (
                <div>
                  <TextField
                    label='Input shares'
                    id='owner-shares'
                    type='number'
                    value={newOwner.shares}
                    onChange={onChangeShares}
                    variant='outlined'
                    size='small'
                  />
                  <span>%</span>
                </div>
              )}

              <Button
                variant='contained'
                color='primary'
                onClick={saveNewOwner}
                disabled={!isAllowedToSaveOwner()}
                data-test-id={'save-owner-button'}
              >
                Save Owner
              </Button>
            </div>
          )}
        </div>
      )}
    </form>
  )
}

OwnerCreationComponent.propTypes = {
  editingCompanyId: PropTypes.string,
  onSave: PropTypes.func
}

export default OwnerCreationComponent
