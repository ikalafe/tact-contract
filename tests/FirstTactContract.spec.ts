import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { FirstTactContract } from '../wrappers/FirstTactContract';
import '@ton/test-utils';

describe('FirstTactContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let firstTactContract: SandboxContract<FirstTactContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        firstTactContract = blockchain.openContract(await FirstTactContract.fromInit(42151n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await firstTactContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: firstTactContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and firstTactContract are ready to use
    });

    it('should increase', async () => {
        const counterBefore = await firstTactContract.getCounter();
        console.log('Counter before -', counterBefore);

        await firstTactContract.send(deployer.getSender(), { value: toNano('0.02') }, 'increment');

        const counterAfter = await firstTactContract.getCounter();
        console.log('CounterAfter -', counterAfter);

        expect(counterBefore).toBeLessThan(counterAfter);
    });

    it('should increase with amount', async () => {
        const counterBefore = await firstTactContract.getCounter();
        const amount = 5n;

        console.log('counterBefore -', counterBefore);

        await firstTactContract.send(
            deployer.getSender(),
            { value: toNano('0.02') },
            { $$type: 'Add', amount: amount },
        );

        const counterAfter = await firstTactContract.getCounter();

        console.log('counterAfter -', counterAfter);

        expect(counterBefore).toBeLessThan(counterAfter);
    });
});
