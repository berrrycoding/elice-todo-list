# Elice Todo List

## How To Run

1. 프로젝트 클론 받기

```
git clone https://github.com/berrrycoding/elice-todo-list.git
```

2. elice-todo-list로 이동해서 패키지를 설치합니다.

```
cd elice-todo-list && npm install
```

3. 프로젝트를 실행합니다.

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
