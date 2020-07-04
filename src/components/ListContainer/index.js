import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useDrop } from 'react-dnd';

import CardJob from '../CardJob';

import styles from './styles.module.css';

const ListContainer = ({ data = [], title = '', updateListTodo, id }) => {
	const [isOver, drop] = useDrop({
		accept: 'Card',
		drop: (item) => {
			return updateListTodo(item.id, id);
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	});

	return (
		<div className={styles.wrapperList}>
			<div
				className={styles.content}
				ref={drop}
				style={{ opacity: isOver ? 1 : 0.25 }}>
				<p className={styles.title}>{title}</p>
				<hr />
				{data.map((item) => (
					<CardJob key={item.id} item={item} />
				))}
			</div>
			<br />
			<div>
				<Button variant='outline-secondary' block className={styles.btnAdd}>
					Add Card
				</Button>
			</div>
		</div>
	);
};

ListContainer.propTypes = {
	data: PropTypes.array.isRequired,
	title: PropTypes.string,
};

export default ListContainer;
