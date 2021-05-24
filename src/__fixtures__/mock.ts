import { Observable } from "@apollo/client/core";
import { extensions } from "../observable";

export type Mock = {
	calls: Array<any[]>;
};

export function getMock(value: any): Mock {
	return value.mock;
}

export type MockClient = any;

export function mockObservableQuery(value: any) {
	const query: any = Observable.of(value);

	for (const extension of extensions) {
		query[extension] = jest.fn();
	}

	return query;
}

export interface MockApolloClient {
	watchQuery: any;
	readQuery: any;
	writeQuery: any;
	mutate: any;
	subscribe: any;
}


export function mockClient(options: Partial<MockApolloClient> = {}): MockApolloClient {
	const {
		watchQuery = () => mockObservableQuery({ data: {} }),
		readQuery,
		writeQuery,
		mutate,
		subscribe,
	} = options;

	return {
		watchQuery: jest.fn(watchQuery),
		readQuery: jest.fn(readQuery),
		writeQuery: jest.fn(writeQuery),
		mutate: jest.fn(mutate),
		subscribe: jest.fn(subscribe),
	};
}
