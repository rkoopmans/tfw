import { request } from "http";
import { URL } from "url";
export default function proxy(target, { prepend }) {
    const base = target.replace(/\/?$/, "/");
    return async function proxy() {
        const path = this.request.url.slice(prepend ? 1 : this.data.path.length);
        const url = new URL(path, base);
        const options = {
            method: this.request.method,
            headers: this.request.headers,
        };
        const proxy = request(url, options, res => {
            this.response.writeHead(res.statusCode, res.headers);
            res.pipe(this.response, { end: true });
        });
        this.request.pipe(proxy, { end: true });
        return new Promise((resolve, reject) => {
            proxy.on("end", resolve);
            proxy.on("error", reject);
        });
    };
}
//# sourceMappingURL=proxy-handler.js.map