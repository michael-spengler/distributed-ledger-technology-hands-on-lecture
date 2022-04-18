<script>
    export let nftOfInterest;
</script>

{JSON.stringify(nftOfInterest)}
<div class="list">
    {#each nftOfInterest.offers as offer}
        <table>
            <tr>
                <th> From </th>
                <th> Amount </th>
            </tr>
            <tr>
                <td>
                    {offer.from}
                </td>
                <td>
                    {offer.amount}
                </td>
            </tr>
        </table>
    {/each}
</div>

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

    p {
        color: white;
    }
</style>
