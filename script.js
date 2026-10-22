// ==========================================
// 1. DOM & EVENT HANDLING (Form Validasi)
// ==========================================
const formLaundry = document.getElementById('laundryForm');
const outputPesan = document.getElementById('pesanOutput');

if (formLaundry) {
    formLaundry.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form memuat ulang halaman
        
        const nama = document.getElementById('namaLengkap').value.trim();
        const noWA = document.getElementById('nomorWA').value.trim();
        const paket = document.getElementById('paketLaundry').value;

        // Validasi Sederhana
        if (nama.length < 3) {
            outputPesan.style.backgroundColor = '#ffe6e6';
            outputPesan.style.color = '#d9534f';
            outputPesan.textContent = 'Gagal: Nama pelanggan minimal harus 3 karakter!';
            return; 
        }

        // Tampilkan pesan sukses di HTML (Manipulasi DOM)
        outputPesan.style.backgroundColor = '#e6ffed';
        outputPesan.style.color = '#28a745';
        outputPesan.textContent = `Berhasil! Pesanan ${paket} atas nama ${nama} (WA: ${noWA}) akan segera diproses.`;
        
        formLaundry.reset(); // Mengosongkan form
    });
}