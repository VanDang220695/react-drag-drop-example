import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { useDrop } from 'react-dnd';
import { v4 } from 'uuid';

import CardJob from '../CardJob';

import styles from './styles.module.css';

const ListContainer = ({
	data = [],
	title = '',
	updateListTodo,
	id,
	addJobList,
}) => {
	const [isShowModal, setIsShowModal] = useState(false);
	const [jobTitle, setJobTitle] = useState('');

	const [isOver, drop] = useDrop({
		accept: 'Card',
		drop: (item) => {
			return updateListTodo(item.id, id);
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	});

	const submitNewJob = () => {
		addJobList({ id: v4(), title: jobTitle }, id);
		setIsShowModal(false);
		setJobTitle('');
	};

	return (
		<div className={styles.wrapperList}>
			<div
				className={styles.content}
				ref={drop}
				style={{ opacity: isOver ? 1 : 0.25 }}>
				<p className={styles.title}>{title}</p>
				<hr />
				{data.map((item, index) => (
					<CardJob key={item.id} data={item} index={index} />
				))}
			</div>
			<br />

			<div>
				{isShowModal && (
					<Modal.Dialog>
						<Modal.Header closeButton onHide={() => setIsShowModal(false)}>
							Job title
						</Modal.Header>
						<Modal.Body>
							<InputGroup>
								<FormControl
									as='textarea'
									placeholder='Enter your job title here'
									onChange={({ target }) => setJobTitle(target.value)}
								/>
							</InputGroup>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant='primary'
								disabled={!jobTitle}
								onClick={submitNewJob}>
								Save
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				)}
				<Button
					style={{ display: isShowModal ? 'none' : 'block' }}
					variant='outline-secondary'
					block
					className={styles.btnAdd}
					onClick={() => setIsShowModal(true)}>
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
