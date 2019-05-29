const countries = new Map();

//COLOMBIA
const col = new Map();
//antioquia
const ant = new Map();

ant.set("medellin", { name: "medellín", code: "med", population: 3400000});
ant.set("envigado", { name: "envigado", code: "env", population: 1200000});
ant.set("bello", { name: "bello", code: "bel", population: 700000});

col.set("antioquia", { name: "antioquia", code: "ant", cities: ant});

//cundinamarca
const cund = new Map();

cund.set("bogota", { name: "bogota", code: "bog", population: 9000000});

col.set("cundinamarca", { name: "cundinamarca", code: "cnd", cities: cund});

countries.set("colombia", { name: "colombia", code: "CO", regions: col});

module.exports = countries;
