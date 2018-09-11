function sequelizeErrorsManager(err) {
  let errors = []

  err.errors.forEach(error => {
    errors.push({
      source: error.value,
      title: error.type,
      detail: error.message
    })
  })
  return { errors: errors }
}

function globalErrorManager(err, url) {
  return {
    errors: [{
    status: err.status || 500,
    source: { pointer: url },
    title: err.title,
    detail: err.detail,
    type: err.type
  }]}
}

module.exports = {
  global(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (!err.status && res.sequelizeError) {
      return res.status(500).send(sequelizeErrorsManager(err))
    }

    return res.status(err.status || 500)
      .send(globalErrorManager(err, req.url))
  }
};
