<template>
    <AppNavbar />
    <div class="container mt-5">
        <div class="d-flex align-items-center justify-content-between mb-4">
            <div class="d-flex align-items-center">
                <router-link to="/" class="btn btn-light btn-sm me-3" title="Kembali">
                    ←
                </router-link>
                <h3 class="mb-0 font-weight-bold">Pesanan Masuk</h3>
            </div>
            <div class="d-flex align-items-center">
                <router-link to="/admin-product" class="btn btn-outline-success btn-sm d-flex align-items-center"
                    title="Tambah Product">
                    <span class="me-2">+</span> Tambah Product
                </router-link>
            </div>
        </div>

        <div v-if="pesanans.length === 0" class="text-center text-muted mt-5">
            <p>Tidak ada pesanan masuk.</p>
        </div>
        <!-- PESANAN LIST -->
        <div v-for="pesanan in pesanans" :key="pesanan.id" class="card mb-4 shadow-sm">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h5 class="mb-1 font-weight-bold">
                            {{ pesanan.nama }}
                        </h5>
                        <small class="text-muted">
                            Meja {{ pesanan.no_meja }}
                        </small>
                    </div>
                    <span class="badge badge-warning px-3 py-2">
                        Pending
                    </span>
                </div>

                <ul class="list-group list-group-flush mb-3">
                    <li v-for="item in pesanan.items" :key="item.id"
                        class="list-group-item d-flex justify-content-between align-items-center px-0">
                        <div>
                            <strong>{{ item.nama }}</strong>
                            <div class="text-muted small">
                                Qty: {{ item.jumlah }}
                            </div>
                        </div>
                        <span>
                            Rp {{ item.harga }}
                        </span>
                    </li>
                </ul>
                <div class="text-right">
                    <button class="btn btn-success px-4" @click="donePesanan(pesanan.id)">
                        DONE
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import AppNavbar from "@/components/Navbar.vue"
import axios from "axios"

export default {
    name: "AdminPesanan",
    components: { AppNavbar },
    data() {
        return {
            pesanans: []
        }
    },
    methods: {
        async fetchPesanan() {
            const res = await axios.get("http://localhost:3000/admin/pesanans")

            const withItems = await Promise.all(
                res.data.map(async (p) => {
                    const items = await axios.get(
                        `http://localhost:3000/admin/pesanans/${p.id}`
                    )
                    return { ...p, items: items.data }
                })
            )
            this.pesanans = withItems
        },
        async donePesanan(id) {
            await axios.delete(`http://localhost:3000/admin/pesanans/${id}`)
            this.fetchPesanan()
        }
    },
    mounted() {
        this.fetchPesanan()
    }
}
</script>
