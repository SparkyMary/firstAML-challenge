import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const ListOfCompanies = ({ companiesAndPeople, onEditCompany }) => {
  return (
    <div className='companiesContainer'>
      <div>
        <h3>Companies And People:</h3>
        {_.isEmpty(companiesAndPeople) && (
          <div>You haven't created any companies yet</div>
        )}

        {_.map(companiesAndPeople, item => {
          return (
            <div key={item.id} className='item'>
              <div>{item.name}</div>
              <button onClick={() => onEditCompany(item.id)}>
                View or Add Owners
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

ListOfCompanies.propTypes = {
  companiesAndPeople: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string
  }),
  onEditCompany: PropTypes.func
}

export default ListOfCompanies
