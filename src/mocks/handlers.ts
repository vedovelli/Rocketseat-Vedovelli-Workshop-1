import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/items", () => {
    return HttpResponse.json([{ id: "1", title: "Item 1" }]);
  }),
  http.get("/api/items/:id", ({ params }) => {
    const id = params["id"];
    return HttpResponse.json({ id, title: `Item ${id}` });
  }),
];
