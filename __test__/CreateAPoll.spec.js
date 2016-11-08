const React = require('react')
const { mount } = require('enzyme')
const { Provider } = require('react-redux')
const { store } = require('../redux/Store.jsx')
const configureMockStore = require('redux-mock-store')
const NewPollTitle = require('../components/CreateAPoll/NewPollTitle.jsx')

describe('CreateAPoll', () => {
  describe('NewPollTitle', () => {
    it('should initially show a textarea', () => {
      const wrapper = mount(
          <NewPollTitle store={store} />
        )
      expect(wrapper.find('.new-poll-title-textarea').length).toEqual(1)
    })
    it('should show a saved poll title when the save icon is clicked', () => {
      const wrapper = mount(
          <NewPollTitle store={store} />
        )
      wrapper.find('.save-icon').simulate('click')
      expect(wrapper.find('.saved-title').length).toEqual(1)
    })
    it('should show a text area again if the edit button is clicked', () => {
      // Set up mock store
      const mockStore = configureMockStore.default()
      let initialState = {
        newPollTitle: 'blah',
        titleEditable: false,
        newPollOptions: [
          '',
          ''
        ]
      }
      let testStore = mockStore(initialState)

      // Set up test 
      const wrapper = mount(
          <NewPollTitle store={testStore} />
        )
      wrapper.find('.edit-icon').simulate('click')
      expect(wrapper.find('.new-poll-title-textarea'))

    })
  })
})
