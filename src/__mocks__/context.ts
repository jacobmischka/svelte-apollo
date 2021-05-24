import { MockApolloClient, mockClient } from "../__fixtures__/mock";


let client: MockApolloClient;
setClient();

export function getClient() {
	return client;
}

export function setClient(options: Partial<MockApolloClient> = {}) {
	client = mockClient(options);
	return client;
}
