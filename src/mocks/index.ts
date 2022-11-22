import { rest, setupWorker } from "msw";
import { API_URL, ENABLE_MOCKS } from "../constants";

function setupWorkers(): void {
  const podsHandlers = [
    rest.get(`${API_URL}/pods`, (req, res, ctx) => {
      return res(
        ctx.delay(300),
        ctx.json([
          {
            "uid": "poduid1",
            "status": "running",
            "uptime": 1234,
            "commit": "agitcommithash",
            "cluster": "app"
          },
          {
            "uid": "poduid2",
            "status": "waiting",
            "uptime": null,
            "commit": "adifferentcommithash",
            "cluster": "app"
          },
          {
            "uid": "poduid3",
            "status": "terminated",
            "uptime": 1645,
            "commit": "adifferentcommithash",
            "cluster": "app"
          },
          {
            "uid": "poduid4",
            "status": "running",
            "uptime": 1463,
            "commit": "commithash",
            "cluster": "router"
          },
          {
            "uid": "poduid5",
            "status": "running",
            "uptime": 1463,
            "commit": "commithash",
            "cluster": null
          }
        ])
      );
    }),
    rest.put(`${API_URL}/pods/:uid`, (req, res, ctx) => {
      return res(
        ctx.delay(500),
        ctx.json({
          "terminating": {
            "uid": req.params.uid,
            "status": "terminating"
          },
          "initializing": {
            "uid": (Math.random() + 1).toString(36).substring(7),
            "status": "waiting"
          }
        })
      );
    }),
  ];
  const worker = setupWorker(
    ...(ENABLE_MOCKS.pods ? podsHandlers : []),
  );
  worker.start();
}

// enable service worker only in develop mode and if mocking is enabled
if (process.env.NODE_ENV !== "production" && Object.values(ENABLE_MOCKS).find(v => v)) {
  setupWorkers();
}
