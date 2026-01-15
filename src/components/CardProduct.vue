<template>
    <div class="card shadow card-product" v-if="product">
        <img :src="'/images/' + product.gambar" class="card-img-top" :alt="product.nama" />

        <div class="card-body">
            <h5 class="card-title">{{ product.nama }}</h5>

            <p class="card-text">
                Harga : Rp {{ formatHarga(product.harga) }}
            </p>

            <router-link class="btn btn-success" :to="`/foods/${product.id}`">
                <i class="bi bi-bag ms-1"></i>
                Pesan
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardProduct",
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    computed: {
        imageUrl() {
            // aman untuk asset lokal & production
            return `/assets/images/${this.product.gambar}`
        }
    },
    methods: {
        formatHarga(value) {
            return new Intl.NumberFormat("id-ID").format(value)
        }
    }
}
</script>

<style scoped>
.card-product {
    transition: transform 0.2s ease;
}

.card-product:hover {
    transform: translateY(-4px);
}
</style>
