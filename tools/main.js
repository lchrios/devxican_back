var Cliente = require("./cliente.js");

var auxCliente = new Cliente("localhost", "9999", "http");

let auxPost = {
  title: Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 10),
  date: new Date(),
  author: null,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis libero nec mauris sodales, at laoreet ligula efficitur. Ut et tincidunt lacus, ut cursus ex. Phasellus ornare nibh at nisl tincidunt sagittis. Aliquam erat volutpat. Curabitur efficitur diam nec scelerisque venenatis. Donec accumsan lacinia justo et mattis. Maecenas eu faucibus odio. Morbi venenatis dui turpis, vel fermentum lacus vehicula id. Suspendisse potenti.",
  answers: [],
  likes: Math.floor(Math.random() * 100),
  dislikes: Math.floor(Math.random() * 100),
};

let auxComment = {
  date: new Date(),
  author: "Some Author",
  comment:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis libero nec mauris sodales, at laoreet ligula efficitur. Ut et tincidunt lacus, ut cursus ex. Phasellus ornare nibh at nisl tincidunt sagittis. Aliquam erat volutpat. Curabitur efficitur diam nec scelerisque venenatis. Donec accumsan lacinia justo et mattis. Maecenas eu faucibus odio. Morbi venenatis dui turpis, vel fermentum lacus vehicula id. Suspendisse potenti.",
  likes: Math.floor(Math.random() * 100),
  dislikes: Math.floor(Math.random() * 100),
};

auxCliente.post("/questions/5f6109f2fb6bc302f3742bd8/comments", auxComment, (res) => {
  console.log(res);
});

//auxCliente.post("/questions", auxPost, (res) => {
//  console.log(res);
//});

/*
var clienteGitHub = new Cliente("api.github.com", 443, "https");

console.log(clienteGitHub);

clienteGitHub.autentificarBasic("nockzblack", "spreadMyMoto18");
// autentificar nuestro cliente
//clienteGitHub.get("/users/nockzblack", (response) => {
//  console.log(response);
//});

clienteGitHub.post(
  "/repos/jorgevgut/uuid/issues/2/comments",
  {
    body: "Un muy buen cursooo 10/10",
  },
  (response) => console.log(response)
);

*/
