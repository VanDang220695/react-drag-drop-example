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

const HEADER_FILE_EXCEL = [
	{
		label: 'Id',
		key: 'id',
	},
	{
		label: 'Title',
		key: 'title',
	},
	{
		label: 'Status',
		key: 'status',
	},
];

export { STATUS, LIST_TARGET_BOX, HEADER_FILE_EXCEL };
