const React = require('react')
const { mount } = require('enzyme')
const { Provider } = require('react-redux')
const { store } = require('../redux/Store.jsx')
const configureMockStore = require('redux-mock-store')
const NewPollTitle = require('../components/CreateAPoll/NewPollTitle.jsx')
const DisconnectedNewPollTitle = NewPollTitle.DisconnectedNewPollTitle
const DisconnectedSaveOrReset = require('../components/CreateAPoll/SaveOrReset.jsx').DisconnectedSaveOrReset

describe('CreateAPoll', () => {
  describe('NewPollTitle', () => {
    it('bootstrapping: should initially show a textarea', () => {
      const wrapper = mount(
          <NewPollTitle store={store} />
        )
      expect(wrapper.find('.new-poll-title-textarea').length).toEqual(1)
    })
    it('save button: should handle save button click by calling setTitleEditable, passing false, if newPollTitle isn\'t empty', () => {
      const setTitleEditable = jest.fn()

      const wrapper = mount(
          <DisconnectedNewPollTitle
            newPollTitle={'blah'} 
            titleEditable={true}
            setTitleEditable={setTitleEditable}
          />
      )
      wrapper.find('.save-icon').simulate('click')
      expect(setTitleEditable.mock.calls.length).toBe(1)
      expect(setTitleEditable.mock.calls[0][0]).toBe(false)
    })
    it('save button: if newPollTitle is empty, setNewPollTitle should set the title as "New Poll Title" for placeholder text', () => {
      const setTitleEditable = jest.fn()
      const setNewPollTitle = jest.fn()

      const wrapper = mount(
          <DisconnectedNewPollTitle
            newPollTitle={''}
            titleEditable={true}
            setTitleEditable={setTitleEditable}
            setNewPollTitle={setNewPollTitle}
          />
      )
      wrapper.find('.save-icon').simulate('click')
      expect(setNewPollTitle.mock.calls.length).toBe(1)
      expect(setNewPollTitle.mock.calls[0][0]).toEqual('New Poll Title')
    })
    it('edit button: should handle edit button click by calling setTitleEditable, passing true', () => {
      const setTitleEditable = jest.fn()
 
      const wrapper = mount(
          <DisconnectedNewPollTitle
            newPollTitle={'blah'} 
            titleEditable={false}
            setTitleEditable={setTitleEditable}
          />
      )
      wrapper.find('.edit-icon').simulate('click')
      expect(setTitleEditable.mock.calls.length).toBe(1)
      expect(setTitleEditable.mock.calls[0][0]).toBe(true)
    })
    it('textarea: should call handleNewPollTitleChange when any character is typed in the textarea', () => {
      const setNewPollTitle = jest.fn()

      const wrapper = mount(
        <DisconnectedNewPollTitle
          titleEditable={true}
          newPollTitle={'wat'}
          setNewPollTitle={setNewPollTitle}
        />
      )
      wrapper.find('.new-poll-title-textarea').simulate('change', {target: {value: 'Kiki says "dats cool..."'}})
      expect(setNewPollTitle.mock.calls.length).toBe(1)
      expect(setNewPollTitle.mock.calls[0][0]).toEqual('Kiki says "dats cool..."')
    })
  })
  describe('SaveOrReset', () => {
    it('reset button: on click, this.props.resetNewPoll should be called with "true"', () => {
      const resetNewPoll = jest.fn()

      const wrapper = mount(
        <DisconnectedSaveOrReset
          resetNewPoll={resetNewPoll}
        />
      )
      wrapper.find('.reset-poll-button').simulate('click')
      expect(resetNewPoll.mock.calls.length).toBe(1)
      expect(resetNewPoll.mock.calls[0][0]).toBeTruthy()
    })
  })
})
