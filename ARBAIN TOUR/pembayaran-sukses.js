document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('viewETicket');
  const openEticketBtn = document.getElementById('openEticket');
  const confirmBack = document.getElementById('confirmBack');
  const qrImg = document.getElementById('suc-qr');
  const thumbImg = document.getElementById('suc-thumb');
  // populate page from query params when present
  const params = new URLSearchParams(window.location.search);
  const qBooking = params.get('booking');
  const qName = params.get('name');
  const qDate = params.get('date');
  const qImg = params.get('img');
  const qPax = params.get('pax') || params.get('people') || '';
  const qPlace = params.get('place') || params.get('location') || '';
  const qRating = params.get('rating') || '';
  const qReviews = params.get('reviews') || '';
  const qDateAlt = params.get('date') || params.get('date_raw') || '';
  if (qBooking) {
    const bookingEl = document.querySelector('.booking-code');
    if (bookingEl) bookingEl.textContent = qBooking;
    const bookingStrong = document.querySelector('.booking-code');
    if (bookingStrong) bookingStrong.textContent = qBooking;
  }
  if (qName) {
    const prodTitleEl = document.querySelector('.td-title');
    if (prodTitleEl) prodTitleEl.textContent = qName;
  }
  if (qDate) {
    const dateEl = document.querySelector('.td-meta');
    if (dateEl) dateEl.textContent = qDate;
    const qrTime = document.querySelector('.qr-time');
    if (qrTime) qrTime.textContent = qDate;
  }
  // additional meta fields
  if (qPax) {
    const paxEl = document.getElementById('suc-pax'); if (paxEl) paxEl.textContent = qPax;
  }
  if (qPlace) {
    const placeEl = document.getElementById('suc-place'); if (placeEl) placeEl.textContent = qPlace;
  }
  if (qRating) {
    const stars = document.getElementById('suc-stars'); if (stars) stars.textContent = qRating;
  }
  if (qReviews) {
    const rev = document.getElementById('suc-reviews'); if (rev) rev.textContent = qReviews;
  }
  if (qImg) {
    if (thumbImg) thumbImg.src = qImg;
    // set eticket QR alt mapping preview if qrImg supports background
    if (qrImg && qrImg.tagName === 'IMG') {
      // leave QR as generated; but ensure image thumbnail also set
    }
  }
  // description param
  const qDesc = params.get('desc');
  if (qDesc) {
    const descEl = document.getElementById('suc-desc');
    if (descEl) descEl.textContent = qDesc;
  }
  // Wire open e-ticket small button
  if (openEticketBtn) {
    openEticketBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const bookingEl = document.querySelector('.booking-code');
      const bookingCode = bookingEl ? bookingEl.textContent.trim() : '';
      const prodTitleEl = document.querySelector('.td-title');
      const productName = prodTitleEl ? prodTitleEl.textContent.trim() : '';
      const dateEl = document.querySelector('.td-meta');
      const dateText = dateEl ? dateEl.textContent.trim() : '';
      const img = thumbImg ? thumbImg.src : qImg || '';
      const desc = (document.getElementById('suc-desc') || {}).textContent || qDesc || '';
      const url = new URL(window.location.href);
      const target = new URL('e-ticket.html', url.origin);
      if (bookingCode) target.searchParams.set('booking', bookingCode);
      if (productName) target.searchParams.set('name', productName);
      if (dateText) target.searchParams.set('date', dateText);
      if (img) target.searchParams.set('img', img);
      if (desc) target.searchParams.set('desc', desc);
      window.location.href = target.toString();
    });
  }

  // Back button
  if (confirmBack) {
    confirmBack.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'index.html';
    });
  }
});
