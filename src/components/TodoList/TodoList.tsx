/* eslint-disable no-console */

//hooks
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';

//api
import { getTodos } from '../../api';

//store
import { actions as todosActions } from '../../features/todos';
import { actions as currentTodoActions } from '../../features/currentTodo';

//services
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        dispatch(todosActions.set(data));
      } catch (error) {
        console.log(error);
      }
    };

    loadTodos();
  }, [dispatch]);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(filter.query.toLowerCase());

    const matchesStatus =
      filter.status === 'all' ||
      (filter.status === 'active' && !todo.completed) ||
      (filter.status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  return (
    <>
      {filteredTodos.length <= 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.map(todo => {
              return (
                <tr data-cy="todo" key={todo.id}>
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered"> </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames(
                        { 'has-text-success': todo.completed },
                        { 'has-text-danger': !todo.completed },
                      )}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(currentTodoActions.set(todo))}
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
