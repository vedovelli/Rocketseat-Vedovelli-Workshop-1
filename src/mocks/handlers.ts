import { http, HttpResponse } from "msw";

const mockItems = [
  { id: "1", title: "Documentação do projeto" },
  { id: "2", title: "API de integração" },
  { id: "3", title: "Configuração de ambiente" },
  { id: "4", title: "Testes automatizados" },
  { id: "5", title: "Deploy em produção" },
];

export const handlers = [
  http.get("/api/items", () => {
    return HttpResponse.json(mockItems);
  }),
  http.get("/api/items/:id", ({ params }) => {
    const id = params["id"] as string;
    const item = mockItems.find((i) => i.id === id) ?? { id, title: `Item ${id}` };
    return HttpResponse.json(item);
  }),
];
