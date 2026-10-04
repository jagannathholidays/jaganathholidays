"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './LovedDestinations.module.css';

function PrevArrow({ onClick }) {
  return (
    <button
      type="button"
      className={`${styles.navArrow} ${styles.prevArrow}`}
      onClick={onClick}
      aria-label="Previous destination"
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
      aria-label="Next destination"
    >
      <FiChevronRight />
    </button>
  );
}

function resolveDestinationImage(dest, index) {
  if (dest.featured_image) {
    if (typeof dest.featured_image === 'string') {
      if (dest.featured_image.startsWith('http') || dest.featured_image.startsWith('/')) {
        return dest.featured_image;
      }
      return `${process.env.NEXT_PUBLIC_CMS_MEDIA_URL || 'https://cdn.one9ty.com/one9ty-travel'}/${dest.featured_image.replace(/^\/+/, '')}`;
    }
    if (dest.featured_image.file_path) {
      return `${process.env.NEXT_PUBLIC_CMS_MEDIA_URL || 'https://cdn.one9ty.com/one9ty-travel'}/${dest.featured_image.file_path.replace(/^\/+/, '')}`;
    }
    if (dest.featured_image.url) {
      return dest.featured_image.url;
    }
  }
  if (dest.image) return dest.image;
  return `/loved-destination-${(index % 4) + 1}.${index % 4 === 3 ? 'jpg' : 'png'}`;
}

export default function LovedDestinationsSlider({ destinations = [] }) {
  // Track the real viewport width so we can deterministically decide how many
  // cards to show per view. This guarantees a single card per view on mobile
  // without relying on react-slick's responsive breakpoint quirks.
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (!destinations || destinations.length === 0) {
    return null;
  }

  const total = destinations.length;

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
    dots: false,
    arrows: !isMobileView,
    infinite: total > slidesPerView,
    speed: 600,
    slidesToShow: slidesPerView,
    slidesToScroll: 1,
    autoplay: total > slidesPerView,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    swipeToSlide: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className={styles.sliderWrapper}>
      <Slider {...sliderSettings}>
        {destinations.map((dest, index) => {
          const name = dest.name || 'Destination';
          const slug = dest.slug || name.toLowerCase().replace(/\s+/g, '-');
          const imageUrl = resolveDestinationImage(dest, index);
          const fallbackImage = `/loved-destination-${(index % 4) + 1}.${index % 4 === 3 ? 'jpg' : 'png'}`;

          return (
            <div key={dest.id || dest.slug || index} className={styles.slideItem}>
              <Link href={`/destination/${slug}`} className={`${styles.card} shineEffect`}>
                <div className={styles.cardImageWrapper}>
                  <img
                    src={imageUrl}
                    alt={name}
                    className={styles.cardImage}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                </div>
                <div className={styles.cardOverlay}>
                 
                  <h3 className={styles.cardTitle}>{name}</h3>
                  <span className={styles.bookNow}>
                    <span>View Packages</span>
                    <FiArrowRight className={styles.arrowIcon} />
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
