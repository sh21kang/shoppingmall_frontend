export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("token")) || false,
  getOrder: localStorage.getItem("order"),
  getCart: localStorage.getItem("cart"),
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token");
      window.location = "/";
      return null;
    },
    setOrder :(_,{ order }) =>{
      localStorage.setItem("order",order);
      return null;
    },
    setCart :(_,{ cart }) =>{
      localStorage.setItem("cart",cart);
      return null;
    }
  }
  
};