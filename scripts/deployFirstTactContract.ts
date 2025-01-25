import { toNano } from '@ton/core';
import { FirstTactContract } from '../wrappers/FirstTactContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const firstTactContract = provider.open(await FirstTactContract.fromInit(14316n));

    await firstTactContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(firstTactContract.address);

    // run methods on `firstTactContract`
}
