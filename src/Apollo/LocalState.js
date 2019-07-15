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
      localStorage.removeItem("cart");
      localStorage.removeItem("order");
      window.location = "/";
      return null;
    },
    setOrder :(_,{ order }) =>{
      localStorage.setItem("order",order);
      return null;
    },
    setCart :async (_,{ cart }) =>{
      var tmp  = await localStorage.getItem("cart");
      if(tmp===null){
        localStorage.setItem("cart",cart);
      }
      else{
        var tmp2 = [...JSON.parse(tmp), ...JSON.parse(cart)];
        localStorage.setItem("cart",JSON.stringify(tmp2));
      }
      return null;
    }
  }
  
};
