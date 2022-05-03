<script>
    import { ethers } from "https://cdn.skypack.dev/ethers";

    export let account = "";
    export let provider = "";

    async function connectToBrowserWallet() {
        if (typeof window.ethereum === "undefined") {
            alert("You need to install a browserwallet like metamask.io.");
        } else {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            account = accounts[0];
            provider = new ethers.providers.Web3Provider(
                window.ethereum,
                "any"
            );
        }
    }
</script>

<div class="account">
    {#if account !== ""}
        You are logged in via the following browserwallet: <p />
        {account} <br />on chainID {provider.provider.chainId}.
    {:else}
        <button on:click={connectToBrowserWallet}>Connect Browserwallet</button>
    {/if}
</div>

<style>
    .account {
        padding-top: 2em;
        color: white;
    }
</style>
