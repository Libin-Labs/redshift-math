import { betaToRedshift, redshiftToBeta } from '@lp-labs/redshift-math';
if (betaToRedshift(0.6) !== 1 || redshiftToBeta(1) !== 0.6) throw new Error('Doppler');
// @ts-expect-error invalid argument must be rejected by declarations
betaToRedshift('0.6');
