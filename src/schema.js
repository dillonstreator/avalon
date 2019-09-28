import { normalize, schema } from 'normalizr';

const userSchema = new schema.Entity('users', undefined, {
	idAttribute: '_id',
});

const roomSchema = new schema.Entity(
	'rooms',
	{
		users: [userSchema],
		host: userSchema,
	},
	{
		idAttribute: '_id',
	}
);

const gameSchema = new schema.Entity(
	'games',
	{
		users: [userSchema],
		host: userSchema,
	},
	{
		idAttribute: '_id',
	}
);

export const normalizeRoom = room => normalize(room, roomSchema);
export const normalizeGame = game => normalize(game, gameSchema);
