import { NetworkProvider } from '@ton/blueprint';
import { FirstTactContract } from '../wrappers/FirstTactContract';

export async function run(provider: NetworkProvider) {
    const firstTactContract = provider.open(await FirstTactContract.fromInit(14316n));

    const counter = await firstTactContract.getCounter();

    const id = await firstTactContract.getId();

    console.log(`Counter: ${counter}; ID: ${id}`);
}
