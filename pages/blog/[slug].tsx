import RenderBlock from '../../components/Blog/RenderBlock';
import getNotionClient from '../../services/notion';

interface SSProps {
  query: { slug: string };
}

interface Props {
  blogPost: {
    object: 'list';
    results: [
      {
        object: string;
        id: string;
        parent: {
          type: string;
          page_id: string;
        };
        created_time: string;
        last_edited_time: string;
        created_by: {
          object: string;
          id: string;
        };
        last_edited_by: {
          object: string;
          id: string;
        };
        has_children: boolean;
        archived: boolean;
        type: string;
      },
    ];
  };
}

export default function Post({ blogPost }: Props) {
  console.log(blogPost.results);
  return (
    <>
      {/* <pre>{JSON.stringify(blogPost, null, 2)}</pre> */}{' '}
      {blogPost.results.map((block) => {
        return <RenderBlock block={block} />;
      })}{' '}
    </>
  );
}

export async function getServerSideProps(params: SSProps) {
  const { slug } = params.query;
  const notion = getNotionClient();
  const blogPost = await notion.blocks.children.list({ block_id: slug });
  return { props: { blogPost } };
}
