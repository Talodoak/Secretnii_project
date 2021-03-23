"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MegaRouter {
    constructor(router) {
        this.router = router;
    }
    get(route, controller) {
        this.router.get(route, controller);
    }
    post(route, controller) {
        this.router.post(route, controller);
    }
    put(route, controller) {
        this.router.put(route, controller);
    }
    delete(route, controller) {
        this.router.delete(route, controller);
    }
}
exports.default = MegaRouter;
//# sourceMappingURL=mega.router.js.map