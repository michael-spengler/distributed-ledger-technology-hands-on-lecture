<script>
    import { ethers } from "https://cdn.skypack.dev/ethers";

    let targetWallet = "";
    let nftToBeTransferredAddress = "";

    function makeOffer() {
        alert(`making Offer`);
    }

    function acceptOffer() {
        alert(`accept Offer`);
    }

    async function transfer() {
        const signer = await provider.getSigner();

        erc721ToBeTransferredContract = await new ethers.Contract(
            nftToBeTransferredAddress,
            erc721ABI,
            provider
        );

        erc721ToBeTransferredContractWithSigner =
            erc721ToBeTransferredContract.connect(signer);

        await erc721ToBeTransferredContractWithSigner.transferOwnership(
            targetWallet
        );
    }
</script>

<!-- <div class="account">
    {#if account !== ""}
        You are logged in via the following browserwallet: <p />
        {account}.
    {:else}
        <button on:click={connectToBrowserWallet}>Connect Browserwallet</button>
    {/if}
</div> -->

<p><br /></p>
<p><br /></p>

<h3>Transfer Dashboard</h3>

<p><br /></p>
<p><br /></p>

<input
    type="text"
    bind:value={targetWallet}
    placeholder="...enter target wallet"
/>
<p><br /></p>
<input
    type="text"
    bind:value={nftToBeTransferredAddress}
    placeholder="...enter nft address to be transferred"
/>
<p><br /></p>
<button on:click={transfer}> Transfer Now </button>

<p><br /></p>

<input
    type="text"
    bind:value={targetWallet}
    placeholder="...enter target wallet"
/>
<p><br /></p>
<input
    type="text"
    bind:value={nftToBeTransferredAddress}
    placeholder="...enter nft address to be transferred"
/>
<p><br /></p>
<button on:click={transfer}> Transfer Now </button>

<style>
</style>
