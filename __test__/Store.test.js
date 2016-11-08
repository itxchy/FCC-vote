describe('Store', () => {
  const { rootReducer } = require('../redux/Store.jsx')

  it('should bootstrap with initial state', () => {
    const initialState = rootReducer(undefined, { type: '@@redux/INIT'})
    expect(initialState).toEqual({
      newPollTitle: '',
      titleEditable: true,
      newPollOptions: [
        '',
        ''
      ]
    })
  })

  it('should handle setNewPollTitle action', () => {
    const state = rootReducer({newPollTitle: 'nothing yet'},
      {type: 'setNewPollTitle', value: 'To be? Or not?'})
    expect(state).toEqual({newPollTitle: 'To be? Or not?'})
  })

  it('should handle setTitleEditable action', () => {
    const state = rootReducer({titleEditable: true},
      {type: 'setTitleEditable', value: false})
    expect(state.titleEditable).toBeFalsy()
  })

  it('should handle updateOption', () => {
    const state = rootReducer({newPollOptions: ['one', 'two']},
      {type: 'updateOption', value: ['one', 'two', 'three']})
    expect(state).toEqual({newPollOptions: ['one', 'two', 'three']})
  })

})