import { createSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { Cluster } from "./components/Cluster";
import { Layout } from "./components/Layout";
import { useGetPodsQuery } from "./store/services/podsApi";
import { Pod } from "./types";

type ClusterMap = { [key: string]: Pod[] };

function App () {
  const sortPodsByCluster = useMemo(() => {
    return createSelector(
      (res: any) => res.data || [],
      (data: Pod[]) => {
        const clusterMap: ClusterMap = { "no cluster": [] };
        data.forEach((pod) => {
          if (pod.cluster) {
            clusterMap[pod.cluster] = [...clusterMap[pod.cluster] || [], pod];
          } else {
            clusterMap["no cluster"].push(pod);
          }
        });
        return clusterMap;
      },
    );
  }, []);
  const { clusters } = useGetPodsQuery(undefined,
    {
      selectFromResult: result => ({
        clusters: sortPodsByCluster(result)
      }),
      // TODO: Enable poling when api is available
      // pollingInterval: 10000,
    }
  );
  return (
    <Layout>
      <h1 className="text-center text-3xl font-bold mb-10">Clusters</h1>
      <div className="grid grid-cols-4 gap-4">
        {
          Object.entries(clusters).map(([clusterName, pods]: [string, Pod[]]) => pods.length ? (
            <Cluster key={clusterName} name={clusterName} pods={pods} />
          ) : null)
        }
      </div>
    </Layout>
  );
}

export default App;
