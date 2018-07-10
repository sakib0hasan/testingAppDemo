import {Pipe, PipeTransform, Injectable} from "@angular/core";
import {isUndefined} from "util";

@Pipe({
    name: 'CommonTableFilter'
})

@Injectable()
export class CommonFilterPipe implements PipeTransform {

    transform(items: any[], value: string, ignores: any[]){

        if(!ignores)
            ignores = []

        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }

        return items.filter(function (item) {
            let flag = false;
            let keys = Object.keys(item);

            keys = keys.filter((key) => {
                let f = ignores.filter((ignore) => {
                    return ignore === key;
                });
                return !f.length;
            });

            keys.forEach(function (key) {
                flag = flag || item[key].toLowerCase().includes(value.toLowerCase());
            });
            return flag;
        });
    }

}
