const cache = {}

const accessEnv = (key, defaultValue, throwError) => {
  const envValue = process.env[key]
  if (!envValue) {
    if (defaultValue) {
      return defaultValue
    }

    if (!defaultValue && throwError) {
      throw new Error(`Invalid environment variable ${key}`)
    }
  }

  if (!cache[key]) {
    cache[key] = envValue
  }

  return cache[key]
}

export default accessEnv
