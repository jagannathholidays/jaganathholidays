const CMS_API_URL = process.env.CMS_API_URL || 'https://cmsapi.one9ty.com';
const CMS_TOKEN = process.env.CMS_TOKEN || '141|PLIcQEisrq76oVJH35rTn3CqkZWZ6xaCSwNDWCiw2ea64d79';
const CMS_STORAGE_URL = process.env.CMS_MEDIA_URL || "https://cdn.one9ty.com/one9ty-travel";

/**
 * Constructs a full image URL from a CMS media file path
 */
export function getImageUrl(filePath, fallback = '/jaganath-banner.webp') {
  if (!filePath) return fallback;
  if (typeof filePath === 'object') {
    filePath = filePath.file_path || filePath.url || '';
  }
  if (!filePath) return fallback;
  if (filePath.startsWith('http://') || filePath.startsWith('https://') || filePath.startsWith('/')) {
    return filePath;
  }
  return `${CMS_STORAGE_URL}/${filePath.replace(/^\/+/, '')}`;
}

/**
 * Strips HTML tags from rich text to generate plain text for SEO meta descriptions
 */
export function stripHtml(html = '') {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Fetches package details by slug from CMS API
 */
export async function getPackageBySlug(slug) {
  if (!slug) return null;

  try {
    const res = await fetch(`${CMS_API_URL}/api/v1/delivery/contents/show`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CMS_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        slug: slug,
        content_type: 'packages',
      }),
      next: { revalidate: 0 }, // Revalidate every 30s (testing mode)
    });

    if (!res.ok) {
      console.error(`Failed to fetch package for slug "${slug}":`, res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    if (data?.success && data?.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching package "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches list of packages from CMS API
 */
export async function getPackagesList(limit = 6) {
  try {
    const res = await fetch(`${CMS_API_URL}/api/v1/delivery/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CMS_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        content_type: 'packages',
      }),
      next: { revalidate: 30 }, // Revalidate every 30s (testing mode)
    });

    if (!res.ok) return [];

    const json = await res.json();
    const items = json?.data?.data || json?.data || [];
    return Array.isArray(items) ? items.slice(0, limit) : [];
  } catch (error) {
    console.error('Error fetching packages list:', error);
    return [];
  }
}

/**
 * Fetches list of vehicles from CMS API
 */
export async function getVehiclesList() {
  try {
    const res = await fetch(`${CMS_API_URL}/api/v1/delivery/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CMS_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        content_type_id: 'vehicles',
        status: 'published',
      }),
      next: { revalidate: 30 }, // Revalidate every 30s
    });

    if (!res.ok) {
      console.error('Failed to fetch vehicles:', res.status, res.statusText);
      return [];
    }

    const json = await res.json();
    const items = json?.data?.data || json?.data || [];
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error('Error fetching vehicles list:', error);
    return [];
  }
}

/**
 * Fetches banner items / destination windows from CMS API
 */
export async function getBannerItems() {
  try {
    const res = await fetch(`${CMS_API_URL}/api/v1/delivery/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CMS_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        content_type_id: 'banner-items',
        status: 'published',
      }),
      next: { revalidate: 30 }, // Revalidate every 30s
    });

    if (!res.ok) {
      console.error('Failed to fetch banner items:', res.status, res.statusText);
      return [];
    }

    const json = await res.json();
    const items = json?.data?.data || json?.data || [];
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error('Error fetching banner items:', error);
    return [];
  }
}

/**
 * Fetches main banners from CMS API
 */
export async function getMainBanners() {
  try {
    const res = await fetch(`${CMS_API_URL}/api/v1/delivery/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CMS_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        content_type_id: 'main-banner',
        status: 'published',
      }),
      next: { revalidate: 30 }, // Revalidate every 30s
    });

    if (!res.ok) {
      console.error('Failed to fetch main banners:', res.status, res.statusText);
      return [];
    }

    const json = await res.json();
    const items = json?.data?.data || json?.data || [];
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error('Error fetching main banners:', error);
    return [];
  }
}

/**
 * Fetches blog details by slug from CMS API
 */
export async function getBlogBySlug(slug) {
  if (!slug) return null;

  try {
    let res = await fetch(`${CMS_API_URL}/api/v1/delivery/contents/show`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CMS_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        slug: slug,
        content_type: 'blog',
      }),
      next: { revalidate: 30 },
    });

    let data = await res.json();

    if (!data?.success || !data?.data) {
      const fallbackRes = await fetch(`${CMS_API_URL}/api/v1/delivery/contents/show`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CMS_TOKEN}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          slug: slug,
          content_type: 'blogs',
        }),
        next: { revalidate: 30 },
      });
      data = await fallbackRes.json();
    }

    if (data?.success && data?.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching blog "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches list of latest blogs from CMS API
 */
export async function getBlogsList(limit = 3) {
  try {
    let res = await fetch(`${CMS_API_URL}/api/v1/delivery/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CMS_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        content_type_id: 'blog',
        status: 'published',
      }),
      next: { revalidate: 30 },
    });

    let json = await res.json();
    let items = json?.data?.data || json?.data || [];

    if (!Array.isArray(items) || items.length === 0) {
      const fallbackRes = await fetch(`${CMS_API_URL}/api/v1/delivery/contents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CMS_TOKEN}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          content_type_id: 'blogs',
          status: 'published',
        }),
        next: { revalidate: 30 },
      });
      json = await fallbackRes.json();
      items = json?.data?.data || json?.data || [];
    }

    return Array.isArray(items) ? items.slice(0, limit) : [];
  } catch (error) {
    console.error('Error fetching blogs list:', error);
    return [];
  }
}

/**
 * Fetches gallery items with pagination from CMS API
 */
export async function getGalleryItems(page = 1) {
  try {
    const res = await fetch(`${CMS_API_URL}/api/v1/delivery/contents?page=${page}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CMS_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        content_type_id: 'gallery',
        status: 'published',
      }),
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.error('Failed to fetch gallery items:', res.status, res.statusText);
      return { items: [], currentPage: page, hasNextPage: false, hasPrevPage: false };
    }

    const json = await res.json();
    const rawItems = json?.data?.data || json?.data || [];
    const items = Array.isArray(rawItems) ? rawItems : [];

    return {
      items,
      currentPage: Number(json?.data?.current_page) || Number(page) || 1,
      hasNextPage: Boolean(json?.data?.next_page_url),
      hasPrevPage: Boolean(json?.data?.prev_page_url) || page > 1,
    };
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return { items: [], currentPage: page, hasNextPage: false, hasPrevPage: false };
  }
}

/**
 * Fetches destinations taxonomy terms from CMS API
 */
export async function getDestinationsTaxonomy() {
  try {
    const res = await fetch(`${CMS_API_URL}/api/v1/delivery/taxonomies?slug=destinations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CMS_TOKEN}`
      },
      next: { revalidate: 30 }
    });
    const result = await res.json();
    if (result.success && result.data && result.data.length > 0) {
      return result.data[0].terms || [];
    }
  } catch (error) {
    console.error("Error fetching destinations:", error);
  }
  return [];
}

/**
 * Fetches customer reviews from CMS API
 */
export async function getReviewsList() {
  try {
    const res = await fetch(`${CMS_API_URL}/api/v1/delivery/contents/show`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CMS_TOKEN}`,
      },
      body: JSON.stringify({
        slug: "reviews",
        content_type: "reviews",
      }),
      next: { revalidate: 30 },
    });

    const result = await res.json();
    const reviews = result?.data?.data?.reviews;

    if (Array.isArray(reviews) && reviews.length > 0) {
      return reviews.map((item, index) => ({
        id: index,
        name: item.name || 'Customer',
        rating: item.rating || 5,
        text: item.content || '',
      }));
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
  return [];
}

