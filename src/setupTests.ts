
import "@testing-library/jest-dom";
// import { server } from "./mocks/api/server";
import { podsApi } from "./store/services/podsApi";
import { setupStore } from "./store";

const store = setupStore({});

// Establish API mocking before all tests.
beforeAll(() => {
  // server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  // server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  store.dispatch(podsApi.util.resetApiState());
});

// Clean up after the tests are finished.
// afterAll(() => server.close());
