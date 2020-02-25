import React from 'react'
import CompanyTree, { getOwners } from './CompanyTree'
import renderer from 'react-test-renderer'

const ownership = [
  {
    id: '1',
    name: 'B owner',
    ownsCompany: '111',
    ownershipType: 1,
    ownerId: 'BBB',
    shares: 0
  },
  {
    id: '2',
    name: 'C owner',
    ownsCompany: '112',
    ownershipType: 1,
    ownerId: 'CCC',
    shares: 0
  },
  {
    id: '3',
    name: 'D owner',
    ownsCompany: '111',
    ownershipType: 2,
    ownerId: 'DDD',
    shares: 10
  },
  {
    id: '4',
    name: 'E owner',
    ownsCompany: '111',
    ownershipType: 2,
    ownerId: 'EEE',
    shares: 20
  },
  {
    id: '5',
    name: 'F owner',
    ownsCompany: 'BBB',
    ownershipType: 3,
    ownerId: 'FFF',
    shares: 0
  }
]

test('CompanyTree render empty tree', () => {
  const component = renderer.create(
    <CompanyTree
      nameOfCompany={'AAA Company'}
      companyId={'111'}
      ownership={[]}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('CompanyTree renders correctly', () => {
  const component = renderer.create(
    <CompanyTree
      nameOfCompany={'AAA Company'}
      companyId={'111'}
      ownership={ownership}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('HHH', () => {
  const company = { id: '111', name: 'AAA Company' }
  const arrayOfOwners = getOwners(company.id, ownership)
  expect(arrayOfOwners).toHaveLength(3)

  expect(arrayOfOwners[0].nameOfOwner).toEqual('B owner')
  expect(arrayOfOwners[2].shares).toEqual(20)
})
