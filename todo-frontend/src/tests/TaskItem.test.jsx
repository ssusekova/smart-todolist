import { fireEvent, render, screen } from '@testing-library/react';
import TaskItem from '../TaskItem';

describe('TaskItem component', () => {
	test('рендерит текст задачи', () => {
		const task = { id: 1, text: 'Выучить Jest' };
		render(<TaskItem task={task} onDelete={() => {}} />);
		expect(screen.getByText('Выучить Jest')).toBeInTheDocument();
	});

	test('вызывается onDelete при клике на кнопку удаления', () => {
		const task = { id: 1, text: 'Выучить Jest' };
		const onDelete = jest.fn();
		render(<TaskItem task={task} onDelete={onDelete} />);
		fireEvent.click(screen.getByText(/удалить/i));
		expect(onDelete).toHaveBeenCalledWith(task.id);
	});
});
