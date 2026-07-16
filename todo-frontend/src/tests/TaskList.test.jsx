import { fireEvent, render, screen } from '@testing-library/react';
import TaskList from '../TaskList';

describe('TaskList component', () => {
	test('рендерит список задач', () => {
		const tasks = [
			{ id: 1, text: 'first' },
			{ id: 2, text: 'second' },
		];

		render(<TaskList tasks={tasks} onDelete={() => {}} />);
		expect(screen.getByText('first')).toBeInTheDocument();
		expect(screen.getByText('second')).toBeInTheDocument();
	});
});
