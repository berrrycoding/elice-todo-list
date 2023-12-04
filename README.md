# Elice Todo List

## How To Run

1. Clone project.

```
git clone
```

2. Change directory to elice-todo-list and install packages in it.

```
cd elice-todo-list && npm install
```

3. Start project

```
npm run dev
```

## apis/\*

- `getTodoItems`
  input
  ```
  date: Date;
  ```
  output
  ```
  data: {
    items: TodoItem[];
  }
  ```
- `addTodoItem`
  input
  ```
  content: string;
  date: Date;
  ```
  output
  ```
  data: {
    item: TodoItem;
  }
  ```
- `updateItem`
  input
  ```
  item: TodoItem;
  ```
  output
  ```
  data: {
    item: TodoItem;
  }
  ```
- `deleteTodoItem`
  input

  ```
  id: TodoItem['id'];
  ```

  output

  ```
  data: {
    id: string;
  }
  ```

- `doneTodoItem`
  input

  ```
  id: TodoItem['id'];
  ```

  output

  ```
  data: {
    item: TodoItem;
  }
  ```

- `cancelDoneTodoItem`
  input

  ```
  id: TodoItem['id'];
  ```

  output

  ```
  data: {
    item: TodoItem;
  }
  ```
