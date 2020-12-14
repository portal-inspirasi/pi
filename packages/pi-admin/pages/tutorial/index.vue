<template>
  <v-layout justify-center row wrap>
    <div class="banner"></div>
    <!-- <ListHistory :history-data="historyData" /> -->
    <v-flex xs11>
      <v-card class="main-box">
        <v-card-text>
          <h2 class="primary--text my-2 mb-4">
            Totorial Menggunakan WebApp Kalkulator Ini
          </h2>
          <ul>
            <h3 class="primary--text"><li>Intro</li></h3>
            <p>
              Pada awal Anda mengunjungi situs ini, Anda sudah dapat menggunakan
              applikasi penghitungan ini di Halaman Utama, terdapat 3 produk
              sebagai demo.
            </p>
            <h3 class="primary--text"><li>Menghitung</li></h3>
            <ol>
              <li>
                Kunjungi Halaman Utama, kemudian pilih produk yang tersedia
                dengan cara mengetik atau memilih dari list menu input produk,
                kemudian masukkan jumlah kuantitas produk yang ingin dihitung
              </li>
              <li>
                Tekan tombol 'Plus' merah di sisi kanan jika ingin menambahkan
                produk lebih banyak
              </li>
              <li>
                Gunakan tombol 'Tong Sampah' untuk menghapus produk sebelumnya
                yang tidak jadi dihitung
              </li>
              <li>
                <p>
                  Tekan tombol 'Hitung!' kemudian Anda akan mendapatkan detil
                  penghitungan.
                </p>
              </li>
            </ol>
            <h3 class="primary--text"><li>Melihat Riwayat Penghitungan</li></h3>
            <p>
              Penghitungan yang Anda telah lakukan tidak hilang begitu saja :)
              <br />
              Anda dapat mengaksesnya melalui menu di sisi Kiri untuk melihat
              'Riwayat Kalkulasi'. Riwayat kalkulasi Anda tidak hilang kecuali
              jika anda menekan tombol 'Hapus Riwayat'
            </p>
            <h3 class="primary--text"><li>Setelan</li></h3>
            <ul>
              <h4 class="primary--text">
                <li>Master File Resep Kombinasi</li>
              </h4>
              <p>
                Anda dapat mengubah resep kombinasi master pada menu "Pengaturan
                Kalkulasi" di sisi kiri
              </p>
              <ol>
                <li>
                  Download file template MS Excel yang tersedia pada tombol
                  'Download Sampel'
                </li>
                <li>Ubah data dengan editor MS Excel atau sejenisnya</li>
                <li>
                  Setiap kolom merupakan data material (untuk saat ini gunakan
                  huruf kecil non spasi untuk menghindari bug/sistem error)
                </li>
                <li>
                  Setiap baris merupakan data produk (Dapat ditulis dengan huruf
                  kapital dan spasi)
                </li>
                <li>
                  Kombinasi kolom dan baris merupakan resep suatu produk
                  membutuhkan material apa saja dengan kuantitas berapa untuk
                  dapat diproduksi
                </li>
                <li>
                  <p>
                    Simpan file tersebut kemudian unggah pada tombol 'Upload'
                    dengan nama extensi yang sama (.xlsx)
                  </p>
                </li>
              </ol>
              <h4 class="primary--text">
                <li>Setelan Persentase Penambahan</li>
              </h4>
              <p>
                Anda dapat mengubah jumlah dalam persentase setiap hasil
                perhitungan sesuai analisa dan kondisi yang aktual
              </p>
              <ol>
                <li>
                  Ubah 'Pengaturan Rasio Penambahan' dengan cara menggeser input
                  bar yang memilingi range nilai 0 sampai 100%
                </li>
                <li>
                  Anda tidak perlu melakukan hal apapun lagi karena sudah
                  otomatis tersimpan pada sistem
                </li>
                <li>
                  <p>
                    Perubahan 'Pengaturan Rasio Penambahan' tidak mempengaruhi
                    hasil pada riwayat kalkulasi
                  </p>
                </li>
              </ol>
            </ul>
          </ul>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class Tutorial extends Vue {
  /* ------------------------------------
  => Local State Declaration
  ------------------------------------ */
}
</script>

<style lang="stylus" scoped>
.transform-none {
  text-transform: none;
  letter-spacing: inherit;
}
.banner {
  // background-image: url(https://picsum.photos/1920/1080?random)
  background-image: url(https://as1.ftcdn.net/jpg/02/05/42/88/500_F_205428815_0IpiDDuS65FMqnLbigzoXmjUUDpDhZVX.jpg)
  background-repeat: repeat;
  background-size: 10%;
  opacity: 0.3;
  width: 100%
  top: 0;
  bottom: 0;
  position: absolute;
}
.slider-content {
  overflow: auto;
  .slider-item {
    min-width: 400px;
    >>> .v-card__subtitle {
      min-height: 75px;
    }
  }
}
.transform-none {
  text-transform: none;
  letter-spacing: inherit;
}
.main-box {
  margin: 30px 0 100px 0;
  padding: 10px;
  opacity: 0.80;
  .v-card__text {
    padding-bottom: 0;
  }
  >>> .coupon-revealer {
    text-align: right;
    display: block;
    .coupon-activator:hover {
      color: red;
      opacity: 0.6;
      transition: 0.3s;
      cursor: pointer;
    }
  }
}
</style>
