const SYSTEM_NAME = 'moomkin-api'

class CacheKey {
  static readonly ACTIVE_LANG_NAME = `${SYSTEM_NAME}-active-lang-name-key`
  static readonly AUTH_TOKEN = `${SYSTEM_NAME}-auth-token`
}

export default CacheKey
