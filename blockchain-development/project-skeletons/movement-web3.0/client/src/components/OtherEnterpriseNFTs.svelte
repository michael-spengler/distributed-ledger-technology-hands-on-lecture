<script>
    import { ethers } from "https://cdn.skypack.dev/ethers";
    import { erc721ABI } from "../abi-constants.ts";
    import { UnitConverter } from "https://deno.land/x/units/mod-ethereum-blockchain.ts";
    import Details from "./Details.svelte";

    export let nftsUnderManagement = [];
    export let account = "";
    export let provider;
    export let offerTransactionLink = "";
    export let selectedEnterprise;

    function showDetails(index) {
        nftsUnderManagement[index].showDetails =
            !nftsUnderManagement[index].showDetails;
    }

    async function makeOffer(nftUnderManagement) {
        const erc721Contract = await new ethers.Contract(
            nftUnderManagement.address,
            erc721ABI,
            provider
        );

        const ownerOfThisNFT = await erc721Contract.owner();

        const signer = await provider.getSigner();
        const erc721ContractWithSigner = erc721Contract.connect(signer);

        const options = {
            value: ethers.utils.parseEther(nftUnderManagement.bid.toString()),
        };
        const result = await erc721ContractWithSigner.makeOffer(options);
        console.log(`result: ${JSON.stringify(result)}`);
        offerTransactionLink = `https://ropsten.etherscan.io/tx/${result.hash}`;

        // const signer = await provider.getSigner();
        // const gasPrice = await provider.getGasPrice();

        // const offerAmountInWei = UnitConverter.convert(
        //     "Ether",
        //     offer.bid,
        //     "Wei"
        // );
        // const tx = {
        //     from: account,
        //     to: nftAddress,
        //     value: ethers.utils.parseEther(offer.bid.toString()),
        //     gasLimit: 3000000,
        //     gasPrice: gasPrice,
        // };

        // signer.makeOffer(tx).then((transaction) => {
        //     console.dir(transaction);
        //     alert("Send finished!");
        // });
    }
</script>

<h3>{selectedEnterprise.name} NFTs</h3>
{#if offerTransactionLink !== ""}
    <p>
        Please check the <a href={offerTransactionLink} target="_blank"
            >status of your offer on the Ethereum Blockchain</a
        >
    </p>
{/if}

{#each nftsUnderManagement as nftUnderManagement, index}
    {#if nftUnderManagement.owner.toLowerCase() !== account}
        <div
            class="list"
            on:click={() => showDetails(index)}
            style="cursor: pointer;"
        >
            <table>
                <tr>
                    <th> Artifact </th>
                    <th> Name </th>
                    <th> Owner</th>
                    <th> Highest Bid </th>
                    <th> Your Bid </th>
                </tr>
                <tr>
                    <td style="width: fit-content;">
                        <img
                            src="https://raw.githubusercontent.com/Enterprise-NFT/nft-artifacts/main/EnterpriseNFTLogo.png"
                            width="40"
                            height="40"
                            alt=""
                        />
                    </td>
                    <td> {nftUnderManagement.name} </td>

                    {#if nftUnderManagement.owner === account}
                        <td> You </td>
                    {:else}
                        <td> {nftUnderManagement.owner} </td>
                    {/if}

                    <td>
                        {UnitConverter.convert(
                            "Wei",
                            nftUnderManagement.highestOffer.amount,
                            "Ether"
                        )} Ether
                    </td>
                    <td>
                        <input
                            type="number"
                            bind:value={nftUnderManagement.bid}
                            placeholder="... enter your offer"
                        /> <br />

                        {#if nftUnderManagement.bid > 0}
                            <button on:click={makeOffer(nftUnderManagement)}>
                                Make Offer
                            </button>
                        {/if}
                    </td>
                </tr>
            </table>

            {#if nftsUnderManagement[index].showDetails}
                <Details bind:nftOfInterest={nftUnderManagement} />
            {/if}
        </div>
    {/if}
{/each}

<style>
    .list {
        padding-top: 2em;
        color: white;
    }

    h3 {
        color: turquoise;
        font-size: 40px;
        font-weight: 200;
    }
    table {
        align-items: center;
        width: 100;
        margin-left: auto;
        margin-right: auto;
    }
    td,
    th {
        border: 1px solid white;
    }

    button {
        margin-top: 1em;
        margin-bottom: 1em;
        margin-left: 1em;
        margin-right: 1em;
    }
</style>
