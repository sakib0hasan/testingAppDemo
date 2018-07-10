import {Pipe, PipeTransform, Injectable} from "@angular/core";

@Pipe({
    name: 'TestLibraryFilter'
})

@Injectable()
export class FilterPipe implements PipeTransform {

    transform(items: any[], value: string): any[] {

        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }

        return items.filter(singleItem =>
            //singleItem.getKey()
            singleItem.projectType.toLowerCase().includes(value.toLowerCase()) ||
            singleItem.libraryName.toLowerCase().includes(value.toLowerCase()) ||
            singleItem.scriptName.toLowerCase().includes(value.toLowerCase()) ||
            singleItem.requiredParams.toLowerCase().includes(value.toLowerCase())
        );
    }

}
