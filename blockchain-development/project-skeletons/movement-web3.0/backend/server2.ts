import { opine } from "./deps.ts";

const app = opine();

app.get("/", function (req, res) {
    res.send("democracy.earth");
});

const port = 3024

app.listen(port, () => console.log(`server has started on http://localhost:${port} 🚀`))
