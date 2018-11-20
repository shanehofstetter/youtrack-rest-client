import {ProjectImpl} from "../project";
import {MinimalUserImpl, UserImpl} from "../user";
import {generateFields} from "./utils";


export const userFields: string[] = Object.getOwnPropertyNames(new UserImpl());
export const minimalUserFields: string[] = Object.getOwnPropertyNames(new MinimalUserImpl());

export const projectFields: string[] = generateFields(new ProjectImpl());
