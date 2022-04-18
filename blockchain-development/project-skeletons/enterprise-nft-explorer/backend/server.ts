
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

const port = Deno.args[0]

if (Deno.args[0] === '443') {

    // const cert = await Deno.readTextFile(`/etc/letsencrypt/live/openforce.de/fullchain.pem`)
    // const key = await Deno.readTextFile(`/etc/letsencrypt/live/openforce.de/privkey.pem`)

    const options = {
        port: Number(Deno.args[0]),
        certFile: "/etc/letsencrypt/live/enterprise-nft.org/fullchain.pem",
        keyFile: "/etc/letsencrypt/live/enterprise-nft.org/privkey.pem"
    }


    app.listen(options, () => console.log(`server has started on http://localhost:${Deno.args[0]} 🚀`))

} else {

    // mongodbConnectionString = `mongodb://${mongoUser}:${mongoPW}@localhost:27017`
    app.listen(Number(Deno.args[0]), () => console.log(`server has started on http://localhost:${Deno.args[0]} 🚀`))

}
