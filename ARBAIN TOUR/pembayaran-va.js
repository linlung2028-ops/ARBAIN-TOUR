// Simple countdown and navigation for pembayaran-va page
document.addEventListener('DOMContentLoaded',()=>{
  // set amount (formatted) and total
  const amountEl=document.getElementById('vaAmount');
  const totalEl=document.getElementById('vaTotal');
  // read from query params
  const params = new URLSearchParams(window.location.search);
  const productName = params.get('name') || '';
  const priceParam = parseInt(params.get('price') || '199499', 10);
  const amount = isNaN(priceParam) ? 199499 : priceParam;
  amountEl.textContent = amount.toLocaleString('id-ID');
  totalEl.textContent = amount.toLocaleString('id-ID');

  // update product name if present
  if(productName){
    const summaryTitle = document.querySelector('.va-left .va-row .label');
    // don't override label; instead set page title if exists
    const prodTitleEl = document.querySelector('.va-top h2');
    if(prodTitleEl) prodTitleEl.textContent = 'Selesaikan Pembayaran — ' + productName;
  }

  // countdown: default 2 hours from now
  const end = Date.now() + 2*60*60*1000;
  const hrsEl = document.getElementById('cd-hours');
  const minEl = document.getElementById('cd-min');
  const secEl = document.getElementById('cd-sec');

  function update(){
    const now = Date.now();
    let diff = Math.max(0, Math.floor((end - now)/1000));
    const h = String(Math.floor(diff/3600)).padStart(2,'0');
    diff %= 3600;
    const m = String(Math.floor(diff/60)).padStart(2,'0');
    const s = String(diff%60).padStart(2,'0');
    hrsEl.textContent = h; minEl.textContent = m; secEl.textContent = s;
    if(end - now <= 0){ clearInterval(timer); }
  }
  update();
  const timer = setInterval(update,1000);

  document.getElementById('confirmTransfer').addEventListener('click',()=>{
    // in real app, would verify; here simulate success page
    // forward relevant params (name, price, date, img) and generate booking code
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('name') || '';
    const price = params.get('price') || '';
    const date = params.get('date') || '';
    const img = params.get('img') || '';
    // generate simple booking code
    const rand = Math.floor(Math.random() * 9000) + 1000;
    const year = new Date().getFullYear();
    const bookingCode = `ARB-${year}-KP-${rand}`;
    const target = new URL('pembayaran-sukses.html', window.location.href);
    if (productName) target.searchParams.set('name', productName);
    if (price) target.searchParams.set('price', price);
    if (date) target.searchParams.set('date', date);
    if (img) target.searchParams.set('img', img);
    target.searchParams.set('booking', bookingCode);
    window.location.href = target.toString();
  });
});
