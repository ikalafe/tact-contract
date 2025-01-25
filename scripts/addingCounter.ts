import { NetworkProvider } from '@ton/blueprint';
import { FirstTactContract } from '../wrappers/FirstTactContract';
import { toNano } from '@ton/core';

export async function run(provider: NetworkProvider) {
    const firstTactContract = provider.open(await FirstTactContract.fromInit(14316n));

    await firstTactContract.send(provider.sender(), { value: toNano('0.10') }, { $$type: 'Add', amount: 5n });
}
