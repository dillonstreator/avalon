import socket from './socket';

const BASE_URI = 'http://localhost:8080';

const makeRequest = method => {
	/**
	 *
	 * @param {String} endpoint the endpoint
	 * @param {Request} opts the options to pass along with the request
	 */
	const request = (endpoint, opts = {}) => {
		const url = `${BASE_URI}${endpoint}`;

		const name = socket.getName();
		const clientId = socket.getClientId();
		const creds = btoa(`${name}:${clientId}`);
        if (opts.body) opts.body = JSON.stringify(opts.body);
		const options = {
            ...opts,
			headers: {
				Authorization: `Basic ${creds}`,
				'Content-Type': 'application/json',
			},
			method,
		};
        return fetch(url, options)
            .then(res => res.json())
            .catch(e => {
                console.error(e);
                return e;
            });
	};
	return request;
};

export const GET = makeRequest('GET');
export const POST = makeRequest('POST');
export const PUT = makeRequest('PUT');
