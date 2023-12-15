import { useState } from "react";
import styles from "../../styles/Todo.module.css";

export default function Todo() {
  // input内のテキストを管理・反映
  const [todoText, setTodoText] = useState();

  // 未完了のタスク
  const [incompleteTodos, setIncompleteTodos] = useState([
    "TODOです1",
    "TODOです2",
  ]);

  // 完了のタスク
  const [completeTodos, setcompleteTodos] = useState([
    "TODOでした1",
    "TODOでした2",
  ]);

  // タスク追加
  const onClickAdd = () => {
    if (todoText === "") return;

    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    // setTodoText();
  };

  // input内のテキストを更新
  const changeTodoText = (e) => {
    setTodoText(e.target.value);
  };

  const onClickDelete = (index) => {
    console.log(index);
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>TodoList</h1>

      {/* TODOを入力 */}
      <section className={styles.itemWrap}>
        <input
          type="text"
          placeholder="TODOを入力"
          value={todoText}
          onChange={changeTodoText}
        />
        <button onClick={onClickAdd} className="button">
          追加
        </button>
      </section>

      {/* 未完了のTODO */}
      <section className={styles.itemWrap}>
        <h2>未完了のTODO</h2>
        <ul className={styles.itemList}>
          {incompleteTodos.map((todo, index) => (
            <li key={index}>
              <p>{todo}</p>
              <button>完了</button>
              <button onClick={() => onClickDelete(index)}>削除</button>
            </li>
          ))}
        </ul>
      </section>

      {/* 完了のTODO */}
      <section className={styles.itemWrap}>
        <h2>完了のTODO</h2>
        <ul className={styles.itemList}>
          {completeTodos.map((todo, index) => (
            <li key={index}>
              <p>{todo}</p>
              <button>未完了に戻す</button>
              <button>削除</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
