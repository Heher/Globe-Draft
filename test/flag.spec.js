import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Flag from '../client/components/Flag'

describe('Flag Component', () => {
  const minProps = {
    country: {}
  }

  it('should render', () => {
    expect(
      shallow(
        <Flag {...minProps} />
      ).length
    ).toEqual(1)
  })
})
