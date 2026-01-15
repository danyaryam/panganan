<template>
    <div class="row min-vh-75 align-items-center">
        <div class="col-md-6 text-md-left mx-auto ml-md-4">
            <h1 class="mb-3">
                <strong>Delicious Foods,</strong><br />
                On Your Experience
            </h1>
            <p class="mb-4">
                Let's choose and order your favorite food immediately.
            </p>
            <router-link to="/foods" class="btn btn-outline-success">
                Order Now
            </router-link>
        </div>

        <div class="col-md-6 d-flex justify-content-center">
            <img src="/images/hero.png" alt="Hero Image" class="img-fluid" style="max-width: 320px;" />
        </div>
    </div>
</template>

<script>
export default {
    name: "AppHero",
}
</script>

<style></style>