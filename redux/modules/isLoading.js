// Action
export const IS_LOADING = 'IS_LOADING'

// Action Creator
export function loading (bool) {
  return { type: IS_LOADING, isLoading: bool }
}

// Reducer
const reduceIsLoading = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { isLoading: action.isLoading })
  return newState
}

// State Slice
const defaultState = {
  isLoading: false
}

// Reducer Slice
export default function isLoading (state = defaultState, action) {
  switch (action.type) {
    case IS_LOADING:
      return reduceIsLoading(state, action)
    default:
      return state
  }
}
