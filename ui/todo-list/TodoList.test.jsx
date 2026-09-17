import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';

async function addTask(user, text) {
  await user.type(screen.getByPlaceholderText('Add your task'), text);
  await user.click(screen.getByRole('button', { name: 'Submit' }));
}

describe('TodoList', () => {
  test('renders the title and an empty list', () => {
    render(<TodoList />);
    expect(screen.getByRole('heading', { name: 'Todo List' })).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('adds a task and clears the input', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await addTask(user, 'Walk the dog');

    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add your task')).toHaveValue('');
  });

  test('adds tasks in order', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await addTask(user, 'Walk the dog');
    await addTask(user, 'Water the plants');

    const items = screen.getAllByRole('listitem');
    expect(items.map((li) => li.querySelector('span').textContent)).toEqual([
      'Walk the dog',
      'Water the plants',
    ]);
  });

  test('deletes only the clicked task', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await addTask(user, 'Walk the dog');
    await addTask(user, 'Water the plants');
    await addTask(user, 'Wash the dishes');

    const target = screen.getByText('Water the plants').closest('li');
    await user.click(within(target).getByRole('button', { name: 'Delete' }));

    expect(screen.queryByText('Water the plants')).not.toBeInTheDocument();
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
    expect(screen.getByText('Wash the dishes')).toBeInTheDocument();
  });

  test('deletes the right one when two tasks have the same text', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await addTask(user, 'Same');
    await addTask(user, 'Same');

    const [first] = screen.getAllByRole('listitem');
    await user.click(within(first).getByRole('button', { name: 'Delete' }));

    expect(screen.getAllByText('Same')).toHaveLength(1);
  });
});
