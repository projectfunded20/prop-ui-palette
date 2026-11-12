import {test} from 'node:test'
import assert from 'node:assert/strict'
import {isValidPassword, MIN_PASSWORD_LENGTH} from './password-policy'

test('five-character passwords are accepted without character composition requirements', () => {
  assert.equal(MIN_PASSWORD_LENGTH, 5)
  assert.equal(isValidPassword('abcde'), true)
})
test('passwords shorter than five characters are rejected', () => {
  assert.equal(isValidPassword('abcd'), false)
})
test('ten-character passwords remain accepted', () => {
  assert.equal(isValidPassword('abcdefghij'), true)
})