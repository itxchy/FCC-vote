const React = require('react')
const { mount } = require('enzyme')
const { Provider } = require('react-redux')
const { store } = require('../redux/Store.jsx')
const NewPollTitle = require('../components/CreateAPoll/NewPollTitle.jsx')

describe('CreateAPoll', () => {
  describe('NewPollTitle', () => {
    it('should initially show a textarea', () => {
      const wrapper = mount(
        <Provider store={store}>
          <NewPollTitle />
        </Provider>
        )
      expect(wrapper.contains(<textarea />))
    })
  })
})