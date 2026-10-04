"use client";

import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import styles from './AccommodationsSection.module.css';
import CardImageSlider from './CardImageSlider';
import ImageSliderModal from './ImageSliderModal';

function formatStarRating(rating) {
  if (!rating) return '';
  const str = String(rating).trim();
  if (/^\d+(\.\d+)?$/.test(str)) {
    return `${str} Star`;
  }
  return str;
}

function PrevArrow({ onClick }) {
  return (
    <button
      type="button"
      className={`${styles.navArrow} ${styles.prevArrow}`}
      onClick={onClick}
      aria-label="Previous Hotel"
    >
      <FiChevronLeft />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      type="button"
      className={`${styles.navArrow} ${styles.nextArrow}`}
      onClick={onClick}
      aria-label="Next Hotel"
    >
      <FiChevronRight />
    </button>
  );
}

function AccommodationCard({ hotel, onOpenGallery }) {
  const images = (Array.isArray(hotel.images) && hotel.images.length > 0)
    ? hotel.images
    : (Array.isArray(hotel.photos) && hotel.photos.length > 0)
    ? hotel.photos
    : [hotel.image || '/jaganath-banner.webp'];

  return (
    <div className={styles.card}>
      <CardImageSlider
        images={images}
        alt={hotel.name}
        onImageClick={(index) => onOpenGallery(hotel, index)}
      >
        {hotel.star_rating && (
          <span className={styles.starBadge}>
            <FaStar className={styles.starIcon} />
            <span>{formatStarRating(hotel.star_rating)}</span>
          </span>
        )}

        <div className={styles.cardOverlay}>
          <h3 className={styles.cardTitle}>{hotel.name}</h3>
          {hotel.location && <p className={styles.cardLocation}>{hotel.location}</p>}
          <span
            className={styles.viewPhotosBtn}
            onClick={(e) => {
              e.stopPropagation();
              onOpenGallery(hotel, 0);
            }}
          >
            View Photos
            <svg className={styles.arrowIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </div>
      </CardImageSlider>
    </div>
  );
}

export default function AccommodationsSectionClient({ accommodationsData = [] }) {
  const [galleryModal, setGalleryModal] = useState({
    isOpen: false,
    images: [],
    initialIndex: 0,
    title: '',
    subtitle: ''
  });

  // Track the actual viewport width so we can deterministically decide how
  // many cards to show per view. This avoids react-slick's responsive
  // breakpoint quirks and guarantees a single card per view on mobile.
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleOpenGallery = (hotel, initialIndex = 0) => {
    const images = (Array.isArray(hotel.images) && hotel.images.length > 0)
      ? hotel.images
      : (Array.isArray(hotel.photos) && hotel.photos.length > 0)
      ? hotel.photos
      : [hotel.image || '/jaganath-banner.webp'];

    setGalleryModal({
      isOpen: true,
      images,
      initialIndex,
      title: hotel.name || 'Accommodation',
      subtitle: hotel.location || 'Odisha'
    });
  };

  const handleCloseGallery = () => {
    setGalleryModal((prev) => ({ ...prev, isOpen: false }));
  };

  if (!accommodationsData || accommodationsData.length === 0) {
    return null;
  }

  const total = accommodationsData.length;

  // Decide how many slides to show based on the real viewport width.
  // Defaults to desktop (4) until the client has measured the window.
  const width = windowWidth ?? 1440;

  let slidesPerView = 4;
  if (width < 768) {
    slidesPerView = 1; // phones & large phones — one card per view
  } else if (width < 992) {
    slidesPerView = 2; // tablets
  } else if (width < 1200) {
    slidesPerView = 3; // small desktops
  }

  // Never show more slides than there are items.
  slidesPerView = Math.max(1, Math.min(slidesPerView, total));

  const isMobileView = slidesPerView === 1;

  const sliderSettings = {
    dots: true,
    arrows: !isMobileView,
    infinite: total > slidesPerView,
    speed: 600,
    slidesToShow: slidesPerView,
    slidesToScroll: 1,
    autoplay: total > slidesPerView,
    autoplaySpeed: 3800,
    pauseOnHover: true,
    swipeToSlide: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      <div className={styles.sliderWrapper}>
        <Slider {...sliderSettings}>
          {accommodationsData.map((hotel, index) => (
            <div key={hotel.id || index} className={styles.slideItem}>
              <AccommodationCard
                hotel={hotel}
                onOpenGallery={handleOpenGallery}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Fullscreen Image Slider Modal on click */}
      <ImageSliderModal
        isOpen={galleryModal.isOpen}
        images={galleryModal.images}
        initialIndex={galleryModal.initialIndex}
        title={galleryModal.title}
        subtitle={galleryModal.subtitle}
        onClose={handleCloseGallery}
      />
    </>
  );
}
