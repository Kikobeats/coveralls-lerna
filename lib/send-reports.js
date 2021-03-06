'use strict'

const parse = require('./parse')
const merge = require('./merge')
const post = require('./post')
const {
  getProgramConfig
} = require('./util/config')

async function sendReports (reports, givenConfig = {}) {
  if (!reports || !reports.length) {
    throw new Error('No coverage reports found, have you run your tests with nyc?')
  }

  const config = getProgramConfig(givenConfig)
  const mappedReports = await Promise.all(reports.map(report => parse(report, config)))
  const mergedResults = merge(mappedReports)

  return post(mergedResults)
}

module.exports = sendReports
