const axiosInstance = require('../config/axiosInstance');
const getEnv = require('../helper/getEnv');

/**
  Melihat Daftar Kategori
  Melihat sub-kategori berdasarkan ID Kategori Utama 
  Melihat Atribut Kategori berdasarkan ID Kategori 
  Melihat daftar Template Pengiriman
  Upload Produk (Memasukkan Product) 
  Update Produk 
  Melihat Detail Produk 
  Melihat Daftar Produk
  Edit Opsi Produk
  Merubah Harga Satuan
  Merubah Diskon Satuan
  Melihat ProductStockNo Satuan
  Melihat ProductStockNo Lebih Dari Satu 
  Merubah kuantiti produk (Update Stok) 
  Menyembunyikan produk (Merubah status produk ke ‘105’ - ‘Disembunyikan’) 
  Mengaktifkan ulang produk tersebmbunyi (Merubah status produk ke ‘103’ - ‘Aktif’) psql
 */

/**
 *
 * @param {{
 * url: string,
 * method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
 * }} options
 * @returns
 */
function elevaniaHost(options) {
  const baseURL = 'http://api.elevenia.co.id/rest';
  const instance = axiosInstance(baseURL);
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        options.headers = { openapikey: getEnv('ELEVANIA_API_KEY') };
        const { data } = await instance(options);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    })();
  });
}

module.exports = elevaniaHost;
