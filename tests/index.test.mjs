import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('wavelength ratio', () => {
  assert.equal(api.wavelengthRedshift(750, 500), 0.5);
  assert.equal(api.shiftWavelength(500, 0.5), 750);
});
test('stationary beta', () => {
  assert.equal(api.betaToRedshift(0), 0);
  assert.equal(api.redshiftToBeta(0), 0);
});
test('known beta0.6', () => {
  assert.equal(api.betaToRedshift(0.6), 1);
  assert.equal(api.redshiftToBeta(1), 0.6);
});
test('approaching blueshift', () => {
  assert.equal(api.betaToRedshift(-0.6), -0.5);
});
test('invalid domains', () => {
  assert.throws(() => api.betaToRedshift(1));
  assert.throws(() => api.shiftWavelength(1, -1));
  assert.throws(() => api.wavelengthRedshift(0, 1));
});
test('inverse relativistic oracle', () => {
  for (let b = -0.99; b <= 0.99; b += 0.01)
    assert.ok(Math.abs(api.redshiftToBeta(api.betaToRedshift(b)) - b) < 1e-12);
});
test('unrepresentable boundary results rejected', () => {
  assert.throws(() => api.wavelengthRedshift(1e-300, 1e300));
  assert.throws(() => api.redshiftToBeta(1e300));
  assert.throws(() => api.redshiftToBeta(-1 + Number.EPSILON));
});
