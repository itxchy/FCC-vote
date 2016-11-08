const React = require('react')
const { mount } = require('enzyme')
const { Provider } = require('react-redux')
const { store } = require('../redux/Store.jsx')
const configureMockStore = require('redux-mock-store')
const NewPollTitle = require('../components/CreateAPoll/NewPollTitle.jsx')
const DisconnectedNewPollTitle = NewPollTitle.DisconnectedNewPollTitle.prototype

describe('CreateAPoll', () => {
  describe('NewPollTitle', () => {
    it('should initially show a textarea', () => {
      const wrapper = mount(
          <NewPollTitle store={store} />
        )
      expect(wrapper.find('.new-poll-title-textarea').length).toEqual(1)
    })
    it('should call handleSaveClick to dispatch setNewPollTitle with a string', () => {
      // Set up mock store
      const mockStore = configureMockStore.default()
      let initialState = {
        newPollTitle: 'blah',
        titleEditable: true,
        newPollOptions: [
          '',
          ''
        ]
      }
      let testStore = mockStore(initialState)      
      console.log('NewPollTitle methods: ', NewPollTitle.DisconnectedNewPollTitle.prototype)
      // Set up test
/*      const wrapper = mount(
          <DisconnectedNewPollTitle store={testStore} />
      )
      console.log('NewPollTitle methods: ', DisconnectedNewPollTitle.prototype)
      wrapper.find('.save-icon').simulate('click')
      expect(wrapper.find('.saved-title').length).toEqual(1)*/
    })
    // it('should show a text area again if the edit button is clicked', () => {
    //   // Set up mock store
    //   const mockStore = configureMockStore.default()
    //   let initialState = {
    //     newPollTitle: 'blah',
    //     titleEditable: false,
    //     newPollOptions: [
    //       '',
    //       ''
    //     ]
    //   }
    //   let testStore = mockStore(initialState)

    //   // Set up test 
    //   const wrapper = mount(
    //     <NewPollTitle store={testStore} />
    //   )
    //   wrapper.find('.edit-icon').simulate('click')
    //   expect(wrapper.find('.save-icon').length).toEqual(1)
    // })
    // it('should call handleNewPollTitleChange when any character is typed in the textarea', () => {
    //   // Set up mock store
    //   const mockStore = configureMockStore.default()
    //   let initialState = {
    //     newPollTitle: 'blah',
    //     titleEditable: true,
    //     newPollOptions: [
    //       '',
    //       ''
    //     ]
    //   }
    //   let testStore = mockStore(initialState)

    //   // Set up test
    //   const wrapper = mount(
    //     <NewPollTitle store = {testStore} />
    //   )
    //   wrapper.find('.new-poll-title-textarea').simulate('change', 'more blah')
    // })
  })
})
