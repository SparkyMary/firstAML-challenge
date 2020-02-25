import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './CompanyTree.css'

import { OWNER_STATUS_TYPES } from '../../constants'

/**
 * Provides the list of all owners of the company with given id
 *
 * @param {String} id - id of the selected company to view the tree
 */
export const getOwners = (id, ownershipArray) => {
  const filteredOwnership = _.filter(ownershipArray, { ownsCompany: id })

  return _.map(filteredOwnership, item => ({
    id: item.id,
    ownsCompany: id,
    nameOfOwner: item.name,
    statusOfOwnship: _.find(OWNER_STATUS_TYPES, { id: item.ownershipType })
      .label,
    ownerId: item.ownerId,
    shares: item.shares
  }))
}

const CompanyTree = ({ nameOfCompany, companyId, ownership }) => {
  const getTreeOfOwners = arrOfItems => {
    return (
      <div>
        {_.map(arrOfItems, item => {
          const subOwners = getOwners(item.ownerId, ownership)
          return (
            <div key={item.id}>
              {item.nameOfOwner} ({item.statusOfOwnship}){' '}
              {item.shares ? `(${item.shares}% Share)` : ''}
              <div className='subOwner'>
                {subOwners.length > 0 && getTreeOfOwners(subOwners)}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const owners = companyId ? getOwners(companyId, ownership) : null

  return (
    <div>
      <div className='companyRoot'>{nameOfCompany}</div>
      <div className='tree'>{getTreeOfOwners(owners)}</div>
    </div>
  )
}

CompanyTree.propTypes = {
  nameOfCompany: PropTypes.string,
  companyId: PropTypes.string,
  ownership: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      ownsCompany: PropTypes.string,
      ownershipType: PropTypes.number,
      ownerId: PropTypes.string,
      shares: PropTypes.number
    })
  )
}

export default CompanyTree
