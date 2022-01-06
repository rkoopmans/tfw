import Router from "../../router"

export default function routerify(object: object): Router {
  if (!(object as any).router) {
    Object.defineProperty(object, "router", {
      value: new Router,
    })
  }

  return (object as any).router
}
