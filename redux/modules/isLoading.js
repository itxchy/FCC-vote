export const IS_LOADING = 'IS_LOADING'

export function loading (bool) {
  return { type: IS_LOADING, isLoading: bool }
}

const reduceIsLoading = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { isLoading: action.isLoading })
  return newState
}

const defaultState = {
  isLoading: false
}

export default function isLoading (state = defaultState, action) {
  switch (action.type) {
    case IS_LOADING:
      return reduceIsLoading(state, action)
    default:
      return state
  }
}
