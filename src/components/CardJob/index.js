import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { Card, Button, Row, Col } from 'react-bootstrap';

import { MyContext } from '../../App';

const CardJob = ({ data, index, onRemoveJob }) => {
	const [collectedProps, drag] = useDrag({
		item: { type: 'Card', id: data.id, index },
		collect: (monitor, props) => {
			return { isDragging: !!monitor.isDragging() };
		},
	});

	const appContext = useContext(MyContext);

	return (
		<Card
			ref={drag}
			key={data.id}
			style={{
				marginBottom: 8,
				cursor: 'move',
				opacity: collectedProps?.isDragging ? 0.5 : 1,
			}}>
			<Card.Body>
				<Row>
					<Col xs={8}>
						<Card.Title>{data.title}</Card.Title>
					</Col>
					<Col
						xs={4}
						style={{ display: 'flex', justifyContent: 'flex-end' }}
						onClick={() => appContext.removeTask(data.id)}>
						<Button variant='danger'>X</Button>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

CardJob.propTypes = {
	data: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
};

export default CardJob;
