export default abstract class MegaRouter {
    private router;

    protected constructor(router) {
        this.router = router;
    }

    get(route, controller): void{
        this.router.get(route, controller);
    }

    post(route, controller): void {
        this.router.post(route, controller);
    }

    put(route, controller): void{
        this.router.put(route, controller);
    }

    delete(route, controller): void {
        this.router.delete(route, controller);
    }
}