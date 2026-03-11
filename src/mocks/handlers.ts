import { http, HttpResponse } from "msw";

const mockItems = [
  { id: "1", title: "Documentação do projeto" },
  { id: "2", title: "API de integração" },
  { id: "3", title: "Configuração de ambiente" },
  { id: "4", title: "Testes automatizados" },
  { id: "5", title: "Deploy em produção" },
];

const mockProducts = [
  { id: "1", name: "Notebook Dell Inspiron", description: "Notebook Dell Inspiron 15 com processador Intel Core i7", price: 4599.9, category: "Eletrônicos", status: "active" },
  { id: "2", name: "Mouse Logitech MX Master", description: "Mouse sem fio ergonômico com scroll adaptativo", price: 499.9, category: "Periféricos", status: "active" },
  { id: "3", name: "Teclado Mecânico RGB", description: "Teclado mecânico com switches Red e iluminação RGB", price: 349.9, category: "Periféricos", status: "inactive" },
  { id: "4", name: "Monitor Samsung 27\"", description: "Monitor 27 polegadas 4K UHD com painel IPS", price: 2899.9, category: "Eletrônicos", status: "active" },
  { id: "5", name: "Webcam Full HD", description: "Webcam Full HD 1080p com microfone embutido", price: 299.9, category: "Periféricos", status: "inactive" },
  { id: "6", name: "SSD Samsung 1TB", description: "SSD NVMe M.2 1TB com velocidade de leitura de 3500MB/s", price: 699.9, category: "Armazenamento", status: "active" },
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
  http.get("/api/products", () => {
    return HttpResponse.json(mockProducts);
  }),
  http.get("/api/products/:id", ({ params }) => {
    const id = params["id"] as string;
    const product = mockProducts.find((p) => p.id === id) ?? { id, name: `Produto ${id}`, description: "", price: 0, category: "", status: "active" };
    return HttpResponse.json(product);
  }),
];
