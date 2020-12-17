import { ISerializableBuilder, ISerializer } from 'src/app/lib/built-value/contracts/serializers';
import { TypeBuilder, buildJSObjectType, rebuildJSObjectType } from 'src/app/lib/built-value/contracts/type';
import { ObjectSerializer, JsonProperty } from 'src/app/lib/built-value/core/serializers';

export class RessourceAssignmentBuilder implements ISerializableBuilder<RessourceAssignment>, TypeBuilder<RessourceAssignment> {
  serializer: ISerializer;

  /**
   *
   */
  constructor() {
    this.serializer = new ObjectSerializer();
  }

  /**
   * @inheritdoc
   */
  fromSerialized(serialized: any): RessourceAssignment {
    return this.serializer.deserialize(RessourceAssignment, serialized);
  }

  /**
   * @inheritdoc
   */
  toSerialized = (value: RessourceAssignment) => {
    return this.serializer.serialize(RessourceAssignment, value);
  }

  /**
   * @inheritdoc
   */
  build(bluePrint: new () => RessourceAssignment, params: object): RessourceAssignment {
    return buildJSObjectType(bluePrint, params);
  }

  /**
   * @inheritdoc
   */
  rebuild(instance: RessourceAssignment, params: object | RessourceAssignment): RessourceAssignment {
    return rebuildJSObjectType(instance, params);
  }

}


export class RessourceAssignment {

  @JsonProperty('id')
  id: number = undefined;
  @JsonProperty('ressource_id')
  ressourceID: number = undefined;
  @JsonProperty('assigned_by')
  assignedBy: number = undefined;
  @JsonProperty('assigned_to')
  assignedTo: number = undefined;

  /**
   * @param data Instance initializer of object type
   */
  constructor() { }

  /**
   * @description Calls to get the builder provider of the current class|type
   */
  static builder(): TypeBuilder<RessourceAssignment> | ISerializableBuilder<RessourceAssignment> {
    return new RessourceAssignmentBuilder();
  }

  /**
   * @inheritdoc
   */
  formViewModelBindings(): { [index: string]: any } {
    return (RessourceAssignment.builder() as ISerializableBuilder<RessourceAssignment>).toSerialized(this);
  }
}
