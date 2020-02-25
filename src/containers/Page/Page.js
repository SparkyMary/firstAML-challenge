import React, { useState } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import './Page.css'
import { ITEM_TYPES } from '../../constants'

import CompanyCreationComponent from '../../components/CompanyCreationComponent/CompanyCreationComponent'
import ListOfCompanies from '../../components/ListOfCompanies/ListOfCompanies'
import CompanyTree from '../../components/CompanyTree/CompanyTree'
import OwnerCreationComponent from '../../components/OwnerCreationComponent/OwnerCreationComponent'

export const Page = () => {
  const [newCompany, setNewCompany] = useState({})
  const [companiesAndPeople, setCompaniesAndPeople] = useState({}) //TODO get from location storage
  const [ownership, setOwnership] = useState([]) //TODO get from location storage
  const [editingCompany, setEditingCompany] = useState(null)

  const onCreateCompany = event => {
    const newId = uuidv4()
    setNewCompany({
      ...newCompany,
      id: newId,
      name: event.target.value,
      type: ITEM_TYPES[0].id
    })
  }

  const saveNewCompany = () => {
    const updatedCompaniesAndPeople = { ...companiesAndPeople }
    updatedCompaniesAndPeople[newCompany.id] = newCompany
    setCompaniesAndPeople(updatedCompaniesAndPeople)
    setEditingCompany(newCompany)
    setNewCompany({ id: '', name: '', type: '' })
  }

  const saveNewOwner = newOwner => {
    const updatedCompaniesAndPeople = { ...companiesAndPeople }
    updatedCompaniesAndPeople[newOwner.id] = {
      id: newOwner.id,
      name: newOwner.name,
      type: newOwner.type
    }

    // adding this owner to companies and people
    setCompaniesAndPeople(updatedCompaniesAndPeople)

    // adding ownership
    const newId = uuidv4()
    const updatedOwnership = _.clone(ownership)
    updatedOwnership.push({
      id: newId,
      name: newOwner.name,
      ownerId: newOwner.id,
      ownsCompany: newOwner.ownerOf,
      ownershipType: newOwner.status,
      shares: newOwner.shares || 0
    })

    setOwnership(updatedOwnership)
  }

  const onEditCompany = id => {
    setEditingCompany(companiesAndPeople[id])
  }

  return (
    <div className='pageRoot'>
      <div className='pageChild'>
        <CompanyCreationComponent
          name={newCompany.name}
          onChange={onCreateCompany}
          onSave={saveNewCompany}
        />

        <ListOfCompanies
          companiesAndPeople={companiesAndPeople}
          onEditCompany={onEditCompany}
        />
      </div>
      {editingCompany && (
        <React.Fragment>
          <div className='pageChild'>
            <CompanyTree
              nameOfCompany={editingCompany.name}
              companyId={editingCompany.id}
              ownership={ownership}
            />
          </div>
          <div className='pageChild'>
            <h2>Adding Owner of {editingCompany.name}:</h2>
            <OwnerCreationComponent
              editingCompanyId={editingCompany.id}
              onSave={newOwner => saveNewOwner(newOwner)}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default Page
