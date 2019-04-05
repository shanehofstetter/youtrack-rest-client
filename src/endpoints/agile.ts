import { BaseEndpoint } from "./base";
import { ReducedAgileImpl, Agile, AgileImpl, ReducedAgile, NewAgile, UpdateAgile } from "..";

export const AgilePaths = {
    agiles: '/agiles',
    agile: '/agile/{agileId}'
}

export class AgileEndpoint extends BaseEndpoint {

    public all(): Promise<ReducedAgile[]> {
        return this.getResourceWithFields<ReducedAgile[]>(AgilePaths.agiles, ReducedAgileImpl);
    }

    public byId(agileId: string): Promise<Agile> {
        return this.getResourceWithFields<Agile>(this.format(AgilePaths.agile, {agileId}), AgileImpl);
    }

    public delete(agileId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(AgilePaths.agile, { agileId })));
    }

    public create(agile: NewAgile): Promise<Agile> {
        return this.postResourceWithFields<Agile>(AgilePaths.agiles, AgileImpl, {
            body: agile
        });
    }

    public update(agile: UpdateAgile): Promise<Agile> {
        return this.postResourceWithFields<Agile>(this.format(AgilePaths.agile, { agileId: agile.id }), AgileImpl, {
            body: agile
        });
    }
}
