<script>
  import Home from "@/components/Home.svelte";
  import Connect from "@/components/Connect.svelte";
  import { fade } from "svelte/transition";

  let name = "World";
  let account = "";
  let provider = "";
</script>

<main transition:fade>
  <Connect bind:account bind:provider />
  <Home {name} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
