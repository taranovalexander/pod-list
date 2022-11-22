import { useReplacePodsMutation } from "../store/services/podsApi";
import { Pod, PodStatus } from "../types";
import { ReactComponent as Icon } from "./refresh-icon.svg";

interface Props {
  data: Pod,
}

const labelClassNames = "font-bold uppercase text-xs theme-text-secondary mr-1";
const rowClassNames = "text-ellipsis overflow-hidden";


export const PodItem: React.FC<Props> = ({ data }) => {
  const [replacePods, meta] = useReplacePodsMutation();
  function onButtonClick(uid: string) {
    replacePods(uid);
  }
  return (
    <div className="border rounded-md p-2 bg-neutral-50	relative">
      <div className={rowClassNames}><span className={labelClassNames}>uid:</span>{data.uid}</div>
      <div className={rowClassNames}><span className={labelClassNames}>commit:</span>{data.commit}</div>
      <div className={rowClassNames}><span className={labelClassNames}>status:</span>{data.status}</div>
      {
        ![PodStatus.TERMINATED, PodStatus.TERMINATING].includes(data.status) && (
          <div className={rowClassNames}>
            <button disabled={meta.isLoading} className={`w-3 h-3 origin-center leading-none theme-fill-primary absolute -right-1 -top-1 ${meta.isLoading ? "animate-spin" : ""}`} onClick={() => onButtonClick(data.uid)}>
              <Icon className="fill-green-500"></Icon>
            </button>
          </div>
        )
      }
    </div>
  );
};
