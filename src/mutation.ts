import type { ApolloClient, FetchResult, MutationOptions } from "@apollo/client";
import type { DocumentNode } from "graphql";
import { getClient } from "./context";

export type MutateOptions<T = unknown, TVariables = unknown> = Omit<
	MutationOptions<T, TVariables>,
	"mutation"
>;

export type Mutate<T = unknown, TVariables = unknown> = (
	options: MutateOptions<T, TVariables>
) => Promise<FetchResult<T>>;

export function mutation<T = unknown, TVariables = unknown>(
	mutation: DocumentNode,
	initialOptions: MutateOptions<T, TVariables> = {},
	client: ApolloClient<any> = getClient()
): Mutate<T, TVariables> {
	return (options: MutateOptions<T, TVariables>) =>
		client.mutate({ mutation, ...initialOptions, ...options });
}
