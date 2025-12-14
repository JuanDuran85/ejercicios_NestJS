import { charmander, venusaur } from "./bases/04-injection.ts";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  <h2>Name: ${charmander.name}</h2>
  <h4>Id: ${charmander.id}</h4>
  <p>-------------------------------</p>
  <h2>Name: ${venusaur.name}</h2>
  <h4>Id: ${venusaur.id}</h4>
  </div>
`;
