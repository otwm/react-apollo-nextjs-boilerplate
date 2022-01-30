import local from './local'
import develop from './develop'
import qa from './qa'
import stage from './stage'
import live from './live'
import localQa from './local-qa'

class Config {
  static configValue = null

  static getConfig() {
    if (this.configValue !== null) return this.configValue
    if (process.env.NODE_ENV !== 'production') {
      if (process.env.SERVER === 'local-qa') {
        this.configValue = localQa
        return localQa
      }
      this.configValue = local
      return local
    }
    if (process.env.SERVER === 'dev') {
      this.configValue = develop
      return develop
    }
    if (process.env.SERVER === 'qa') {
      this.configValue = qa
      return qa
    }
    if (process.env.SERVER === 'stage') {
      this.configValue = stage
      return stage
    }
    if (process.env.SERVER === 'live') {
      this.configValue = live
      return live
    }
    throw new Error('need SERVER env')
  }
}
const config = Config.getConfig()

export default config
