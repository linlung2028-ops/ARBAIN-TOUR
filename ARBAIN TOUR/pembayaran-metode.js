document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productName = params.get('name') || 'Paket Bandung Budget Explorer';
  const price = params.get('price') || '';
  const date = params.get('date') || '';
  const img = params.get('img') || '';

  const summaryTitle = document.getElementById('summaryTitle');
  const summaryImg = document.getElementById('summaryImg');
  const summaryDate = document.getElementById('summaryDate');
  const totalAmount = document.getElementById('totalAmount');
  const trxTime = document.getElementById('trxTime');

  if (summaryTitle) summaryTitle.textContent = productName;
  if (summaryImg && img) summaryImg.src = img;
  if (summaryDate) summaryDate.textContent = (date ? `1 Orang • ${formatDateFriendly(date)}` : '1 Orang • -');
  if (totalAmount && price) totalAmount.textContent = 'Rp ' + parseInt(price,10).toLocaleString('id-ID');

  const now = new Date();
  if (trxTime) trxTime.textContent = now.toLocaleString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit'});

  function formatDateFriendly(iso) {
    try {
      const [y,m,d] = iso.split('-');
      const names = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
      return `${parseInt(d,10)} ${names[parseInt(m,10)-1]} ${y}`;
    } catch (e) { return iso; }
  }

  let selectedMethod = null;
  const payButtons = document.querySelectorAll('.pay-method');
  payButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      payButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedMethod = btn.dataset.method || null;
      console.log('method selected:', selectedMethod);
    });
  });

  const confirmBtn = document.getElementById('confirmMethod');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (!selectedMethod) { alert('Pilih metode pembayaran terlebih dahulu.'); return; }
      const target = `pembayaran-va.html?name=${encodeURIComponent(productName)}&price=${encodeURIComponent(price)}&date=${encodeURIComponent(date)}&method=${encodeURIComponent(selectedMethod)}` + (img ? `&img=${encodeURIComponent(img)}` : '');
      window.location.href = target;
    });
  }

  const backEdit = document.getElementById('backEdit');
  if (backEdit) {
    backEdit.addEventListener('click', (e) => {
      e.preventDefault();
      // go back to pembayaran.html preserving name, price, date and img
      const target = `pembayaran.html?name=${encodeURIComponent(productName)}&price=${encodeURIComponent(price)}&date=${encodeURIComponent(date)}` + (img ? `&img=${encodeURIComponent(img)}` : '');
      window.location.href = target;
    });
  }
});
