import styles from "./index.module.css";
import { Comment } from "../Comment";
import { Avatar } from "../Avatar/index";
import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, useState } from "react";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: string;
  content: string;
}

interface PostProps {
  author: Author;
  content: Content[];
  publishedAt: string
}

//Arrumar post para receber propriedades
export function Post({ author, content, publishedAt } : PostProps) {
  //use state descontruido ( nome da variavel, setcomments)  
  const[comments, setComments] = useState(["Adorei seu Novo Trabalho Bruno"])
  const[newComment, setNewComment] = useState('')

  const publishDateFormatted = format(new Date(publishedAt), "dd 'de' LLLL 'ás' HH:mm:ss", {
    locale: ptBr,
  });

  const PublishDateRelativeToNow = formatDistanceToNow(new Date(publishedAt), {
    locale: ptBr,
    addSuffix: true,
  })

  function deleteComment(commentToDelete : string) {
    const newCommentList = comments.filter(comment => {
      return comment != commentToDelete
    })  
    setComments(newCommentList);
  }

  function handleCreateNewComment(e: FormEvent){
    e.preventDefault();
    //pega o valor da variavel e adiciona mais o que ta no array
    setComments([...comments, newComment])
    setNewComment('')
  }
  
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    setNewComment(event.target.value)
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.profile}>

          <Avatar hasBorder={true} src={author.avatarUrl} />

          <div className={styles.description}>
            <strong>
              {author.name}
            </strong>
            <span>
              {author.role}
            </span>
          </div>
        </div>

        <time title={publishDateFormatted} dateTime={publishDateFormatted}>
          <span>Publicado</span> {PublishDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          switch (line.type) {
            case 'paragraph':
              return <p>{line.content}</p>
            case 'link':
              return <p><a href="#">{line.content}</a></p>
            default:  
              return ""
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea value={newComment} onChange={handleNewCommentChange} name="comment" placeholder="Deixe um comentário" />

        <button type="submit">Publicar</button>
      </form>
      
      <div className={styles.comments}>
       {comments.map((comment) => {
        return <Comment deleteComment={deleteComment} comment={comment}/>
       })}
      </div>
    </article>
  );
}
