let env = process.env.NODE_ENV || 'development'
let config = {
  "port": 3171,
  "version": "dev",
  "cdn": "http://IP:4171/build",
  "domain": "http://mdev.dian.so"
}

// let config = require(`${__dirname}/${env}`)

config['env'] = env

module.exports = config