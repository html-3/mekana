import Link from 'next/link';
import formatDateTime from '../../functions/formatDateTime';
import getNotionClient from '../../services/notion';
import slugify from 'slugify';

interface Props {
  blogPosts: BlogPosts;
}

interface BlogPosts {
  results: BlogPost[];
}

interface BlogPost {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: {
    title: { title: [{ plain_text: string }] };
    published: { checkbox: boolean };
    author: {};
    tags: { multi_select: [{ name: string }] };
  };
}

export default function Blog({ blogPosts }: Props) {
  return (
    <div className='m-8 max-w-2xl'>
      <h1>Postagens</h1>
      {/* <pre>{JSON.stringify(blogPosts, null, 2)}</pre> */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12'>
        {blogPosts.results.map((post, index) => {
          return (
            <Link
              key={index}
              href={`/blog/${slugify(post.id, {
                strict: true,
              }).toLowerCase()}`}>
              <div className='group min-h-[80px] space-y-2'>
                <h2 className='group-hover:text-secondary transition-colors'>
                  {post.properties.title.title[0].plain_text}
                </h2>
                <div className='flex gap-2 flex-wrap'>
                  {post.properties.tags.multi_select.map((tag, index) => {
                    return (
                      <span
                        className='bg-stone-400 text-alt px-1 py-0.5 text-xs italic'
                        key={index}>
                        {tag.name}
                      </span>
                    );
                  })}
                </div>
                <p>{formatDateTime(post.created_time)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const notion = getNotionClient();
  const blogPosts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    filter: { property: 'published', checkbox: { equals: true } },
    sorts: [],
  });
  return { props: { blogPosts } };
}
