import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchToDos } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  todos: Todo[];
  fetchToDos(): any;
}
class _App extends React.Component<AppProps> {
  onClickFetch = (): void => {
    this.props.fetchToDos();
  };

  renderList = (): JSX.Element[] => {
    return this.props.todos.map((todo: Todo) => {
      return <div key={todo.id}> {todo.title}</div>;
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.onClickFetch}>Fetch</button>
        {this.renderList()}
      </div>
    );
  }
}
const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};
export const App = connect(mapStateToProps, { fetchToDos })(_App);
