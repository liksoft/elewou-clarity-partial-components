import { GenericSerializaleSerializer, UndecoratedSerializer } from 'src/app/lib/core/built-value/core/js/serializer';

export class DossierType {

  id: string = undefined;
  label: string = undefined;
  regimeId: string | number = undefined;

  static builder = () => new GenericSerializaleSerializer(DossierType, new UndecoratedSerializer());

  static getJsonableProperties(): { [index: string]: keyof DossierType } | { [index: string]: any } {
    return {
      id: 'id',
      label: 'label',
      regimeId: 'regimeId'
    } as { [index: string]: keyof DossierType } | { [index: string]: any };
  }
}
