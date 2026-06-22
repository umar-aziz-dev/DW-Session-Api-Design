const products = [
  { id: "1", name: "Laptop", price: 1200 },
  { id: "2", name: "Phone", price: 800 },
];

export const resolvers = {
  Query: {
    products: () => products,

    product: (_: any, args: { id: string }) => {
      return products.find(p => p.id === args.id);
    },
  },

  Mutation: {
    createProduct: (_: any, args: { name: string; price: number }) => {
      const newProduct = {
        id: String(products.length + 1),
        name: args.name,
        price: args.price,
      };

      products.push(newProduct);
      return newProduct;
    },
  },
};