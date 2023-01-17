export class WorkOrder {
    id: number | undefined;
    name: string = '';
    status: string = '';
    get isNew(): boolean {
        return this.id === undefined;
    }

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.name) this.name = initializer.name;
        if (initializer.status) this.status = initializer.status;
    }
}

