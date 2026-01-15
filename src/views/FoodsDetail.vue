<template>
    <div class="food-detail">
        <Navbar />

        <div class="container" v-if="product">
            <!-- BREADCRUMB -->
            <div class="row mt-4">
                <div class="col">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/" class="text-dark">Home</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/foods" class="text-dark">Foods</router-link>
                            </li>
                            <li class="breadcrumb-item active">Food Order</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row mt-3">
                <!-- IMAGE -->
                <div class="col-md-6">
                    <img :src="`/images/${product.gambar}`" class="img-fluid shadow" :alt="product.nama" />
                </div>

                <!-- DETAIL -->
                <div class="col-md-6">
                    <h2><strong>{{ product.nama }}</strong></h2>
                    <hr />

                    <h4>
                        Harga :
                        <strong>Rp {{ formatHarga(product.harga) }}</strong>
                    </h4>

                    <form class="mt-4" @submit.prevent="pemesanan">
                        <div class="form-group">
                            <label>Jumlah Pesan</label>
                            <input type="number" min="1" class="form-control" v-model.number="pesan.jumlah_pemesanan"
                                required />
                        </div>

                        <div class="form-group">
                            <label>Keterangan</label>
                            <textarea v-model="pesan.keterangan" class="form-control"
                                placeholder="Keterangan spt : Pedes, Nasi Setengah .."></textarea>
                        </div>

                        <button type="submit" class="btn btn-success mt-2">
                            <b-icon-cart class="mr-1" /> Pesan
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <div v-else class="text-center mt-5">
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import { api } from "@/services/api"

export default {
    name: "FoodDetail",
    components: { Navbar },
    data() {
        return {
            product: null,
            pesan: {
                jumlah_pemesanan: 1,
                keterangan: ""
            }
        }
    },
    methods: {
        formatHarga(value) {
            return new Intl.NumberFormat("id-ID").format(value)
        },
        async pemesanan() {
            if (!this.pesan.jumlah_pemesanan || this.pesan.jumlah_pemesanan < 1) {
                this.$toast.error("Jumlah pesanan harus diisi")
                return
            }

            try {
                await api.post("/keranjangs", {
                    product_id: this.product.id, // ⬅️ INI WAJIB
                    jumlah_pemesanan: this.pesan.jumlah_pemesanan,
                    keterangan: this.pesan.keterangan
                })

                this.$toast.success("Sukses masuk keranjang")
                this.$router.push("/keranjang")
            } catch (err) {
                console.error("ERROR KERANJANG:", err.response?.data || err)
                this.$toast.error("Gagal menambahkan ke keranjang")
            }
        }


    },
    async mounted() {
        try {
            const res = await api.get(`/products/${this.$route.params.id}`)
            this.product = res.data
        } catch (err) {
            console.error("Gagal mengambil produk:", err)
        }
    }
}
</script>

<style scoped>
.food-detail img {
    border-radius: 8px;
}
</style>
