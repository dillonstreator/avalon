import socket from './socket';

const BASE_URI = process.env['NODE_ENV'] === 'production' ? 'http://avalon-api.honnold.me' : 'http://localhost:8080';

const makeRequest = method => {
	/**
	 * Make an http request to the designated endpoint with the specified options.
	 * 
	 * @param {String} endpoint the endpoint/resource. The host/domain will be prepended, so you only need to enter the resouece to be accessed.
	 * @param {Request} opts the standard request options.
	 * @return {Promise<Response|Error>}
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
