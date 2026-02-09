import { getArticles } from '@/lib/blog';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - MUTUOM | Expertise groupements d\'achat',
  description: 'Guides, analyses et données sur les groupements d\'achat professionnels. Optimisez vos coûts d\'approvisionnement.',
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-xl text-gray-600 mb-12">
        Guides, analyses et données pour optimiser vos achats professionnels
      </p>

      <div className="space-y-8">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block group"
          >
            <article className="border-b border-gray-200 pb-8 hover:border-gray-400 transition">
              <time className="text-sm text-gray-500">
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <h2 className="text-2xl font-bold mt-2 group-hover:text-blue-600 transition">
                {article.title}
              </h2>
              <p className="text-gray-600 mt-2">{article.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <span>{article.readingTime} min lecture</span>
                <span>•</span>
                <span>{article.author}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
