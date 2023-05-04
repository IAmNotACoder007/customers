import { Model, createServer } from "miragejs";

export function Server() {
  return createServer({
    models: {
      customer: Model,
    },
    routes() {
      this.namespace = "api";
      this.get("/customers", (schema, request) => {
        return schema.customers.all();
      });

      this.post("/customers", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.customers.create(attrs);
      });
      this.patch("/customers/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let customer = schema.customers.find(id);

        return customer.update(newAttrs);
      });
    },
  });
}
