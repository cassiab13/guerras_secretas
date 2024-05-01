import { Find } from "./find.utils";

export class KeyRedis {

    public static findPage(url: string, find: Find): string {
        console.log(`${url}-${JSON.stringify(find)}`);
        return `${url}-${JSON.stringify(find)}`;
    }

}