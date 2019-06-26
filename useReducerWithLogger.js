function withLogger(dispatch) {
  return function(action) {
    console.log(`Action: { type: ${action.type} }`)
    return dispatch(action)
  }
}

function useReducerWithLogger(...args) {
  let prevState = useRef(initialState)
  const [state, dispatch] = useReducer(...args)

  const dispatchWithLogger = useMemo(() => {
    return withLogger(dispatch)
  }, [dispatch])

  useEffect(() => {
    if (state !== initialState) {
      console.log('Prev state: ', prevState.current)
      console.log('Next state: ', state)
      console.groupEnd()
    }
    prevState.current = state
  }, [state])

  return [state, dispatchWithLogger]
}

module.exports = useReducerWithLogger
