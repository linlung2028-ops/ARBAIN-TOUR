document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const booking = params.get('booking') || params.get('code') || '';
  const name = params.get('name') || '';
  const date = params.get('date') || '';
  const desc = params.get('desc') || '';
  const img = params.get('img') || '';
  const pax = params.get('pax') || params.get('people') || '';
  const place = params.get('place') || params.get('location') || '';
  const rating = params.get('rating') || '';
  const reviews = params.get('reviews') || '';

  const bookingEl = document.getElementById('et-booking');
  const titleEl = document.getElementById('et-title');
  const dateEl = document.getElementById('et-date');
  const imgEl = document.getElementById('et-image');
  const qrImg = document.getElementById('et-qr-img');

  if (bookingEl) bookingEl.textContent = booking || '-';
  if (titleEl && name) titleEl.textContent = name;
  if (dateEl && date) dateEl.textContent = date;
  if (desc && document.getElementById('et-desc')) document.getElementById('et-desc').textContent = desc;
  if (pax && document.getElementById('et-desc')) {
    // append pax/place to description area if present
    const extra = document.createElement('div'); extra.style.marginTop='8px'; extra.style.color='var(--muted)';
    extra.textContent = `${pax} • ${place}`;
    document.getElementById('et-desc').appendChild(extra);
  }
  if (rating && document.getElementById('et-desc')) {
    const revEl = document.createElement('div'); revEl.style.marginTop='8px'; revEl.style.color='var(--muted)';
    revEl.textContent = `${rating} ${reviews}`;
    document.getElementById('et-desc').appendChild(revEl);
  }
  // set destination image or fallback
  const fallback = 'assets/destinasi.jpg';
  // mapping from product name keywords to local assets
  const assetMap = [
    {k: ['kawah','putih'], v: 'assets/Kawah-Putih-Tour-Bandung-2.webp'},
    {k: ['perkebunan','teh','malabar','pangalengan','kebun'], v: 'assets/perkebunan teh malabar pangalengan 2.jpg'},
    {k: ['dusun','bambu','dusun bambu'], v: 'assets/dusun-bambu_11zon-scaled.jpg'},
    {k: ['padma','hotel','penginapan','paradise','hotel'], v: 'assets/padma-hotel-bandung-bandung-pic-6.jpg'},
    {k: ['grafika','cikole','orchid','orchid garden'], v: 'assets/grafika-cikole-lembang.jpg'},
    {k: ['lembang'], v: 'assets/Lembang, Bandung.jpg'},
    {k: ['family','adventure'], v: 'assets/family adventure.jpg'},
    {k: ['villa'], v: 'assets/villa.jpg'},
    {k: ['factory','outlet','factory outlet'], v: 'assets/factory outlet.jpg'},
    {k: ['bale','bambu','bale bambu'], v: 'assets/bale bambu.jpg'},
    {k: ['ciwidey'], v: 'assets/bandung Ciwidey kebun teh.jpg'},
    {k: ['destinasi'], v: 'assets/destinasi.jpg'},
    {k: ['tangkuban','perahu'], v: 'assets/tangkuban perahu.jpeg'},
    {k: ['kebon','pines','kebon pines','pine'], v: 'assets/kebon pines.webp'},
    {k: ['factory','fastrans','fastrans travel'], v: 'assets/Fastrans Travel _ Bandung Tour - Paket Tour Wisata Bandung.jpg'},
    {k: ['padma','hotel','padma'], v: 'assets/padma-hotel-bandung-bandung-pic-6.jpg'},
    {k: ['orpchid','orchid','orchid garden'], v: 'assets/Orchid Garden Cikole - Google Penelusuran.jpg'},
    {k: ['kebun','teh','malabar'], v: 'assets/wisata-perkebunan-teh-malabar-bandung-2.jpg'},
    {k: ['family','adventure'], v: 'assets/family adventure.jpg'},
    {k: ['alun','alun'], v: 'assets/alun alun bandung.jpg'},
    {k: ['padang','bandung','bandung ciwidey'], v: 'assets/bandung Ciwidey kebun teh.jpg'},
    {k: ['hotel paradise','paradise'], v: 'assets/hotel paradise.jpg'}
  ];

  let chosen = img || '';
  if (!chosen && name) {
    const lname = name.toLowerCase();
    for (const m of assetMap) {
      if (m.k.some(kw => lname.includes(kw))) { chosen = m.v; break; }
    }
  }
  if (!chosen) chosen = fallback;
  if (imgEl) imgEl.src = chosen;
  // fallback: try find an image on page (best-effort) only if still missing
  if ((!img || img==='') && imgEl && (!imgEl.src || imgEl.src.endsWith('destinasi.jpg'))) {
    const allImages = Array.from(document.querySelectorAll('img'));
    const candidate = allImages.find(i => i.width > 100 && i.src && !i.src.includes('logo'));
    if (candidate) imgEl.src = candidate.src;
  }

  // generate QR image from booking code if absent
  const qrData = booking || name || 'arbain-default';
  if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;

  // download button: download QR as image
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = qrImg.src;
      link.download = `${(booking || 'eticket').replace(/\s+/g,'_')}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    // removed print functionality per UI update
    printBtn.remove();
  }
});
