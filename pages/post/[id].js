/* import supabase from '../../utils/supabase';
import { useEffect, useState } from 'react';
import localDate from '../../functions/localDate';
import localDateTime from '../../functions/localDateTime';
import getItem from '../../functions/getItem';
import removeItem from '../../functions/removeItem';

// Initial data for when the page is pre-rendered
export async function getServerSideProps({ params }) {
  const post = await getItem({
    args: {
      model: 'posts',
      select: '*, comments(*)',
      id: params.id,
    },
  });

  // Data is passed as props to the page
  return {
    props: {
      post,
    },
  };
}

// Functio page component
export default function PostPage({ post = {} }) {
  // React hook
  // Traks the state of a function component
  const [comments, updateComments] = useState(post.comments);

  // Updates the state of a funcion component
  useEffect(() => {
    // Supabase websocket!
    // Hears updates for a
    const subscription = supabase
      .channel('public:comments')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments' },
        (payload) => {
          updateComments([...comments, payload.new]);
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'comments' },
        (payload) => {
          updateComments(removeItem(comments, payload.old.id));
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const newComment = event.target.comment.value;

    const { data, error } = await supabase
      .from('comments')
      .insert([{ content: newComment, post_id: post.id }]);

    console.log(data);
    if (error) {
      console.log(error);
    }

    await supabase
      .from('comments')
      .insert({ content: newComment, post_id: post.id, user_id: 1 });
  }

  // Structure of the page
  return (
    <div>
      <h1>{post.title}</h1>
      <h4>{localDate(post.created_at)}</h4>
      <p>{post.content}</p>
      <h2>Live comments</h2>
      <form onSubmit={handleSubmit}>
        
        <br />
        <input type='text' name='comment' />
        <button type='submit'>Enviar!</button>
      </form>
      <lu>
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              {localDateTime(comment.created_at)} {comment.content}
            </li>
          );
        })}
      </lu>
    </div>
  );
}
 */

export default function PostPage() {
	return <></>;
}
