import RenderBlock from '../../components/Blog/RenderBlock';
import getNotionClient from '../../services/notion';
import { NotionBlock } from '../../types/NotionBlock';

interface SSProps {
  query: { slug: string };
}

interface Props {
  blogPost: {
    object: 'list';
    results: [NotionBlock];
  };
}

export default function Post({ blogPost }: Props) {
  console.log(blogPost.results);
  return (
    <div className='m-8 max-w-2xl'>
      {/* <pre>{JSON.stringify(blogPost, null, 2)}</pre> */}{' '}
      {blogPost.results.map((block, index) => {
        return (
          <RenderBlock
            key={index}
            block={block}
          />
        );
      })}
    </div>
  );
}

export async function getServerSideProps(params: SSProps) {
  const { slug } = params.query;
  const notion = getNotionClient();
  const blogPost = await notion.blocks.children.list({ block_id: slug });
  return { props: { blogPost } };
}
