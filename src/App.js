import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import ListContainer from './components/ListContainer';
import dataDemo from './Demo';

import './App.css';

const STATUS = {
	TODO: 0,
	DOING: 1,
	DONE: 2,
};

const LIST_TARGET_BOX = {
	TODO: 'todo',
	DOING: 'doing',
	DONE: 'done',
};

function App() {
	const [listWork, setListWork] = useState(dataDemo);
	const [listTodo, setListTodo] = useState([]);
	const [listDoing, setListDoing] = useState([]);
	const [listDone, setListDone] = useState([]);

	const updateListTodo = (id, targetId) => {
		let status = 0;
		switch (targetId) {
			case LIST_TARGET_BOX.DOING:
				status = 1;
				break;
			case LIST_TARGET_BOX.DONE:
				status = 2;
				break;
			default:
				break;
		}
		const newListWork = listWork.map((job) => {
			if (job.id === id) {
				return { ...job, status };
			}
			return job;
		});
		setListWork(newListWork);
	};

	useEffect(() => {
		const newListTodo = [];
		const newListDoing = [];
		const newListDone = [];
		listWork.forEach((item) => {
			if (item.status === STATUS.DOING) {
				newListDoing.push(item);
			} else if (item.status === STATUS.DONE) {
				newListDone.push(item);
			} else {
				newListTodo.push(item);
			}
		});
		setListTodo(newListTodo);
		setListDoing(newListDoing);
		setListDone(newListDone);
	}, [listWork]);

	return (
		<div className='container'>
			<Container fluid style={{ paddingTop: 50 }}>
				<Row>
					<Col>
						<ListContainer
							title='Todo'
							data={listTodo}
							id='todo'
							updateListTodo={updateListTodo}
						/>
					</Col>
					<Col>
						<ListContainer
							title='Doing'
							data={listDoing}
							id='doing'
							updateListTodo={updateListTodo}
						/>
					</Col>
					<Col>
						<ListContainer
							title='Done'
							data={listDone}
							id='done'
							updateListTodo={updateListTodo}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
