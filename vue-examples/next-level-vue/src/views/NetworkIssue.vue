<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>
      It's looks like you're exrepiencing some network issues, please click the
      back button and try again
    </h3>
    <router-link :to="{ name: 'event-list' }"
      >Or go back to the home page</router-link
    >
  </div>
</template>

<script>
export default {}
</script>

<style></style>
