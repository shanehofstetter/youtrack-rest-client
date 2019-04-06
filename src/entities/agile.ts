import { ReducedProject, ReducedProjectImpl } from "./project";
import { ReducedUser, ReducedUserImpl } from "./user";
import { ReducedSprint, ReducedSprintImpl } from "./sprint";

export class ReducedAgileImpl {
    id?: string = '';
    name?: string = '';
    owner?: ReducedUser = new ReducedUserImpl();
    projects?: ReducedProject[] = [new ReducedProjectImpl()];
    sprints?: ReducedSprint[] = [new ReducedSprintImpl()];
    currentSprint?: ReducedSprint = new ReducedSprintImpl();
}

export class AgileImpl extends ReducedAgileImpl {
    orphansAtTheTop?: boolean = false;
    hideOrphansSwimlane?: boolean = false;
}

export interface ReducedAgile extends ReducedAgileImpl {
}

export interface Agile extends AgileImpl {
}

export interface NewAgile extends Agile {
    projects: [{ id: string }];
    name: string;
}

export interface UpdateAgile extends Agile {
    projects?: [{ id: string }];
    id: string;
}
