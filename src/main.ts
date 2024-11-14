type Route = {
    fileAsText: string;
    contentType: string;
}

const routes: Record<string, Route> = {
    "/": {
        fileAsText: Deno.readTextFileSync("./src/index.html"),
        contentType: "text/html; charset=utf-8",
    },
    "/style.css": {
        fileAsText: Deno.readTextFileSync("./src/style.css"),
        contentType: "text/css; charset=utf-8",
    },
    "/script.js": {
        fileAsText: Deno.readTextFileSync("./src/script.js"),
        contentType: "application/javascript; charset=utf-8",
    },
}

function handler(request: Request) {

    const path = new URL(request.url).pathname

    const requestedFile = routes[path]

    if (requestedFile) {
        return new Response(requestedFile.fileAsText, {
            status: 200,
            headers: { "content-type": requestedFile.contentType },
        });
    }


    return new Response(`There is nothing in "${path}" route`, {
        status: 404,
        headers: { "content-type": "text/plain; charset=utf-8" },
    });
}

Deno.serve({ port: 7500 }, handler);
