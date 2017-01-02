import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'
import rootReducer from './rootReducer'

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 })
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store
