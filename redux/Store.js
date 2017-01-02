import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'remote-redux-devtools'
import rootReducer from './rootReducer'

// const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 })
// const store = createStore(rootReducer, composeEnhancers(
//     applyMiddleware(thunk)
//   )
// )

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk), typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))

export default store
