import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Avatar from '../client/components/Avatar'

describe('Avatar Component', () => {
  const minProps = {
    users: [],
    userId: ''
  }

  it('should render', () => {
    expect(
      shallow(
        <Avatar {...minProps} />
      ).length
    ).toEqual(1)
  })
})
