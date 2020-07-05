import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import CSVReader from 'react-csv-reader';

import { STATUS, LIST_TARGET_BOX, HEADER_FILE_EXCEL } from './constants';

import ListContainer from './components/ListContainer';
// import dataDemo from './Demo';

import './App.css';

export const MyContext = React.createContext({
	removeTask: () => {},
});

function App() {
	const [listWork, setListWork] = useState([]);
	const [listTodo, setListTodo] = useState([]);
	const [listDoing, setListDoing] = useState([]);
	const [listDone, setListDone] = useState([]);

	const getStatusJob = (targetId) => {
		switch (targetId) {
			case LIST_TARGET_BOX.DOING:
				return 1;
			case LIST_TARGET_BOX.DONE:
				return 2;
			default:
				return 0;
		}
	};

	const removeTask = (id) => {
		const newListWork = listWork.filter((item) => item.id !== id);
		setListWork(newListWork);
	};

	const addJobList = (job, targetId) => {
		const status = getStatusJob(targetId);
		const newJob = { ...job, status };
		setListWork([...listWork, newJob]);
	};

	const updateListTodo = (id, targetId) => {
		const status = getStatusJob(targetId);
		const newListWork = listWork.map((job) => {
			if (job.id === id) {
				return { ...job, status };
			}
			return job;
		});
		setListWork(newListWork);
	};

	const handleDataImport = (dataImport) => {
		const newDataImport = [...dataImport].splice(1);
		const newListJobFile = [];
		newDataImport.forEach((data) => {
			const [id, title, status] = data;
			const task = {
				id,
				title,
				status: +status,
			};
			newListJobFile.push(task);
		});
		setListWork(newListJobFile);
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
		<MyContext.Provider value={{ removeTask }}>
			<div className='container'>
				<p
					style={{
						textAlign: 'center',
						color: 'white',
						fontSize: 24,
					}}>
					My task list
				</p>

				<Container fluid>
					<Row>
						<Col xs={12}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									paddingBottom: 10,
								}}>
								<CSVReader
									label=''
									onFileLoaded={(data) => handleDataImport(data)}>
									<Button variant='secondary' style={{ marginRight: 20 }}>
										Import
									</Button>
								</CSVReader>

								<CSVLink
									data={listWork}
									headers={HEADER_FILE_EXCEL}
									filename='My task list'>
									<Button variant='primary'>Export</Button>
								</CSVLink>
							</div>
						</Col>
						<Col>
							<ListContainer
								title='Todo'
								data={listTodo}
								id='todo'
								updateListTodo={updateListTodo}
								addJobList={addJobList}
							/>
						</Col>
						<Col>
							<ListContainer
								title='Doing'
								data={listDoing}
								id='doing'
								updateListTodo={updateListTodo}
								addJobList={addJobList}
							/>
						</Col>
						<Col>
							<ListContainer
								title='Done'
								data={listDone}
								id='done'
								updateListTodo={updateListTodo}
								addJobList={addJobList}
							/>
						</Col>
					</Row>
				</Container>
			</div>
		</MyContext.Provider>
	);
}

export default App;
