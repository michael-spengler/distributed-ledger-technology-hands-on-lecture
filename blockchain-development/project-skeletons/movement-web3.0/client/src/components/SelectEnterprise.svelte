<script>
    import { ethers } from "https://cdn.skypack.dev/ethers";
    import { erc721ABI } from "../abi-constants.ts";

    export let registeredEnterprises;
    export let selectedEnterprise;
    export let account = "{}";
    export let provider;
    export let mode = "";
    export let nftsUnderManagement = [];

    let nftAddressesUnderManagement = [];
    let erc721Contract;

    async function getNFTInfos() {
        mode = "readingFromBlockchain";

        nftAddressesUnderManagement = [
            "0x747E7330f232064134768B710F8742097369702B",
            "0x100C9aF4801b4a352b581B53c37f86daD9C887ec",
            "0xfc69da2cA9ec827FD9AF64Cea3e1bD98cE19a3Af",
        ];

        for (const nftAddressUnderManagement of nftAddressesUnderManagement) {
            let nftUnderManagement = {};
            erc721Contract = await new ethers.Contract(
                nftAddressUnderManagement,
                erc721ABI,
                provider
            );

            nftUnderManagement.address = nftAddressUnderManagement;

            console.log(erc721Contract);
            nftUnderManagement.name = await erc721Contract.name();
            nftUnderManagement.highestOffer =
                await erc721Contract.getHighestOffer();

            nftUnderManagement.owner = await erc721Contract.owner();

            nftUnderManagement.purchaseRight1Status =
                await erc721Contract.getPurchaseRight1Status();

            nftUnderManagement.purchaseRight2Status =
                await erc721Contract.getPurchaseRight2Status();
            nftUnderManagement.bid = 0;

            nftUnderManagement.offers = await erc721Contract.getOffers();

            nftUnderManagement.showDetails = false;

            nftsUnderManagement.push(nftUnderManagement);
        }
        mode = "ready";
    }
</script>

<div class="selectMenu">
    {#if account !== ""}
        <h4>In which company are you interested in?</h4>
        <!-- <select value={selected} on:change={() => getNFTInfos}> -->
        <select bind:value={selectedEnterprise} on:change={getNFTInfos}>
            {#each registeredEnterprises as registeredEnterprise}
                <option value={registeredEnterprise}>
                    {registeredEnterprise.name}
                </option>
            {/each}
        </select>
    {/if}
</div>

<style>
    .selectMenu {
        padding-top: 3vh;
        color: white;
    }
</style>
