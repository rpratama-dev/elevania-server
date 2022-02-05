import createHttpError from 'http-errors';

function customeError(status, message, option = {}) {
  const error = createHttpError(status, message);
  Object.assign(error, { option });
  return error;
}

export default customeError;
