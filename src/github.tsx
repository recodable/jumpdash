import type { Component } from "solid-js";
import { createResource, mergeProps, createEffect } from "solid-js";
import { SimpleMetricBlock } from "./blocks";

type Props = {
  user: string;
  repo: string;
};

type RepoParams = Props;

export function createRepoStats({ user, repo }: RepoParams) {
  return createResource<{
    stargazers_count: number;
    open_issues_count: number;
  }>(() => {
    const url = `https://api.github.com/repos/${user}/${repo}`;
    return fetch(url).then((response) => response.json());
  });
}

export function createGithubGraphqlResource<R>(query: string) {
  return createResource<R>(() => {
    return fetch("https://api.github.com/graphql", {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_KEY}`,
      },
      body: JSON.stringify({ query }),
      method: "POST",
    }).then((response) => response.json());
  });
}

export const GithubStarBlock: Component<Props> = (props) => {
  props = mergeProps({ user: "solidjs", repo: "solid" }, props);

  const [data] = createRepoStats(props);

  return (
    <SimpleMetricBlock
      title="Github Stars"
      value={() => data().stargazers_count}
      loading={data.loading}
      uow="stars"
    />
  );
};

export const GithubOpenIssueBlock: Component<Props> = (props) => {
  props = mergeProps({ user: "solidjs", repo: "solid" }, props);

  const [data] = createRepoStats(props);

  return (
    <SimpleMetricBlock
      title="Github Issues"
      value={() => data().open_issues_count}
      loading={data.loading}
      uow="open issues"
    />
  );
};

// TODO: implement caching for graphql query (not possible with fetch atm because graphql request are POST)
export const GithubOpenPullRequestBlock = (props) => {
  props = mergeProps({ user: "solidjs", repo: "solid" }, props);

  const [data] = createGithubGraphqlResource<{
    data: { repository: { pullRequests: { totalCount: number } } };
  }>(`
    {
      repository(
        owner: ${JSON.stringify(props.user)},
        name: ${JSON.stringify(props.repo)}
      ) {
        pullRequests(states: OPEN) {
          totalCount
        }
      }
    }
  `);

  createEffect(() => console.log(data()));

  return (
    <SimpleMetricBlock
      title="Github PR"
      value={() => data().data.repository.pullRequests.totalCount}
      loading={data.loading}
      uow="open PR"
    />
  );
};
