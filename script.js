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

        // Validasi Sederhana: Nama
        if (nama.length < 3) {
            outputPesan.style.display = 'block'; 
            outputPesan.style.backgroundColor = '#FEF2F2';
            outputPesan.style.color = '#EF4444';
            outputPesan.style.border = '1px solid #FCA5A5';
            outputPesan.textContent = 'Gagal: Nama pelanggan minimal harus 3 karakter!';
            return; 
        }

        // Validasi Sederhana: Nomor WA
        if (noWA.length < 10) {
            outputPesan.style.display = 'block'; 
            outputPesan.style.backgroundColor = '#FEF2F2';
            outputPesan.style.color = '#EF4444';
            outputPesan.style.border = '1px solid #FCA5A5';
            outputPesan.textContent = 'Gagal: Nomor WhatsApp tidak valid!';
            return; 
        }

        // Tampilkan pesan sukses di HTML (Manipulasi DOM)
        outputPesan.style.display = 'block'; 
        outputPesan.style.backgroundColor = '#F0FDF4';
        outputPesan.style.color = '#16A34A';
        outputPesan.style.border = '1px solid #86EFAC';
        outputPesan.textContent = `Berhasil! Pesanan ${paket} atas nama ${nama} (WA: ${noWA}) akan segera diproses.`;
        
        formLaundry.reset(); // Mengosongkan form
    });
}


// ==========================================
// 2. FETCH API (Mengambil Data JSON)
// ==========================================
async function tampilkanProduk() {
    const container = document.getElementById('product-container');
    if (!container) return;

    // Loading status
    container.innerHTML = '<p style="color: #64748B;">Sedang memuat data produk dari server...</p>';

    try {
        const response = await fetch('https://dummyjson.com/products');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Kosongkan tulisan loading
        container.innerHTML = '';

        // Tampilkan 4 produk pertama
        data.products.slice(0, 4).forEach(produk => {
            const divProduk = document.createElement('div');
            divProduk.classList.add('product-item');
            
            // Minimal menampilkan nama (title) dan harga (price)
            divProduk.innerHTML = `
                <img src="${produk.thumbnail}" alt="${produk.title}">
                <h3>${produk.title}</h3>
                <p>${produk.category}</p>
                <div class="product-price">$${produk.price}</div>
            `;
            
            container.appendChild(divProduk);
        });

    } catch (error) {
        container.innerHTML = `<p style="color: #EF4444; padding: 16px; background: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 8px;">Gagal memuat produk: ${error.message}</p>`;
    }
}

// Panggil fitur fetch saat halaman dimuat
tampilkanProduk();