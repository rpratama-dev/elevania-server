function getEnv(field) {
  const envVal = process.env[field];
  return envVal || '';
}

module.exports = getEnv;
