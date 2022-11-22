import { PodItem } from "./PodItem";
import { Pod } from "../types";

interface Props {
  name: string,
  pods: Pod[],
}

export const Cluster: React.FC<Props> = ({ pods, name }) => {
  return (
    <div className="border rounded-md p-4 bg-white ">
      <h2 className="uppercase font-bold text-center mb-4 theme-text-primary">{name}</h2>
      {
        pods.map((pod) => (
          <div key={pod.uid} className="mb-4">
            <PodItem data={pod} />
          </div>
        ))
      }
    </div>
  );
};
