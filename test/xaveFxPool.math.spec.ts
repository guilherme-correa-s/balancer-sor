// TS_NODE_PROJECT='tsconfig.testing.json' npx mocha -r ts-node/register test/xaveFxPool.math.spec.ts
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { expect } from 'chai';
import { bnum } from '../src/utils/bignumber';

import {
    viewRawAmount,
    viewNumeraireAmount,
} from '../src/pools/xaveFxPool/fxPoolMath';
import { BigNumber } from '@ethersproject/bignumber';

context('xaveFxPool: fxMath functions', () => {
    const tokenDecimals = 6;
    const tokenFxRateDecimals = 8;
    const rate = BigNumber.from('74376600'); // 0.743766

    it(`should correctly return 'viewRawAmount'`, async () => {
        const rawAmount = viewRawAmount(
            bnum('10000'),
            tokenDecimals,
            rate,
            tokenFxRateDecimals
        );
        const expected = '13445088912';
        expect(rawAmount.toString()).to.eq(expected);
    });

    it(`should correctly return large 'viewRawAmount'`, async () => {
        const rawAmount = viewRawAmount(
            bnum('10000').times(bnum(10).pow(18)),
            tokenDecimals,
            rate,
            tokenFxRateDecimals
        );
        const expected = '13445088912372977522500356294';
        expect(rawAmount.toString()).to.eq(expected);
    });

    it(`should correctly return 'viewNumeraireAmount' values`, async () => {
        const numerarieAmount = viewNumeraireAmount(
            BigNumber.from('13445088912'),
            tokenDecimals,
            rate,
            tokenFxRateDecimals
        );
        const expected = '9999.999999';
        expect(numerarieAmount.toString()).to.eq(expected);
    });
});
