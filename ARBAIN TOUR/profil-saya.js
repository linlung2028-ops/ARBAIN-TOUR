const profileForm = document.getElementById('profileForm');
const saveProfileButton = document.getElementById('saveProfile');
const navItems = document.querySelectorAll('.nav-item');
const contentPanels = document.querySelectorAll('.content-panel');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');

const sectionTitles = {
  profile: {
    title: 'Profil Saya',
    subtitle: 'Kelola informasi pribadi dan data akun Anda.',
  },
  pemesanan: {
    title: 'Pemesanan Saya',
    subtitle: 'Daftar lengkap tiket dan reservasi perjalanan Anda.',
  },
  wishlist: {
    title: 'Wishlist Saya',
    subtitle: 'Destinasi impian yang ingin Anda kunjungi di Bandung.',
  },
  ulasan: {
    title: 'Ulasan Saya',
    subtitle: 'Ulasan yang telah Anda tulis untuk destinasi yang pernah dikunjungi.',
  },
  pengaturan: {
    title: 'Pengaturan Akun',
    subtitle: 'Kelola keamanan, notifikasi, dan preferensi akun Anda.',
  },
};

if (saveProfileButton && profileForm) {
  saveProfileButton.addEventListener('click', () => {
    const formData = new FormData(profileForm);
    const values = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      birthDate: formData.get('birthDate'),
      gender: formData.get('gender'),
    };

    console.log('Profil disimpan:', values);
    alert('Perubahan profil berhasil disimpan.');
  });
}

const orderTabs = document.querySelectorAll('.order-tabs .tab');
const orderRows = document.querySelectorAll('.order-table tbody tr');
const backHomeButton = document.getElementById('backHome');
const logoutButton = document.getElementById('logoutBtn');

navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const section = item.dataset.section;

    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');

    contentPanels.forEach(panel => panel.classList.remove('active'));
    const activePanel = document.getElementById(`section-${section}`);
    if (activePanel) {
      activePanel.classList.add('active');
    }

    if (pageTitle && pageSubtitle && sectionTitles[section]) {
      pageTitle.textContent = sectionTitles[section].title;
      pageSubtitle.textContent = sectionTitles[section].subtitle;
    }
  });
});

orderTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    orderTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    orderRows.forEach(row => {
      if (filter === 'all') {
        row.style.display = '';
      } else {
        row.style.display = row.dataset.status === filter ? '' : 'none';
      }
    });
  });
});

const reviewEditButtons = document.querySelectorAll('.btn-text');
reviewEditButtons.forEach(button => {
  button.addEventListener('click', () => {
    const reviewCard = button.closest('.review-card');
    const reviewText = reviewCard.querySelector('.review-text');
    const updatedText = prompt('Ubah ulasan Anda:', reviewText.textContent);

    if (updatedText !== null) {
      reviewText.textContent = updatedText.trim() || reviewText.textContent;
      alert('Ulasan berhasil diperbarui.');
    }
  });
});

if (backHomeButton) {
  backHomeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    window.location.href = 'tampilan-login.html';
  });
}
