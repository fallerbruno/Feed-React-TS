import styles from "./index.module.css";
import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";

interface CommentProps{
  comment: string;
  // o q vai dentro da funcao e o tipo de retorno
  deleteComment: (comment : string) => void;
 }

export function Comment({comment, deleteComment}: CommentProps){
  
  function handleDeleteComment(){
    deleteComment(comment);
  }
  
  const [like, setLike] = useState(0)

  function handleCountLike(){
    
    setLike(like+1)
  }

  return (
    <div className={styles.comment}>
      <img
        src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1021&q=80"
        alt=""
      />
      <div className={styles.commentArea}>
        <div className={styles.content}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Wade Warren</strong>
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:00">
                Comentado há 1h
              </time>
            </div>

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>

          <p>{comment}</p>
        </div>

        <footer>
          <button onClick={handleCountLike}>
            <ThumbsUp />
            <span>{like}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
