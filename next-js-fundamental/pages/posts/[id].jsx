import { useRouter } from "next/router";

export default function Post({post}) {
  const router = useRouter()
  const {id} = router.query

  return <div>
    <h1>{post.id}</h1>
    <p>{post.title}</p>
    <p>{post.body}</p>
  </div>
}

export async function getStaticProps({params}) {
  const req = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  const data = await req.json();

  return {
    props: {post: data}
  }
}

export async function getStaticPaths(){
  const req = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const data = await req.json();
  console.log(data);

  const paths = data.map(post => {
    return {params: {id: post.id.toString()}}
  })

  console.log(paths);
  return {
    paths,
    fallback: false
  }

}