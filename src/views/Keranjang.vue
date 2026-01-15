<template>
    <div class="keranjang">
        <AppNavbar :updateKeranjang="keranjangs" />
        <div class="container">
            <!-- breadcrumb -->
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
                            <li class="breadcrumb-item active" aria-current="page">Keranjang</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <h2>
                        Keranjang
                        <strong>Saya</strong>
                    </h2>
                    <div class="table-responsive mt-3">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Foto</th>
                                    <th scope="col">Makanan</th>
                                    <th scope="col">Keterangan</th>
                                    <th scope="col">Jumlah</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Total Harga</th>
                                    <th scope="col">Hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id">
                                    <th>{{ index + 1 }}</th>

                                    <td>
                                        <img :src="`/images/${keranjang.gambar}`" class="img-fluid shadow"
                                            width="120" />
                                    </td>

                                    <td>
                                        <strong>{{ keranjang.nama }}</strong>
                                    </td>

                                    <td>{{ keranjang.keterangan || "-" }}</td>

                                    <td>{{ keranjang.jumlah_pemesanan }}</td>

                                    <td align="right">
                                        Rp {{ formatHarga(keranjang.harga) }}
                                    </td>

                                    <td align="right">
                                        <strong>
                                            Rp {{ formatHarga(keranjang.harga * keranjang.jumlah_pemesanan) }}
                                        </strong>
                                    </td>

                                    <td class="text-center">
                                        <button class="btn btn-link text-danger p-0" title="Hapus"
                                            @click="hapusKeranjang(keranjang.id)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td colspan="6" align="right">
                                        <strong>Total Harga :</strong>
                                    </td>
                                    <td align="right">
                                        <strong>Rp. {{ totalHarga }}</strong>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Form Checkout -->
            <div class="row justify-content-end">
                <div class="col-md-4">
                    <form class="mt-4" v-on:submit.prevent>
                        <div class="form-group">
                            <label for="nama">Nama :</label>
                            <input type="text" class="form-control" v-model="pesan.nama" />
                        </div>
                        <div class="form-group">
                            <label for="noMeja">Nomor Meja :</label>
                            <input type="text" class="form-control" v-model="pesan.noMeja" />
                        </div>

                        <button type="submit" class="btn btn-success float-right" @click="checkout">
                            <b-icon-cart></b-icon-cart>Pesan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppNavbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
    name: "KeranjangView",
    components: {
        AppNavbar,
    },
    data() {
        return {
            keranjangs: [],
            pesan: {},
        };
    },
    methods: {
        setKeranjangs(data) {
            this.keranjangs = data;
        },
        hapusKeranjang(id) {
            axios
                .delete("http://localhost:3000/keranjangs/" + id)
                .then(() => {
                    this.$toast.error("Sukses Hapus Keranjang", {
                        type: "error",
                        position: "top-right",
                        duration: 3000,
                        dismissible: true,
                    });

                    // Update Data keranjang
                    axios
                        .get("http://localhost:3000/keranjangs")
                        .then((response) => this.setKeranjangs(response.data))
                        .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
        },
        checkout() {
            if (!this.pesan.nama || !this.pesan.noMeja) {
                this.$toast.error("Nama dan Nomor Meja Harus diisi")
                return
            }

            axios.post("http://localhost:3000/pesanans", {
                nama: this.pesan.nama,
                noMeja: this.pesan.noMeja,
                keranjangs: this.keranjangs
            })
                .then(() => {
                    this.$toast.success("Pesanan berhasil dikirim")
                    this.$router.push("/pesanan-sukses")
                })
                .catch(err => {
                    console.error("CHECKOUT ERROR:", err.response?.data || err)
                    this.$toast.error("Gagal mengirim pesanan")
                })
        },
        formatHarga(value) {
            return new Intl.NumberFormat("id-ID").format(value)
        },
    },
    mounted() {
        axios
            .get("http://localhost:3000/keranjangs")
            .then((response) => this.setKeranjangs(response.data))
            .catch((error) => console.log(error));
    },
    computed: {
        // totalHarga() {
        //     return this.keranjangs.reduce(function (items, data) {
        //         return items + data.products.harga * data.jumlah_pemesanan;
        //     }, 0);
        // },
        totalHarga() {
            return this.keranjangs.reduce((total, item) => {
                return total + item.harga * item.jumlah_pemesanan
            }, 0)
        }
    },
};

</script>

<style></style>