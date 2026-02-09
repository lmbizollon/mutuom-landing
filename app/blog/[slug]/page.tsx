import { getArticle, getAllSlugs } from '@/lib/blog';
import { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  return {
    title: `${article.title} - MUTUOM`,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">Accueil</Link>
        {' > '}
        <Link href="/blog" className="hover:text-gray-700">Blog</Link>
        {' > '}
        <span className="text-gray-900">{article.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <time>
            {new Date(article.date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span>•</span>
          <span>{article.readingTime} min</span>
          <span>•</span>
          <span>{article.author}</span>
        </div>
      </header>

      {/* Content */}
      <article
        className="prose prose-lg max-w-none
          prose-headings:font-bold
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900
          prose-ul:my-4 prose-li:my-2
          prose-table:my-6
          prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* CTA */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-bold mb-2">
          Prêt à réduire vos coûts d'approvisionnement ?
        </h3>
        <p className="text-gray-600 mb-4">
          Rejoignez les entreprises qui optimisent leurs achats avec MUTUOM
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Demander une démo
        </Link>
      </div>
    </div>
  );
}
