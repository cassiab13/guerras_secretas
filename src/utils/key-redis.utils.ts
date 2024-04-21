
export class KeyRedis {

    public static findPage(url: string, skip: number, pageSize: number): string {
        return `${url}-${skip}-${pageSize}`;
    }

}