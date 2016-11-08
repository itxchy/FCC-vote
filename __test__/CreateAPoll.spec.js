const React = require('react')
const { mount } = require('enzyme')
const { Provider } = require('react-redux')
const { store } = require('../redux/Store.jsx')
const NewPollTitle = require('../components/CreateAPoll/NewPollTitle.jsx')

describe('CreateAPoll', () => {
  describe('NewPollTitle', () => {
    it('should initially show a textarea', () => {
      const wrapper = mount(
          <NewPollTitle store={store} />
        )
      expect(wrapper.find('.new-poll-title-textarea').length).toEqual(1)
    })
    it('should show a saved poll title upon receiving titleEditable prop', () => {
      const wrapper = mount(
          <NewPollTitle store={store} />
        )
      wrapper.find('.save-icon').simulate('click')
      expect(wrapper.find('.edit-icon').length).toEqual(1)
    })
  })
})
