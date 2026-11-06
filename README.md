# @lp-labs/redshift-math

Wavelength redshift and relativistic line-of-sight Doppler ratios.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/redshift-math
```

## Working example

```js
import { betaToRedshift, redshiftToBeta } from '@lp-labs/redshift-math';
if (betaToRedshift(0.6) !== 1 || redshiftToBeta(1) !== 0.6) throw new Error('Doppler');
```

CommonJS: `const api = require('@lp-labs/redshift-math')`.

## Behavior, customization and limits

wavelengthRedshift(observed,rest) returns z=observed/rest-1; shiftWavelength(rest,z) returns rest*(1+z), z>-1. betaToRedshift(beta) uses sqrt((1+beta)/(1-beta))-1 for speed fraction(-1,1); redshiftToBeta inverse uses stable branches to avoid squared-ratio overflow. All finite positive wavelengths, finite outputs. O(1); Doppler-only special relativity, no cosmology, distance or gravitational interpretation. Results that round to impossible boundary z=-1 or absolute beta=1 throw RangeError rather than silently leaving the supported domain.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function wavelengthRedshift(observed: number, rest: number): number;
export declare function shiftWavelength(rest: number, z: number): number;
export declare function betaToRedshift(beta: number): number;
export declare function redshiftToBeta(z: number): number;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
