<template>
    <AppNavbar />
    <div class="container mt-5">
        <h2>Kelola Produk</h2>

        <button class="btn btn-primary mb-3" @click="showForm = true; resetForm()">
            Tambah Produk
        </button>

        <div v-if="showForm" class="card mb-4 p-3">
            <h5>{{ editMode ? "Edit Produk" : "Tambah Produk" }}</h5>
            <form @submit.prevent="submitForm">
                <div class="form-group mb-2">
                    <label>Kode Produk</label>
                    <input type="text" class="form-control" v-model="form.kode" required />
                </div>
                <div class="form-group mb-2">
                    <label>Nama Produk</label>
                    <input type="text" class="form-control" v-model="form.nama" required />
                </div>
                <div class="form-group mb-2">
                    <label>Harga</label>
                    <input type="number" class="form-control" v-model.number="form.harga" required />
                </div>
                <div class="form-group mb-2">
                    <label>Gambar (nama file di /images/)</label>
                    <input type="text" class="form-control" v-model="form.gambar" />
                </div>

                <button type="submit" class="btn btn-success">
                    {{ editMode ? "Update" : "Tambah" }}
                </button>
                <button type="button" class="btn btn-secondary ml-2" @click="showForm = false">
                    Batal
                </button>
            </form>
        </div>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Harga</th>
                    <th>Gambar</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="product.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ product.nama }}</td>
                    <td>Rp {{ formatHarga(product.harga) }}</td>
                    <td>
                        <img v-if="product.gambar" :src="`/images/${product.gambar}`" width="100" />
                        <span v-else>-</span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-warning" @click="editProduct(product)">Edit</button>
                        <button class="btn btn-sm btn-danger" @click="hapusProduct(product.id)">Hapus</button>
                    </td>
                </tr>
                <tr v-if="products.length === 0">
                    <td colspan="5" class="text-center">Belum ada produk</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";
import AppNavbar from "@/components/Navbar.vue";

export default {
    name: "AdminProduct",
    components: {
        AppNavbar,
    },
    data() {
        return {
            products: [],
            showForm: false,
            editMode: false,
            form: {
                id: null,
                nama: "",
                harga: null,
                gambar: ""
            }
        };
    },
    methods: {
        async fetchProducts() {
            try {
                const res = await axios.get("http://localhost:3000/products");
                this.products = res.data;
            } catch (err) {
                console.error("Gagal fetch produk:", err);
            }
        },
        formatHarga(value) {
            return new Intl.NumberFormat("id-ID").format(value);
        },
        resetForm() {
            this.form = { id: null, nama: "", harga: null, gambar: "" };
            this.editMode = false;
        },
        editProduct(product) {
            this.showForm = true;
            this.editMode = true;
            this.form = { ...product };
        },
        async submitForm() {
            try {
                if (this.editMode) {
                    await axios.put(
                        `http://localhost:3000/products/${this.form.id}`,
                        this.form
                    );
                    this.$toast.success("Produk berhasil diperbarui");
                } else {
                    await axios.post("http://localhost:3000/products", this.form);
                    this.$toast.success("Produk berhasil ditambahkan");
                }

                this.showForm = false;
                this.fetchProducts();
            } catch (err) {
                console.error("Gagal submit produk:", err.response?.data || err);
                this.$toast.error("Gagal menyimpan produk");
            }
        },
        async hapusProduct(id) {
            if (!confirm("Yakin ingin menghapus produk ini?")) return;
            try {
                await axios.delete(`http://localhost:3000/products/${id}`);
                this.fetchProducts();
                this.$toast.success("Produk berhasil dihapus");
            } catch (err) {
                console.error("Gagal hapus produk:", err.response?.data || err);
                this.$toast.error("Gagal menghapus produk");
            }
        }
    },
    mounted() {
        this.fetchProducts();
    }
};
</script>

<style scoped>
img {
    border-radius: 8px;
}

.table th,
.table td {
    vertical-align: middle;
}
</style>
