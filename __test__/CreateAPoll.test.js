const React = require('react')
const NewPollTitle = require('../components/CreateAPoll/NewPollTitle.jsx')
const renderer = require('react-test-renderer')
const { mount } = require('enzyme')

describe('CreateAPoll', () => {
  describe('NewPollTitle', () => {
    it('', () {
      const wrapper = mount(<NewPollTitle />)
      expect(wrapper.contains())
    })
  })
})