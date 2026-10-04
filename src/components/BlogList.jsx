import Link from 'next/link';
import styles from './BlogList.module.css';
import { getImageUrl, stripHtml } from '@/lib/api';

/* ── Fallback Data ── */
const dummyBlogs = Array.from({ length: 9 }).map((_, index) => ({
  id: index + 1,
  title: `Exploring the hidden gems of Odisha ${index + 1}`,
  description: "Discover the heritage and beauty of Puri, Konark, and Bhubaneswar. A complete guide to a memorable journey across the beautiful state of Odisha.",
  date: `Date: ${21 - (index % 15)} Jun 2026`,
  image: `https://picsum.photos/600/400?random=${index + 100}`,
  link: '/blogs/details',
}));

function formatDate(dateStr) {
  if (!dateStr) return 'Date: 21 Jun 2026';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return `Date: ${dateStr}`;
    const day = d.getDate();
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `Date: ${day} ${month} ${year}`;
  } catch {
    return `Date: ${dateStr}`;
  }
}

/* ── Server-side Data fetching ── */
async function fetchBlogs(page = 1) {
  try {
    let res = await fetch(`${process.env.CMS_API_URL || 'https://cmsapi.one9ty.com'}/api/v1/delivery/contents?page=${page}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CMS_TOKEN || '141|PLIcQEisrq76oVJH35rTn3CqkZWZ6xaCSwNDWCiw2ea64d79'}`
      },
      body: JSON.stringify({ content_type_id: 'blog', status: 'published' }),
      next: { revalidate: 86400 },
    });

    let result = await res.json();

    // Fallback if 'blog' returned empty, try 'blogs'
    if (!result.success || !result.data?.data?.length) {
      const fallbackRes = await fetch(`${process.env.CMS_API_URL || 'https://cmsapi.one9ty.com'}/api/v1/delivery/contents?page=${page}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CMS_TOKEN || '141|PLIcQEisrq76oVJH35rTn3CqkZWZ6xaCSwNDWCiw2ea64d79'}`
        },
        body: JSON.stringify({ content_type_id: 'blogs', status: 'published' }),
        next: { revalidate: 86400 },
      });
      const fallbackResult = await fallbackRes.json();
      if (fallbackResult.success && fallbackResult.data?.data?.length > 0) {
        result = fallbackResult;
      }
    }

    if (result.success && result.data?.data?.length > 0) {
      const blogs = result.data.data.map((item, index) => {
        const itemData = item.data || {};
        const title = itemData.title || item.title || 'Odisha Travel Story';
        const rawDesc = itemData.short_description || itemData.description || itemData.content || '';
        const description = stripHtml(rawDesc) || 'Discover the heritage and beauty of Odisha with Jagannath Holidays.';
        const date = formatDate(item.published_at || itemData.published_date || item.created_at);
        const rawImage = itemData.featured_image || itemData.thumbnail || itemData.cover_image || itemData.image;
        const defaultFallbackImage = `https://picsum.photos/600/400?random=${index + 100}`;
        const image = rawImage ? getImageUrl(rawImage, defaultFallbackImage) : defaultFallbackImage;
        const slug = item.slug || itemData.slug;
        const link = slug ? `/blog/${slug}` : '/';

        return {
          id: item.id || item._id || index,
          title,
          description,
          date,
          image,
          link,
        };
      });

      const currentPage = Number(result.data.current_page) || Number(page) || 1;
      const hasNextPage = Boolean(result.data.next_page_url);
      const hasPrevPage = Boolean(result.data.prev_page_url) || currentPage > 1;

      return {
        blogs,
        currentPage,
        hasNextPage,
        hasPrevPage,
      };
    }
  } catch (err) {
    console.error('Error fetching blogs in BlogList:', err);
  }

  return {
    blogs: dummyBlogs,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };
}

/* ── Main Component (Server Component) ── */
export default async function BlogList({ page = 1 }) {
  const pageNumber = Number(page) || 1;
  const { blogs, currentPage, hasNextPage, hasPrevPage } = await fetchBlogs(pageNumber);

  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {blogs.map((blog) => (
            <Link href={blog.link} key={blog.id} className={styles.card}>
              <img src={blog.image} alt={blog.title} className={styles.cardImage} />
              <div className={styles.cardOverlay}>
                <h3 className={styles.cardTitle}>{blog.title}</h3>
                <p className={styles.cardDescription}>{blog.description}</p>
                <div className={styles.cardFooter}>
                  <div className={styles.cardDate}>{blog.date}</div>
                  <div className={styles.readMore}>Read More &rarr;</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className={styles.pagination}>
          {hasPrevPage && currentPage > 1 ? (
            <Link href={`/blogs?page=${currentPage - 1}`} className={styles.pageBtn}>
              Prev
            </Link>
          ) : (
            <span className={`${styles.pageBtn} ${styles.disabledPage}`}>
              Prev
            </span>
          )}

          <span className={`${styles.pageBtn} ${styles.activePage}`}>
            {currentPage}
          </span>

          {hasNextPage && (
            <Link href={`/blogs?page=${currentPage + 1}`} className={styles.pageBtn}>
              {currentPage + 1}
            </Link>
          )}

          {hasNextPage ? (
            <Link href={`/blogs?page=${currentPage + 1}`} className={styles.pageBtn}>
              Next
            </Link>
          ) : (
            <span className={`${styles.pageBtn} ${styles.disabledPage}`}>
              Next
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
