export const apiErrorHandler = (error, req, res, next) => {
  console.log(error)
  console.error(error.stack)
  res.status(500).send(error.message || error.toString())
}
