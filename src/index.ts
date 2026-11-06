function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
export function wavelengthRedshift(observed: number, rest: number): number {
  const result = finite(finite(observed, Number.MIN_VALUE) / finite(rest, Number.MIN_VALUE) - 1);
  if (result <= -1) throw new RangeError('Redshift below numerical resolution');
  return result;
}
export function shiftWavelength(rest: number, z: number): number {
  finite(z);
  if (z <= -1) throw new RangeError('Redshift above-1 required');
  return finite(finite(rest, Number.MIN_VALUE) * (1 + z), Number.MIN_VALUE);
}
export function betaToRedshift(beta: number): number {
  finite(beta, -1, 1);
  if (Math.abs(beta) === 1) throw new RangeError('Subluminal beta required');
  return Math.sqrt((1 + beta) / (1 - beta)) - 1;
}
export function redshiftToBeta(z: number): number {
  finite(z);
  if (z <= -1) throw new RangeError('Redshift above-1 required');
  const ratio = 1 + z,
    t = ratio >= 1 ? 1 / ratio : ratio,
    square = t * t;
  const result = ratio >= 1 ? (1 - square) / (1 + square) : (square - 1) / (square + 1);
  if (Math.abs(result) >= 1) throw new RangeError('Subluminal beta below numerical resolution');
  return result;
}
