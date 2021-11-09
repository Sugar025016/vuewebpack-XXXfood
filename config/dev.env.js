'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH: '"http://localhost:8081"',
  CUSTOMPATH: '"api"',//自定义路径
  ADMIN: '"admin"',//自定义路径
  USER: '"user"',//自定义路径
  // APIPATH: '"https://vue-course-api.hexschool.io"',
  // CUSTOMPATH: '"spring"',
})
