function socketMiddleware() {
  return function(_ref) {
    const dispatch = _ref.dispatch;
    //getState = _ref.getState;
    return function(next) {
      return function(action) {
        return next(action);
      };
    };
  };
}

export default socketMiddleware();
