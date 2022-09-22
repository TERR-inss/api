
const baseURL = 'http://localhost:4000/api/v3'
// vvv from repo beam/cypress.json vvv
// const baseURL = "https://stream.resonate.coop/api/v3/"
const request = require('supertest')(baseURL)

// from codecademy-ecommerce-rest-api-v2/test/testConfig.js
// Do this to enable auth persistence
//      https://stackoverflow.com/questions/14001183/how-to-authenticate-supertest-requests-with-passport
const persistedRequest = require('supertest').agent(baseURL)

const expect = require('chai').expect

// genAudio and path are used in the old / as-built tests
const genAudio = require('../src/util/gen-silent-audio')
const path = require('path')

// test ids come from the yarn docker:seed:all command you should have already
//    run as part of the api setup
const testUserId = '17203153-e2b0-457f-929d-5abe4e322ea1'
const testTrackGroupId = 'c91bf101-2d3d-4181-8010-627ecce476de'
const testTagId = 'asdf'
const testLabelId = 'asdf'
const testArtistId = '251c01f6-7293-45f6-b8cd-242bdd76cd0d'
const testTrackId = 'e8fc6dd4-f6ed-4b2b-be0f-efe9f32c3def'

const testAccessToken = 'asdf'

module.exports = {
  baseURL,
  request,
  persistedRequest,
  expect,
  testUserId,
  testTrackGroupId,
  testTagId,
  testLabelId,
  testArtistId,
  testTrackId,
  testAccessToken,
  genAudio,
  path
}