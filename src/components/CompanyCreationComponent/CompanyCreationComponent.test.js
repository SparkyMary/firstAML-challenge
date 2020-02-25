import React from 'react'
import CompanyCreationComponent from './CompanyCreationComponent'
import renderer from 'react-test-renderer'

test('CompanyCreationComponent render', () => {
  const component = renderer.create(
    <CompanyCreationComponent
      name={'AAA'}
      onChange={() => {}}
      onSave={() => {}}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
