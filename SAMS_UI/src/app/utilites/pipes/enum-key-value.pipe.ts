import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumKeyValue'
})
export class EnumKeyValuePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    value = value || {};
    const keys = Object.getOwnPropertyNames(value);

    const results = Object.keys(value).map(key => {
      console.log(key);
      console.log(value[key]);
      return { key: key, value: value[key] };
    });
    return;
  }

}
