import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { Card } from 'react-bootstrap';

const CardJob = ({ item }) => {
	const [{ isDragging }, drag] = useDrag({
		item: { type: 'Card', id: item.id },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	return (
		<Card
			ref={drag}
			key={item.id}
			style={{
				marginBottom: 8,
				cursor: 'pointer',
				opacity: isDragging ? 0.5 : 1,
			}}>
			<Card.Body>
				<Card.Title>{item.title}</Card.Title>
				<Card.Text>{item.description}</Card.Text>
			</Card.Body>
		</Card>
	);
};

CardJob.propTypes = {
	item: PropTypes.object.isRequired,
};

export default CardJob;
