import { ApolloClient, gql } from "@apollo/client/core";
import { getClient, mutation, setClient } from "..";
import { mockClient, getMock, MockClient } from "../__fixtures__/mock";

jest.mock("../context");

it("should export mutation", () => {
	expect(typeof mutation).toBe("function");
});

it("should call client mutate", async () => {
	setClient({ mutate: () => Promise.resolve(42) } as MockClient);

	const mutate = mutation(gql`
		mutation sendMessage($message: String!) {
			sendMessage(message: $message) {
				messages
			}
		}
	`);

	const client = getClient();
	const result = await mutate({ variables: { message: "Howdy!" } });

	expect(result).toEqual(42);

	const [[options]] = getMock(client.mutate).calls;

	expect(options.mutation).toBeDefined();
	expect(options.variables).toEqual({ message: "Howdy!" });
});

it("should support passing in client", async () => {
	const client = mockClient({ mutate: () => Promise.resolve(42) } as MockClient) as ApolloClient<any>;

	const mutate = mutation(gql`
		mutation sendMessage($message: String!) {
			sendMessage(message: $message) {
				messages
			}
		}
	`, undefined, client);

	const result = await mutate({ variables: { message: "Howdy!" } });

	expect(result).toEqual(42);

	const [[options]] = getMock(client.mutate).calls;

	expect(options.mutation).toBeDefined();
	expect(options.variables).toEqual({ message: "Howdy!" });
});

it("should extend initial options", async () => {
	setClient({ mutate: () => Promise.resolve(42) } as MockClient);

	const mutate = mutation(gql`
		mutation sendMessage($message: String!) {
			sendMessage(message: $message) {
				messages
			}
		}
	`, { refetchQueries: [] });

	const client = getClient();
	await mutate({ awaitRefetchQueries: true });

	const [[options]] = getMock(client.mutate).calls;

	expect(options.refetchQueries).toEqual([]);
	expect(options.awaitRefetchQueries).toEqual(true);
});
