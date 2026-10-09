import BreadcrumbBanner from '@/components/BreadcrumbBanner';
import BlogDetailsContent from '@/components/BlogDetailsContent';
import { getBlogBySlug, stripHtml } from '@/lib/api';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found | Jagannath Holidays',
      description: 'The requested blog could not be found.',
    };
  }

  const details = blog.data || {};
  const title = details.meta_title || blog.title || 'Blog Details';
  const rawDescription = details.meta_description || details.short_description || details.content || '';
  const description = stripHtml(rawDescription).slice(0, 160) || 'Read the latest blog from Jagannath Holidays.';

  return {
    title: `${title}`,
    description,
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  const title = blog?.data?.title || blog?.title || 'Blog Details';
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Blogs', link: '/blogs' },
    { label: title },
  ];

  return (
    <main>
      <BreadcrumbBanner 
        title={title} 
        breadcrumbs={breadcrumbs} 
        bgImage="/jaganath-banner.webp"
      />
      <BlogDetailsContent blog={blog} />
    </main>
  );
}
