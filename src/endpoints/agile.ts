import {BaseEndpoint} from "./base";
import {ReducedAgileImpl, Agile, AgileImpl, ReducedAgile, NewAgile, UpdateAgile} from "..";
import {PaginationOptions} from "../options/pagination_options";

export const AgilePaths = {
    agiles: '/agiles',
    agile: '/agiles/{agileId}'
};

export class AgileEndpoint extends BaseEndpoint {

    public all(paginationOptions: PaginationOptions = {}): Promise<ReducedAgile[]> {
        return this.getResourceWithFields<ReducedAgile[]>(AgilePaths.agiles, ReducedAgileImpl, {params: paginationOptions});
    }

    public byId(agileId: string): Promise<Agile> {
        return this.getResourceWithFields<Agile>(this.format(AgilePaths.agile, {agileId}), AgileImpl);
    }

    public delete(agileId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(AgilePaths.agile, {agileId})));
    }

    public create(agile: NewAgile): Promise<Agile> {
        return this.postResourceWithFields<Agile>(AgilePaths.agiles, AgileImpl, {
            data: agile
        });
    }

    public update(agile: UpdateAgile): Promise<Agile> {
        return this.postResourceWithFields<Agile>(this.format(AgilePaths.agile, {agileId: agile.id}), AgileImpl, {
            data: agile
        });
    }
}
