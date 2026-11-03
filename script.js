/**
 * Birla Dharamshala, Ayodhya - Interactive Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNavbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Modals
  const reservationModal = document.getElementById('reservationModal');
  const btnOpenReservation = document.getElementById('btnOpenReservation');
  const closeReservationModal = document.getElementById('closeReservationModal');
  const termsModal = document.getElementById('termsModal');
  const closeTermsModal = document.getElementById('closeTermsModal');
  const privacyModal = document.getElementById('privacyModal');
  const closePrivacyModal = document.getElementById('closePrivacyModal');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  
  // Forms
  const quickBookingForm = document.getElementById('quickBookingForm');
  const mainReservationForm = document.getElementById('mainReservationForm');
  const modalReservationForm = document.getElementById('modalReservationForm');

  // Contact number
  const WHATSAPP_NUMBER = '919084655031';

  // 1. Set Default Check-in and Check-out dates (Today & Tomorrow)
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => date.toISOString().split('T')[0];
  const todayStr = formatDate(today);
  const tomorrowStr = formatDate(tomorrow);

  const dateInputs = [
    { in: 'quickCheckIn', out: 'quickCheckOut' },
    { in: 'yatriCheckIn', out: 'yatriCheckOut' },
    { in: 'modalCheckIn', out: 'modalCheckOut' }
  ];

  dateInputs.forEach(pair => {
    const inEl = document.getElementById(pair.in);
    const outEl = document.getElementById(pair.out);
    if (inEl && outEl) {
      inEl.min = todayStr;
      inEl.value = todayStr;
      outEl.min = todayStr;
      outEl.value = tomorrowStr;

      inEl.addEventListener('change', () => {
        if (inEl.value >= outEl.value) {
          const nextDay = new Date(inEl.value);
          nextDay.setDate(nextDay.getDate() + 1);
          outEl.value = formatDate(nextDay);
        }
        outEl.min = inEl.value;
      });
    }
  });

  // 2. Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Hamburger Menu Toggle
  if (mobileMenuBtn && mainNavbar) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      mainNavbar.classList.toggle('mobile-active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mainNavbar.classList.remove('mobile-active');
      });
    });
  }

  // 4. Modal Helpers
  const openModal = (modal) => {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close when clicking modal backdrop
  [reservationModal, termsModal, privacyModal, lightboxModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // Reservation Modal Triggers
  if (btnOpenReservation) {
    btnOpenReservation.addEventListener('click', () => openModal(reservationModal));
  }

  const otherReservationTriggers = document.querySelectorAll('.btn-open-modal-trigger');
  otherReservationTriggers.forEach(btn => {
    btn.addEventListener('click', () => openModal(reservationModal));
  });

  if (closeReservationModal) {
    closeReservationModal.addEventListener('click', () => closeModal(reservationModal));
  }

  // Room Card "Book This Room" Buttons
  const bookRoomButtons = document.querySelectorAll('.btn-book-room, .btn-book-room-pill');
  bookRoomButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const roomName = btn.getAttribute('data-room');
      const modalRoomSelect = document.getElementById('modalRoomType');
      if (modalRoomSelect && roomName) {
        for (let i = 0; i < modalRoomSelect.options.length; i++) {
          if (modalRoomSelect.options[i].text.includes(roomName) || modalRoomSelect.options[i].value.includes(roomName)) {
            modalRoomSelect.selectedIndex = i;
            break;
          }
        }
      }
      openModal(reservationModal);
    });
  });

  // Terms & Privacy Modals
  const termsTrigger = document.getElementById('navLinkTerms');
  const footerTerms = document.getElementById('footerTermsLink');
  const privacyTrigger = document.getElementById('navLinkPrivacy');
  const footerPrivacy = document.getElementById('footerPrivacyLink');

  if (termsTrigger) termsTrigger.addEventListener('click', () => openModal(termsModal));
  if (footerTerms) footerTerms.addEventListener('click', () => openModal(termsModal));
  if (closeTermsModal) closeTermsModal.addEventListener('click', () => closeModal(termsModal));

  if (privacyTrigger) privacyTrigger.addEventListener('click', () => openModal(privacyModal));
  if (footerPrivacy) footerPrivacy.addEventListener('click', () => openModal(privacyModal));
  if (closePrivacyModal) closePrivacyModal.addEventListener('click', () => closeModal(privacyModal));

  // New Rooms & Tariff "Book Now" buttons → WhatsApp
  document.querySelectorAll('.rt-btn-book').forEach(btn => {
    btn.addEventListener('click', () => {
      const room = btn.getAttribute('data-room') || 'a Room';
      const msg = encodeURIComponent(`Jai Shri Ram! 🙏 I want to book ${room} at Birla Dharamshala, Ayodhya. Please confirm availability.`);
      window.open(`https://wa.me/919084655031?text=${msg}`, '_blank');
    });
  });

  // FAQ Accordion Toggle
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close other items
        document.querySelectorAll('.faq-item').forEach(other => {
          other.classList.remove('active');
          const arrow = other.querySelector('.faq-arrow');
          if (arrow) {
            arrow.classList.remove('fa-chevron-up');
            arrow.classList.add('fa-chevron-down');
          }
        });
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          const arrow = item.querySelector('.faq-arrow');
          if (arrow) {
            arrow.classList.remove('fa-chevron-down');
            arrow.classList.add('fa-chevron-up');
          }
        }
      });
    }
  });

  // 5. Gallery Lightbox
  window.openLightbox = (src, caption) => {
    if (lightboxModal && lightboxImage) {
      lightboxImage.src = src;
      lightboxCaption.textContent = caption || '';
      openModal(lightboxModal);
    }
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => closeModal(lightboxModal));
  }

  // 6. Quick Booking Bar Submission
  if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const checkIn = document.getElementById('quickCheckIn').value;
      const checkOut = document.getElementById('quickCheckOut').value;
      const roomType = document.getElementById('quickRoomType').value;
      const guests = document.getElementById('quickGuests').value;

      // Sync into reservation modal
      const modalCheckIn = document.getElementById('modalCheckIn');
      const modalCheckOut = document.getElementById('modalCheckOut');
      const modalRoom = document.getElementById('modalRoomType');
      const modalGuests = document.getElementById('modalGuests');

      if (modalCheckIn) modalCheckIn.value = checkIn;
      if (modalCheckOut) modalCheckOut.value = checkOut;
      if (modalGuests) modalGuests.value = guests;
      if (modalRoom) {
        for (let i = 0; i < modalRoom.options.length; i++) {
          if (modalRoom.options[i].value.includes(roomType)) {
            modalRoom.selectedIndex = i;
            break;
          }
        }
      }

      // Direct WhatsApp dispatch matching the "Book on WhatsApp" button
      const msg = encodeURIComponent(`Jai Shri Ram! 🙏 I want to check availability & book at Birla Dharamshala, Ayodhya:
📅 Check-in: ${checkIn}
📅 Check-out: ${checkOut}
🛏️ Room Type: ${roomType}
👥 Guests: ${guests}
Please confirm.`);
      window.open(`https://wa.me/919084655031?text=${msg}`, '_blank');
    });
  }

  // 7. Main Reservation Form Dispatch to WhatsApp
  if (mainReservationForm) {
    mainReservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('yatriName').value.trim();
      const phone = document.getElementById('yatriPhone').value.trim();
      const checkIn = document.getElementById('yatriCheckIn').value;
      const checkOut = document.getElementById('yatriCheckOut').value;
      const room = document.getElementById('yatriRoomSelect').value;
      const guests = document.getElementById('yatriGuests').value;
      const remarks = document.getElementById('yatriRemarks').value.trim();

      const message = `*JAI SHRI RAM! Room Booking Request*\n\n` +
        `🏨 *Dharamshala:* Birla Dharamshala, Ayodhya\n` +
        `👤 *Name:* ${name}\n` +
        `📱 *Phone:* ${phone}\n` +
        `📅 *Check-In:* ${checkIn}\n` +
        `📅 *Check-Out:* ${checkOut}\n` +
        `🛏️ *Room Type:* ${room}\n` +
        `👥 *Guests:* ${guests}\n` +
        (remarks ? `📝 *Special Note:* ${remarks}\n` : '') +
        `\n_Please confirm room availability and tariff details._`;

      const encodedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(encodedUrl, '_blank');
    });
  }

  // 8. Modal Reservation Form Dispatch to WhatsApp
  if (modalReservationForm) {
    modalReservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalGuestName').value.trim();
      const phone = document.getElementById('modalGuestPhone').value.trim();
      const checkIn = document.getElementById('modalCheckIn').value;
      const checkOut = document.getElementById('modalCheckOut').value;
      const room = document.getElementById('modalRoomType').value;
      const guests = document.getElementById('modalGuests').value;
      const remarks = document.getElementById('modalSpecial').value.trim();

      const message = `*JAI SHRI RAM! Room Booking Request*\n\n` +
        `🏨 *Dharamshala:* Birla Dharamshala, Ayodhya\n` +
        `👤 *Name:* ${name}\n` +
        `📱 *Phone:* ${phone}\n` +
        `📅 *Check-In:* ${checkIn}\n` +
        `📅 *Check-Out:* ${checkOut}\n` +
        `🛏️ *Room Type:* ${room}\n` +
        `👥 *Guests:* ${guests}\n` +
        (remarks ? `📝 *Special Note:* ${remarks}\n` : '') +
        `\n_Please confirm room availability and tariff details._`;

      const encodedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      closeModal(reservationModal);
      window.open(encodedUrl, '_blank');
    });
  }

  // 9. Feedback Devotee Carousel & Continuous Auto-Scroll Engine
  const feedbackTrackContainer = document.getElementById('feedbackTrackContainer');
  const feedbackTrack = document.getElementById('feedbackTrack');
  const feedbackPrevBtn = document.getElementById('feedbackPrevBtn');
  const feedbackNextBtn = document.getElementById('feedbackNextBtn');
  const feedbackCounter = document.getElementById('feedbackCounter');

  if (feedbackTrackContainer && feedbackTrack) {
    const cardWidth = 351; // 325px card + 26px gap
    const totalOriginalCards = 5;
    let scrollPos = 0;
    let isPaused = false;
    let isDown = false;
    let startX = 0;
    let scrollLeftStart = 0;
    let resumeTimeout = null;
    let lastTime = 0;
    const scrollSpeed = 0.85; // smooth reading speed (~50px per second)

    const pauseTemporarily = (duration = 3000) => {
      isPaused = true;
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        if (!isDown) isPaused = false;
      }, duration);
    };

    const updateCounter = () => {
      const currentScroll = feedbackTrackContainer.scrollLeft;
      const index = (Math.round(currentScroll / cardWidth) % totalOriginalCards) + 1;
      if (feedbackCounter) {
        feedbackCounter.textContent = index < 10 ? `0${index}` : index;
      }
    };

    // Continuous marquee auto-scroll loop via requestAnimationFrame
    const autoScrollLoop = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPaused && !isDown) {
        const halfWidth = feedbackTrack.scrollWidth / 2;
        if (halfWidth > 0) {
          scrollPos += scrollSpeed * (deltaTime / 16.67);
          if (scrollPos >= halfWidth) {
            scrollPos -= halfWidth;
          }
          feedbackTrackContainer.scrollLeft = scrollPos;
          updateCounter();
        }
      } else {
        // Sync scrollPos with wherever the user manually scrolled or dragged
        scrollPos = feedbackTrackContainer.scrollLeft;
      }

      requestAnimationFrame(autoScrollLoop);
    };
    requestAnimationFrame(autoScrollLoop);

    // Pause on Hover so devotees and visitors can read comfortably
    feedbackTrackContainer.addEventListener('mouseenter', () => { isPaused = true; });
    feedbackTrackContainer.addEventListener('mouseleave', () => {
      if (!isDown) isPaused = false;
    });

    // Touch support (mobile pause on touch, resume on touchend)
    feedbackTrackContainer.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
    feedbackTrackContainer.addEventListener('touchend', () => { pauseTemporarily(2000); }, { passive: true });

    // Mouse Wheel Horizontal Scrolling
    feedbackTrackContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      isPaused = true;
      const halfWidth = feedbackTrack.scrollWidth / 2;
      scrollPos += e.deltaY;
      if (halfWidth > 0) {
        if (scrollPos >= halfWidth) scrollPos -= halfWidth;
        if (scrollPos < 0) scrollPos += halfWidth;
      }
      feedbackTrackContainer.scrollLeft = scrollPos;
      updateCounter();
      pauseTemporarily(2500);
    }, { passive: false });

    // Prev & Next Buttons
    if (feedbackPrevBtn) {
      feedbackPrevBtn.addEventListener('click', () => {
        isPaused = true;
        const halfWidth = feedbackTrack.scrollWidth / 2;
        scrollPos -= cardWidth;
        if (scrollPos < 0 && halfWidth > 0) scrollPos += halfWidth;
        feedbackTrackContainer.scrollTo({ left: scrollPos, behavior: 'smooth' });
        updateCounter();
        pauseTemporarily(3500);
      });
    }

    if (feedbackNextBtn) {
      feedbackNextBtn.addEventListener('click', () => {
        isPaused = true;
        const halfWidth = feedbackTrack.scrollWidth / 2;
        scrollPos += cardWidth;
        if (halfWidth > 0 && scrollPos >= halfWidth) scrollPos -= halfWidth;
        feedbackTrackContainer.scrollTo({ left: scrollPos, behavior: 'smooth' });
        updateCounter();
        pauseTemporarily(3500);
      });
    }

    // Drag to scroll
    feedbackTrackContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      isPaused = true;
      startX = e.pageX - feedbackTrackContainer.offsetLeft;
      scrollLeftStart = feedbackTrackContainer.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        pauseTemporarily(2000);
      }
    });

    feedbackTrackContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - feedbackTrackContainer.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollPos = scrollLeftStart - walk;
      const halfWidth = feedbackTrack.scrollWidth / 2;
      if (halfWidth > 0) {
        if (scrollPos >= halfWidth) scrollPos -= halfWidth;
        if (scrollPos < 0) scrollPos += halfWidth;
      }
      feedbackTrackContainer.scrollLeft = scrollPos;
      updateCounter();
    });
  }

  // 10. Gallery Strip Drag to Scroll
  const galleryStripContainer = document.querySelector('.gallery-strip-container');
  if (galleryStripContainer) {
    let isGalDown = false;
    let galStartX;
    let galScrollLeft;

    galleryStripContainer.addEventListener('mousedown', (e) => {
      isGalDown = true;
      galStartX = e.pageX - galleryStripContainer.offsetLeft;
      galScrollLeft = galleryStripContainer.scrollLeft;
    });
    galleryStripContainer.addEventListener('mouseleave', () => { isGalDown = false; });
    galleryStripContainer.addEventListener('mouseup', () => { isGalDown = false; });
    galleryStripContainer.addEventListener('mousemove', (e) => {
      if (!isGalDown) return;
      e.preventDefault();
      const x = e.pageX - galleryStripContainer.offsetLeft;
      const walk = (x - galStartX) * 1.5;
      galleryStripContainer.scrollLeft = galScrollLeft - walk;
    });
  }

  // Active Nav Link Spy on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-links a[href*='${sectionId}']`);

      if (targetLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        targetLink.classList.add('active');
      }
    });
  });
});
