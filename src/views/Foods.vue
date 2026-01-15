<template>
    <AppNavbar />

    <div class="container">
        <div class="row mt-4">
            <div class="col">
                <h2>
                    Daftar <strong>Makanan</strong>
                </h2>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col">
                <div class="input-group mb-3">
                    <input v-model="search" type="text" class="form-control" placeholder="Cari Makanan Kesukaan Anda .."
                        aria-label="Cari" @input="filterProducts" />
                    <span class="input-group-text">
                        <i class="bi bi-search"></i>
                    </span>
                </div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-md-4 mt-4" v-for="product in filteredProducts" :key="product.id">
                <CardProduct :product="product" />
            </div>

            <div v-if="!loading && filteredProducts.length === 0" class="col">
                <p class="text-muted">Produk tidak ditemukan</p>
            </div>
        </div>
    </div>
</template>

<script>
import AppNavbar from "@/components/Navbar.vue"
import CardProduct from "@/components/CardProduct.vue"
import { api } from "@/services/api"

export default {
    name: "FoodsView",
    components: {
        AppNavbar,
        CardProduct
    },
    data() {
        return {
            products: [],
            filteredProducts: [],
            search: "",
            loading: true
        }
    },
    methods: {
        async fetchProducts() {
            try {
                const res = await api.get("/products")
                this.products = res.data
                this.filteredProducts = res.data
            } catch (err) {
                console.error("Gagal mengambil produk:", err)
            } finally {
                this.loading = false
            }
        },
        filterProducts() {
            const keyword = this.search.toLowerCase()

            this.filteredProducts = this.products.filter(product =>
                product.nama.toLowerCase().includes(keyword)
            )
        }
    },
    mounted() {
        this.fetchProducts()
    }
}
</script>

<style scoped>
.input-group-text {
    cursor: pointer;
}
</style>