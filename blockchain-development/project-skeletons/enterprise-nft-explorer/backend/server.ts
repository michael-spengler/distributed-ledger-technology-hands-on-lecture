
import { opine, serveStatic } from "./deps.ts";
import { opineCors } from "./deps.ts";

const app = opine();
const pathToAssets = `${Deno.cwd()}/frontend/docs`
const pathToIndexHTML = `${pathToAssets}/index.html`

app.use(serveStatic(pathToAssets))
app.use(opineCors())

app.get("/", function (req, res) {
    res.sendFile(pathToIndexHTML);
});

const port = 3024

app.listen(port, () => console.log(`server has started on http://localhost:${port} 🚀`))

