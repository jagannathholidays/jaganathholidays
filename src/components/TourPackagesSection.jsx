import Link from 'next/link';
import {
  FiClock,
  FiMapPin,
  FiStar,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiPhone,
  FiMail,
  FiEye,
  FiFilter
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './TourPackagesSection.module.css';
import EnquiryTriggerBtn from './EnquiryTriggerBtn';
import AnimatedButton from './AnimatedButton';

const packagesData = [
  {
    id: 1,
    title: 'Puri Gangasagar Tour Packages',
    description: 'Planning a trip to Jagannath Puri and Gangasagar Kolkata the most important religious tourist destinations with luxury accommodation. Book Puri Gangasagar tour with temple visits and holy dip.',
    duration: '05 Nights 06 Days',
    location: 'Kolkata',
    reviewsCount: 150,
    price: '₹ 14,500',
    rating: '4.8',
    category: 'Devotional',
    image: 'https://picsum.photos/600/400?random=101',
    tags: ['Puri Jagannath Tour', 'Gangasagar Holy Dip'],
    slug: 'puri-gangasagar-tour-packages'
  },
  {
    id: 2,
    title: 'Golden Triangle Tour of Odisha',
    description: 'Explore the three most picturesque and celebrated cities of Odisha: Bhubaneswar, Puri, and Konark. Witness historical temples, pristine beaches, and architectural wonders.',
    duration: '02 Nights 03 Days',
    location: 'Puri - Konark - Bhubaneswar',
    reviewsCount: 120,
    price: '₹ 4,999',
    rating: '4.8',
    category: 'Heritage',
    image: 'https://picsum.photos/600/400?random=102',
    tags: ['Golden Triangle', 'Jagannath Temple', 'Sun Temple'],
    slug: 'golden-triangle-tour-of-odisha'
  },
  {
    id: 3,
    title: 'Odisha Adventure Tour Packages',
    description: 'An ultimate thriller package through wildlife sanctuaries, waterfalls, and scenic gorges of Similipal and Satkosia. Perfect for adventure and nature lovers.',
    duration: '08 Nights 10 Days',
    location: 'Similipal - Satkosia',
    reviewsCount: 95,
    price: '₹ 14,499',
    rating: '4.9',
    category: 'Adventure',
    image: 'https://picsum.photos/600/400?random=103',
    tags: ['Wildlife Safari', 'Jungle Camping', 'Trekking'],
    slug: 'odisha-adventure-tour-packages'
  },
  {
    id: 4,
    title: 'Authentic Tribal Tour Packages',
    description: 'A unique opportunity to connect with local tribal communities and experience their heritage, weekly markets, and traditional art forms in Koraput & Rayagada.',
    duration: '05 Nights 06 Days',
    location: 'Koraput & Rayagada',
    reviewsCount: 80,
    price: '₹ 7,999',
    rating: '4.8',
    category: 'Cultural',
    image: 'https://picsum.photos/600/400?random=104',
    tags: ['Tribal Villages', 'Weekly Haat', 'Heritage Tour'],
    slug: 'authentic-tribal-tour-packages'
  },
  {
    id: 5,
    title: 'Romantic Odisha Honeymoon Tour',
    description: 'Celebrate love along the pristine beaches of Gopalpur and scenic valleys of Daringbadi, often called the Kashmir of Odisha. Enjoy cozy luxury cottages and romantic candle-light dinners.',
    duration: '04 Nights 05 Days',
    location: 'Gopalpur - Daringbadi',
    reviewsCount: 110,
    price: '₹ 9,999',
    rating: '5.0',
    category: 'Honeymoon',
    image: 'https://picsum.photos/600/400?random=105',
    tags: ['Beach Sunset', 'Hill Station', 'Luxury Stay'],
    slug: 'romantic-odisha-honeymoon-tour'
  },
  {
    id: 6,
    title: 'Chilika Lake & Island Exploration',
    description: 'Experience Asia\'s largest brackish water lagoon, spot Irrawaddy dolphins, and view thousands of migratory birds at Mangalajodi bird sanctuary.',
    duration: '02 Nights 03 Days',
    location: 'Chilika - Mangalajodi',
    reviewsCount: 75,
    price: '₹ 5,499',
    rating: '4.8',
    category: 'Nature',
    image: 'https://picsum.photos/600/400?random=106',
    tags: ['Dolphin Spotting', 'Bird Watching', 'Boating'],
    slug: 'chilika-lake-island-exploration'
  },
  {
    id: 7,
    title: 'Heritage & Crafts Tour of Raghurajpur',
    description: 'Discover traditional Patachitra painters, wood crafts, and Gotipua/Odissi dance recitals at the Raghurajpur heritage crafts village near Puri.',
    duration: '01 Night 02 Days',
    location: 'Raghurajpur Heritage Village',
    reviewsCount: 60,
    price: '₹ 3,999',
    rating: '4.9',
    category: 'Cultural',
    image: 'https://picsum.photos/600/400?random=107',
    tags: ['Heritage Art', 'Dance Workshop', 'Craft Shopping'],
    slug: 'heritage-crafts-tour-raghurajpur'
  },
  {
    id: 8,
    title: 'Satkosia Gorge Eco-Camping Tour',
    description: 'Camp in luxury tents next to the Mahanadi river gorge, enjoy eco-tours, boat cruises, and campfire nights in Satkosia Tiger Reserve.',
    duration: '03 Nights 04 Days',
    location: 'Satkosia Gorge Reserve',
    reviewsCount: 45,
    price: '₹ 12,999',
    rating: '4.9',
    category: 'Adventure',
    image: 'https://picsum.photos/600/400?random=108',
    tags: ['River Cruise', 'Eco Tents', 'Wildlife Reserve'],
    slug: 'satkosia-gorge-eco-camping-tour'
  },
  {
    id: 9,
    title: 'Puri Lord Jagannath Darshan Special',
    description: 'A special devotional tour designed for seniors and families seeking divine blessings, with VIP darshan arrangements, mahaprasad seba, and pandas guidance.',
    duration: '03 Nights 04 Days',
    location: 'Puri Jagannath Temple',
    reviewsCount: 210,
    price: '₹ 6,999',
    rating: '4.7',
    category: 'Devotional',
    image: 'https://picsum.photos/600/400?random=109',
    tags: ['VIP Darshan', 'Mahaprasad Seba', 'Temple Tour'],
    slug: 'puri-lord-jagannath-darshan-special'
  },
  {
    id: 10,
    title: 'Daringbadi Eco Retreat Packages',
    description: 'Escape the heat and retreat to Daringbadi\'s coffee gardens, pine forests, and silent valleys. Experience unique tribal lifestyle and rich scenic beauty.',
    duration: '03 Nights 04 Days',
    location: 'Daringbadi Hill Station',
    reviewsCount: 85,
    price: '₹ 8,499',
    rating: '4.7',
    category: 'Nature',
    image: 'https://picsum.photos/600/400?random=110',
    tags: ['Coffee Gardens', 'Pine Forests', 'Waterfalls'],
    slug: 'daringbadi-eco-retreat-packages'
  }
];

async function fetchPackages(categorySlug, destinationSlug, page = 1, perPage = 15) {
  try {
    const payload = {
      content_type_id: 'packages',
      status: 'published',
      per_page: perPage,
      sort_by: "data.sort_order",
      sort_order: "asc"

    };

    const taxonomyTerms = {};
    if (categorySlug && categorySlug !== 'all') {
      taxonomyTerms.category = [categorySlug];
    }
    if (destinationSlug && destinationSlug !== 'all') {
      taxonomyTerms.destinations = [destinationSlug];
    }

    if (Object.keys(taxonomyTerms).length > 0) {
      payload.taxonomy_terms = taxonomyTerms;
    }

    const res = await fetch(`${process.env.CMS_API_URL}/api/v1/delivery/contents?page=${page}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CMS_TOKEN}`
      },
      body: JSON.stringify(payload),
      next: { revalidate: 0 } // Revalidate every 30s (testing mode)
    });
    const result = await res.json();
    if (result.success && result.data && result.data.data) {
      const items = result.data.data.map((item, index) => {
        let desc = '';
        if (item.data.description) {
          desc = item.data.description.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
          desc = desc.replace(/^Introduction\s*/i, '');
          desc = desc.substring(0, 150) + '...';
        }
        return {
          id: item.id || index,
          title: item.title,
          description: desc,
          duration: item.data.tour_duration || 'N/A',
          location: item.data.starting_point ? `${item.data.starting_point} - ${item.data.end_point || ''}` : 'Odisha',
          reviewsCount: Math.floor(Math.random() * 50) + 50,
          price: 'On Request',
          rating: '4.8',
          category: (item.category_slug && item.category_slug[0]) ? item.category_slug[0].charAt(0).toUpperCase() + item.category_slug[0].slice(1) : 'Tour',
          image: item.data.cover_image?.file_path ? `${process.env.CMS_MEDIA_URL}/${item.data.cover_image.file_path}` : `https://picsum.photos/600/400?random=${index}`,
          tags: item.category_slug || [],
          slug: item.slug
        };
      });
      return { items, total: result.data.total || items.length };
    }
  } catch (error) {
    console.error("Error fetching packages:", error);
  }
  return { items: packagesData, total: packagesData.length };
}
async function fetchTaxonomies() {
  try {
    const res = await fetch(`${process.env.CMS_API_URL}/api/v1/delivery/taxonomies?content_type=packages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CMS_TOKEN}`
      },
      next: { revalidate: 0 } // Revalidate every 30s (testing mode)
    });
    const result = await res.json();
    if (result.success && result.data) {
      let catList = [{ name: 'All', slug: 'all' }];
      let destList = [{ name: 'All', slug: 'all' }];
      result.data.forEach(tax => {
        if (tax.slug === 'category' && tax.terms) {
          catList = [...catList, ...tax.terms.map(t => ({ name: t.name, slug: t.slug }))];
        }
        if (tax.slug === 'destinations' && tax.terms) {
          destList = [...destList, ...tax.terms.map(t => ({ name: t.name, slug: t.slug }))];
        }
      });
      return { categories: catList, destinations: destList };
    }
  } catch (error) {
    console.error("Error fetching taxonomies:", error);
  }
  return {
    categories: [{ name: 'All', slug: 'all' }],
    destinations: [{ name: 'All', slug: 'all' }]
  };
}

export default async function TourPackagesSection({
  searchParams,
  routeParams,
  pageType = 'packages', // 'packages' | 'destination' | 'category'
  basePath = '/packages',
  limit = null,
  showSidebar = true,
  showPagination = true,
  itemsPerPage = 15,
  layout = 'list' // 'list' | 'grid'
}) {
  // Resolve search and route parameters
  const resolvedParams = searchParams && typeof searchParams.then === 'function'
    ? await searchParams
    : (searchParams || {});

  const resolvedRouteParams = routeParams && typeof routeParams.then === 'function'
    ? await routeParams
    : (routeParams || {});

  const currentSlug = resolvedRouteParams.slug || '';

  // Determine active category and location filters depending on pageType
  let activeCategory = resolvedParams.category || resolvedParams.filter || '';
  let activeLocation = resolvedParams.location || '';

  if (pageType === 'category' && currentSlug) {
    activeCategory = activeCategory ? `${currentSlug},${activeCategory}` : currentSlug;
  }
  if (pageType === 'destination' && currentSlug) {
    activeLocation = activeLocation ? `${currentSlug},${activeLocation}` : currentSlug;
  }

  // Deduplicate
  activeCategory = [...new Set(activeCategory.split(',').filter(Boolean))].join(',');
  activeLocation = [...new Set(activeLocation.split(',').filter(Boolean))].join(',');

  // Calculate pagination params before API call
  const defaultItemsPerPage = layout === 'grid' ? 8 : 5;
  const actualItemsPerPage = limit
    ? Number(limit)
    : (itemsPerPage ? Number(itemsPerPage) : defaultItemsPerPage);
  const requestedPage = Math.max(Number(resolvedParams.page || 1), 1);

  const { items: activePackagesData, total: apiTotal } = await fetchPackages(activeCategory, activeLocation, requestedPage, actualItemsPerPage);
  const { categories, destinations } = await fetchTaxonomies();

  const searchQuery = resolvedParams.query || resolvedParams.search || '';

  // Calculate Dynamic Counts
  const getCategoryCount = (cat) => {
    return 0;
  };

  const getDestinationCount = (loc) => {
    return 0;
  };

  // Perform Server-Side Filtering
  let filteredPackages = [...activePackagesData];

  // if (activeCategory && activeCategory.toLowerCase() !== 'all') {
  //   filteredPackages = filteredPackages.filter(
  //     pkg => pkg.category.toLowerCase() === activeCategory.toLowerCase()
  //   );
  // }

  // if (activeLocation && activeLocation.toLowerCase() !== 'all') {
  //   filteredPackages = filteredPackages.filter(
  //     pkg => pkg.location.toLowerCase().includes(activeLocation.toLowerCase())
  //   );
  // }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredPackages = filteredPackages.filter(
      pkg => pkg.title.toLowerCase().includes(q) ||
        pkg.description.toLowerCase().includes(q) ||
        pkg.location.toLowerCase().includes(q)
    );
  }

  // Use API's total for server-side pagination
  const totalPages = Math.ceil(apiTotal / actualItemsPerPage);
  const currentPage = Math.min(requestedPage, totalPages || 1);
  const paginatedPackages = filteredPackages;

  // Check if any query parameter filter is applied
  let hasActiveFilters = false;
  if (pageType === 'category') {
    hasActiveFilters = !!(resolvedParams.location || resolvedParams.query || resolvedParams.search);
  } else if (pageType === 'destination') {
    hasActiveFilters = !!(resolvedParams.category || resolvedParams.filter || resolvedParams.query || resolvedParams.search);
  } else {
    hasActiveFilters = !!(resolvedParams.category || resolvedParams.filter || resolvedParams.location || resolvedParams.query || resolvedParams.search);
  }

  // Search form submit action url
  const searchActionUrl = pageType === 'destination'
    ? `/destination/${currentSlug}`
    : (pageType === 'category' ? `/cayegory/${currentSlug}` : '/packages');

  // Sidebar link URL builders
  const getCategoryFilterUrl = (catSlug) => {
    let currentCats = activeCategory ? activeCategory.split(',') : [];
    if (catSlug === 'all') {
      currentCats = [];
    } else {
      if (currentCats.includes(catSlug)) {
        currentCats = currentCats.filter(c => c !== catSlug);
      } else {
        currentCats.push(catSlug);
      }
    }
    const catString = currentCats.join(',');

    // Always navigate to /packages when playing with multi-select to avoid route conflicts
    const targetPath = '/packages';
    const current = new URLSearchParams();
    if (catString) current.set('category', catString);
    if (activeLocation) current.set('location', activeLocation);
    if (searchQuery) current.set('query', searchQuery);

    const qs = current.toString();
    return `${targetPath}${qs ? '?' + qs : ''}`;
  };

  const getDestinationFilterUrl = (destSlug) => {
    let currentDests = activeLocation ? activeLocation.split(',') : [];
    if (destSlug === 'all') {
      currentDests = [];
    } else {
      if (currentDests.includes(destSlug)) {
        currentDests = currentDests.filter(d => d !== destSlug);
      } else {
        currentDests.push(destSlug);
      }
    }
    const destString = currentDests.join(',');

    const targetPath = '/packages';
    const current = new URLSearchParams();
    if (activeCategory) current.set('category', activeCategory);
    if (destString) current.set('location', destString);
    if (searchQuery) current.set('query', searchQuery);

    const qs = current.toString();
    return `${targetPath}${qs ? '?' + qs : ''}`;
  };

  // URL builder for removing individual active filter tags
  const getRemoveFilterUrl = (typeToRemove, valueToRemove) => {
    let currentCats = activeCategory ? activeCategory.split(',') : [];
    let currentDests = activeLocation ? activeLocation.split(',') : [];

    if (typeToRemove === 'category' && valueToRemove) {
      currentCats = currentCats.filter(c => c !== valueToRemove);
    } else if (typeToRemove === 'category') {
      currentCats = [];
    }

    if (typeToRemove === 'location' && valueToRemove) {
      currentDests = currentDests.filter(d => d !== valueToRemove);
    } else if (typeToRemove === 'location') {
      currentDests = [];
    }

    const current = new URLSearchParams();
    if (currentCats.length) current.set('category', currentCats.join(','));
    if (currentDests.length) current.set('location', currentDests.join(','));
    if (typeToRemove !== 'query' && searchQuery) current.set('query', searchQuery);

    return `/packages?${current.toString()}`;
  };

  const getClearAllFiltersUrl = () => {
    if (pageType === 'destination') return `/destination/${currentSlug}`;
    if (pageType === 'category') return `/cayegory/${currentSlug}`;
    return '/packages';
  };

  // URL builder for bottom pagination
  const getPaginationUrl = (pageNum) => {
    const targetPath = pageType === 'destination'
      ? `/destination/${currentSlug}`
      : (pageType === 'category' ? `/cayegory/${currentSlug}` : '/packages');

    const current = new URLSearchParams();
    if (pageType === 'category') {
      if (activeLocation) current.set('location', activeLocation);
    } else if (pageType === 'destination') {
      if (activeCategory) current.set('category', activeCategory);
    } else {
      if (activeCategory) current.set('category', activeCategory);
      if (activeLocation) current.set('location', activeLocation);
    }
    if (searchQuery) current.set('query', searchQuery);
    current.set('page', pageNum.toString());

    const qs = current.toString();
    return `${targetPath}${qs ? '?' + qs : ''}`;
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.layoutGrid} ${!showSidebar ? styles.noSidebar : ''}`}>

          {showSidebar && (
            <>
              <input type="checkbox" id="mobile-filter-toggle" className={styles.mobileFilterCheckbox} />
              <div className={styles.mobileFilterHeader}>
                <label htmlFor="mobile-filter-toggle" className={styles.mobileFilterBtn}>
                  <FiFilter /> Filter Packages
                </label>
              </div>
              <label htmlFor="mobile-filter-toggle" className={styles.filterBackdrop}></label>
            </>
          )}

          {/* Left Column: Packages Stack */}
          <div className={styles.packagesCol}>
            {hasActiveFilters && (
              <div className={styles.activeFiltersRow}>
                <span className={styles.activeFiltersLabel}>Active Filters:</span>
                <div className={styles.activeFilterTags}>
                  {pageType !== 'category' && activeCategory && activeCategory !== 'all' && activeCategory.split(',').map(cat => (
                    <Link key={cat} href={getRemoveFilterUrl('category', cat)} className={styles.activeFilterTag} title="Click to remove category filter">
                      <span>Category: {cat}</span>
                      <FiX className={styles.removeTagIcon} />
                    </Link>
                  ))}
                  {pageType !== 'destination' && activeLocation && activeLocation !== 'all' && activeLocation.split(',').map(loc => (
                    <Link key={loc} href={getRemoveFilterUrl('location', loc)} className={styles.activeFilterTag} title="Click to remove location filter">
                      <span>Location: {loc}</span>
                      <FiX className={styles.removeTagIcon} />
                    </Link>
                  ))}
                  {searchQuery && (
                    <Link href={getRemoveFilterUrl('query')} className={styles.activeFilterTag} title="Click to remove search term">
                      <span>Search: &quot;{searchQuery}&quot;</span>
                      <FiX className={styles.removeTagIcon} />
                    </Link>
                  )}
                </div>
                <Link href={getClearAllFiltersUrl()} className={styles.clearBtn}>
                  <FiX /> Clear All
                </Link>
              </div>
            )}

            {paginatedPackages.length > 0 ? (
              <div className={layout === 'grid' ? styles.gridLayout : styles.listLayout}>
                {paginatedPackages.map((pkg) => (
                  layout === 'grid' ? (
                    <div key={pkg.id} className={styles.verticalCard}>
                      <div className={`${styles.verticalImageArea} shineEffect`}>
                        <img src={pkg.image} alt={pkg.title} className={styles.cardImage} />
                        <div className={styles.durationBadge}>
                          {pkg.duration}
                        </div>
                      </div>
                      <div className={styles.verticalContentArea}>
                        <div>
                          <h3 className={styles.verticalTitle}>
                            <Link href={`/package/${pkg.slug}`} className={styles.titleLink}>
                              {pkg.title}
                            </Link>
                          </h3>
                          <div className={styles.metaRow} style={{ gap: '10px', marginBottom: '8px' }}>
                            <div className={styles.metaItem}>
                              <FiMapPin className={styles.metaIcon} />
                              <span style={{ fontSize: '12px' }}>{pkg.location}</span>
                            </div>
                            <div className={styles.metaItem}>
                              <FiStar className={styles.metaIcon} />
                              <span style={{ fontSize: '12px' }}>{pkg.rating}</span>
                            </div>
                          </div>
                          <p className={styles.verticalDescription}>{pkg.description}</p>
                          <div className={styles.tagsRow} style={{ marginBottom: '8px' }}>
                            {pkg.tags.slice(0, 1).map((tag, idx) => (
                              <span key={idx} className={styles.tagPill}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className={styles.verticalActionRow}>
                          <Link href={`/package/${pkg.slug}`} style={{ textDecoration: 'none', flex: 1 }}>
                            <AnimatedButton className={styles.verticalViewDetailsBtn}>
                              Details
                            </AnimatedButton>
                          </Link>
                          <EnquiryTriggerBtn
                            itemName={pkg.title}
                            className={styles.verticalEnquiryBtn}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={pkg.id} className={styles.card}>
                      {/* Left Side: Image Area */}
                      <div className={styles.imageArea}>
                        <img src={pkg.image} alt={pkg.title} className={styles.cardImage} />
                        <div className={styles.durationBadge}>
                          {pkg.duration}
                        </div>
                      </div>

                      {/* Right Side: Content Area */}
                      <div className={styles.contentArea}>
                        <div className={styles.titleRow}>
                          <h3 className={styles.cardTitle}>
                            <Link href={`/package/${pkg.slug}`} className={styles.titleLink}>
                              {pkg.title}
                            </Link>
                          </h3>
                        </div>

                        <div className={styles.metaRow}>
                          <div className={styles.metaItem}>
                            <FiMapPin className={styles.metaIcon} />
                            <span>{pkg.location}</span>
                          </div>
                          <div className={styles.metaItem}>
                            <FiStar className={styles.metaIcon} />
                            <span>{pkg.rating} ({pkg.reviewsCount} reviews)</span>
                          </div>
                        </div>

                        <p className={styles.cardDescription}>{pkg.description}</p>

                        <div className={styles.tagsRow}>
                          {pkg.tags.map((tag, idx) => (
                            <span key={idx} className={styles.tagPill}>{tag}</span>
                          ))}
                        </div>

                        {/* Bottom Action Buttons */}
                        <div className={styles.actionRow}>
                          <Link href={`/package/${pkg.slug}`} style={{ textDecoration: 'none' }}>
                            <AnimatedButton className={styles.viewDetailsBtn}>
                              <FiEye className={styles.btnIcon} /> View Details
                            </AnimatedButton>
                          </Link>

                          <EnquiryTriggerBtn itemName={pkg.title} />
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className={styles.noPackages}>
                <h4 className={styles.noPackagesTitle}>No Packages Found</h4>
                <p>Try modifying your search or filter options to see more packages.</p>
              </div>
            )}

            {/* Bottom Pagination */}
            {showPagination && !limit && totalPages > 1 && (
              <div className={styles.pagination}>
                <Link
                  href={getPaginationUrl(currentPage - 1)}
                  className={`${styles.pageLink} ${styles.navLink} ${currentPage === 1 ? styles.disabledLink : ''}`}
                >
                  <FiChevronLeft /> Prev
                </Link>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={getPaginationUrl(pageNum)}
                    className={`${styles.pageLink} ${currentPage === pageNum ? styles.pageLinkActive : ''}`}
                  >
                    {pageNum}
                  </Link>
                ))}

                <Link
                  href={getPaginationUrl(currentPage + 1)}
                  className={`${styles.pageLink} ${styles.navLink} ${currentPage === totalPages ? styles.disabledLink : ''}`}
                >
                  Next <FiChevronRight />
                </Link>
              </div>
            )}

            {/* Inline Need Help Promo Card (Visible on Mobile Only) */}
            <div className={`${styles.sidebarCard} ${styles.promoCard} ${styles.mobileOnlyPromo}`} style={{ marginTop: '20px' }}>
              <h4 className={styles.promoTitle}>Need Expert Help?</h4>
              <p className={styles.promoText}>Talk to our travel experts to craft a fully customized vacation itinerary just for you.</p>
              <a href="tel:+919876543210" className={styles.promoPhone}>+91 9583837770</a>
              <a href="mailto:info@jaganathholidays.com" className={styles.promoEmail}>info@jaganathholidays.com</a>
              <a
                href="https://wa.me/919876543210?text=I'm%20interested%20in%20customizing%20a%20tour%20package."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
                style={{ maxWidth: '300px', margin: '0 auto' }}
              >
                <FaWhatsapp size={20} /> Chat on WhatsApp
              </a>
            </div>

          </div>

          {/* Right Column: Sidebar */}
          {showSidebar && (
            <div className={styles.sidebarCol}>

              <div className={styles.sidebarMobileHeader}>
                <h3>Filters</h3>
                <label htmlFor="mobile-filter-toggle" className={styles.closeFilterBtn}>
                  <FiX />
                </label>
              </div>

              {/* Categories Filter Card */}
              <div className={styles.sidebarCard}>
                <h4 className={styles.sidebarTitle}>Tour Categories</h4>
                <ul className={styles.filterList}>
                  {categories.map((cat) => {
                    const isActive = (!activeCategory && cat.slug === 'all') || (activeCategory && activeCategory.split(',').includes(cat.slug));
                    return (
                      <li key={cat.slug}>
                        <Link
                          href={getCategoryFilterUrl(cat.slug)}
                          className={`${styles.filterLink} ${isActive ? styles.filterLinkActive : ''}`}
                          scroll={false}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {cat.slug !== 'all' && (
                              <input
                                type="checkbox"
                                checked={isActive}
                                readOnly
                                className={styles.filterCheckbox}
                              />
                            )}
                            <span>{cat.name}</span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Destination Filter Card */}
              <div className={styles.sidebarCard}>
                <h4 className={styles.sidebarTitle}>Destinations</h4>
                <ul className={styles.filterList}>
                  {destinations.map((dest) => {
                    const isActive = (!activeLocation && dest.slug === 'all') || (activeLocation && activeLocation.split(',').includes(dest.slug));
                    return (
                      <li key={dest.slug}>
                        <Link
                          href={getDestinationFilterUrl(dest.slug)}
                          className={`${styles.filterLink} ${isActive ? styles.filterLinkActive : ''}`}
                          scroll={false}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {dest.slug !== 'all' && (
                              <input
                                type="checkbox"
                                checked={isActive}
                                readOnly
                                className={styles.filterCheckbox}
                              />
                            )}
                            <span>{dest.name}</span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Need Help Promo Card */}
              <div className={`${styles.sidebarCard} ${styles.promoCard}`}>
                <h4 className={styles.promoTitle}>Need Expert Help?</h4>
                <p className={styles.promoText}>Talk to our travel experts to craft a fully customized vacation itinerary just for you.</p>
                <a href="tel:+919876543210" className={styles.promoPhone}>+91 9583837770</a>
                <a href="mailto:info@jaganathholidays.com" className={styles.promoEmail}>info@jaganathholidays.com</a>
                <a
                  href="https://wa.me/919876543210?text=I'm%20interested%20in%20customizing%20a%20tour%20package."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                >
                  <FaWhatsapp size={20} /> Chat on WhatsApp
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
