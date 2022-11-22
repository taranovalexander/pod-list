export enum PodStatus {
  RUNING = "running",
  WAITING = "waiting",
  TERMINATED = "terminated",
  TERMINATING = "terminating",
}

export interface Pod {
  uid: string,
  status: PodStatus,
  uptime: null | number,
  commit: null | string,
  cluster: null | string,
}
