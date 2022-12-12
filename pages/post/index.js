import supabase from '../../utils/supabase';
import Error from 'next/error';

export async function getStaticProps() {
  const { data: posts, error } = await supabase.from('posts').select('*');

  if (error) {
    throw new Error(error);
  }

  return {
    props: {
      posts,
    },
  };
}

export default function PostsPage({ posts }) {
  return (
    <div>
      <h1>MEKANA</h1>
      <h4>Posts</h4>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
