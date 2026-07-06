document.addEventListener('DOMContentLoaded',()=>{
  const toPay=document.getElementById('toPay');
  const totalEl=document.getElementById('totalAmount');
  // read product info from query params
  const params = new URLSearchParams(window.location.search);
  const productName = params.get('name') || 'Paket Bandung Budget Explorer';
  const priceParam = parseInt(params.get('price') || '199499', 10);
  // optional image parameter passed from the previous page
  const imgParam = params.get('img') || '';
  const priceNormal = isNaN(priceParam) ? 350000 : priceParam;
  const discount = Math.round(priceNormal * 0.15);
  let total = priceNormal - discount;
  totalEl.textContent = 'Rp ' + total.toLocaleString('id-ID');

  // update product name in page (if present)
  const prodTitle = document.querySelector('.product-info h3');
  if (prodTitle) prodTitle.textContent = productName;
  const summaryTitle = document.querySelector('.summary-info strong');
  if (summaryTitle) summaryTitle.textContent = productName;
  const oldPriceEl = document.querySelector('.price-lines .old-price');
  if (oldPriceEl) oldPriceEl.textContent = 'Rp ' + priceNormal.toLocaleString('id-ID');

  // set transaction time
  const trxTime=document.getElementById('trxTime');
  const now=new Date();
  trxTime.textContent = now.toLocaleString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit'});

  // promo
  const applyPromo=document.getElementById('applyPromo');
  const promoInput=document.getElementById('promoCode');
  if (applyPromo && promoInput) {
    applyPromo.addEventListener('click',()=>{
      console.log('applyPromo clicked');
      const code = promoInput.value.trim();
      if(!code){ alert('Masukkan kode promo jika ada.'); return; }
      if(code.toUpperCase()==='ARB19'){
        const extra=20000; // potongan tambahan
        total = total - extra;
        const discEl = document.querySelector('.price-lines .discount');
        if (discEl) discEl.textContent = '-Rp ' + (discount + extra).toLocaleString('id-ID');
        totalEl.textContent = 'Rp ' + total.toLocaleString('id-ID');
        alert('Kode promo berhasil. Potongan Rp ' + extra.toLocaleString('id-ID'));
        applyPromo.disabled=true;
      } else {
        alert('Kode promo tidak valid.');
      }
    });
  } else {
    console.warn('Promo controls not found (applyPromo or promoCode)');
  }

  // Date selectors and live update of summary
  const daySel = document.getElementById('day');
  const monthSel = document.getElementById('month');
  const yearSel = document.getElementById('year');
  const summaryDateEl = document.querySelector('.summary-date');

  function monthName(m) {
    const names = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    const idx = parseInt(m,10) - 1;
    return names[idx] || '';
  }

  function updateSummaryDate() {
    if (!summaryDateEl) return;
    if (daySel && monthSel && yearSel && daySel.value && monthSel.value && yearSel.value) {
      const d = daySel.value.replace(/^0/, '');
      const mName = monthName(monthSel.value);
      summaryDateEl.textContent = `1 Orang • ${d} ${mName} ${yearSel.value}`;
    } else {
      summaryDateEl.textContent = '1 Orang • -';
    }
  }

  if (daySel && monthSel && yearSel) {
    daySel.addEventListener('change', updateSummaryDate);
    monthSel.addEventListener('change', updateSummaryDate);
    yearSel.addEventListener('change', updateSummaryDate);
  }
  updateSummaryDate();
  if (toPay) {
    toPay.addEventListener('click',()=>{
      console.log('toPay clicked — validating fields...');
      try {
        const firstEl = document.querySelector('input[name=firstName]');
        const lastEl = document.querySelector('input[name=lastName]');
        const emailEl = document.querySelector('input[name=email]');
        const waEl = document.querySelector('input[name=wa]');
        const first = firstEl ? firstEl.value.trim() : '';
        const last = lastEl ? lastEl.value.trim() : '';
        const email = emailEl ? emailEl.value.trim() : '';
        const wa = waEl ? waEl.value.trim() : '';
        if(!first||!last||!email||!wa){
          alert('Lengkapi data pemesan sebelum melanjutkan.');
          return;
        }
      } catch (err) {
        console.error('Error reading form fields:', err);
        alert('Terjadi kesalahan saat membaca data form. Coba muat ulang halaman.');
        return;
      }

      // Validate date selection
      if (!(daySel && monthSel && yearSel && daySel.value && monthSel.value && yearSel.value)) {
        alert('Pilih tanggal, bulan, dan tahun pemesanan terlebih dahulu.');
        return;
      }

      const day = daySel.value.padStart(2, '0');
      const month = monthSel.value.padStart(2, '0');
      const year = yearSel.value;
      const dateIso = `${year}-${month}-${day}`; // YYYY-MM-DD

      // redirect to payment-method selection page with product info and date
      const target = `pembayaran-metode.html?name=${encodeURIComponent(productName)}&price=${encodeURIComponent(total)}&date=${encodeURIComponent(dateIso)}` + (imgParam ? `&img=${encodeURIComponent(imgParam)}` : '');
      window.location.href = target;
    });
  } else {
    console.error('Tombol toPay tidak ditemukan di DOM.');
  }

  // If an image URL was provided, set it on the product and summary thumbnails
  if (imgParam) {
    try {
      const imgUrl = imgParam;
      const prodImg = document.querySelector('.product-row img');
      const summaryImg = document.querySelector('.summary-item img');
      if (prodImg) prodImg.src = imgUrl;
      if (summaryImg) summaryImg.src = imgUrl;
    } catch (err) {
      console.warn('Gagal memuat gambar produk:', err);
    }
  }
});
