// Modules
import { propOr, pathOr } from 'ramda';

// Typings
import { LabelValueI } from '../typings/data-structures.typings';

/**
 * Field getter return type. It returns the field
 * type if the user has passed the `entity` object or
 * `defaultValue` to the getter function. Otherwise, its return
 * type is `undefined`
 */
type FieldGetterReturnT<
  ReceivedEntity extends object | undefined | null,
  DefaultValue extends FieldType | undefined,
  FieldType
> = ReceivedEntity extends object ? FieldType : DefaultValue extends FieldType ? DefaultValue : undefined;

/**
 * Entity field getter generator. It generates a getter for
 * the given field of the given entity type.
 */
export const createEntityFieldGetter = <Entity extends object, FieldName extends keyof Entity>(
  fieldName: FieldName
) => <ReceivedEntity extends Entity | undefined | null, DefaultValue extends Entity[FieldName] | undefined = undefined>(
  entity: ReceivedEntity,
  defaultValue?: DefaultValue
): FieldGetterReturnT<ReceivedEntity, DefaultValue, Entity[FieldName]> => {
  // @ts-expect-error
  return propOr(defaultValue, fieldName, entity);
};

/**
 * Entity path getter generator. It generates a getter for
 * the given path field of the given entity type.
 *
 * It's not typed the way I want it to, but due to lack
 * of time, I've decided to do it later.
 *
 * TODO: type it to make it work with generic paths
 */
export const createEntityPathGetter = <Entity extends object, ReturnType>(path: string[]) => <
  ReceivedEntity extends Entity | undefined | null,
  DefaultValue extends ReturnType | undefined = undefined
>(
  entity: ReceivedEntity,
  defaultValue?: DefaultValue
): FieldGetterReturnT<ReceivedEntity, DefaultValue, ReturnType> => {
  // @ts-expect-error
  return pathOr(defaultValue, path, entity);
};

/**
 * `value` field getter
 */
export const getValue = <V = number>(option?: LabelValueI<V, unknown>, defaultValue?: V): V | undefined =>
  pathOr(defaultValue, ['value'], option);

/**
 * `label` field getter
 */
export const getLabel = <L = string>(option?: LabelValueI<unknown, L>, defaultValue?: L): L | undefined =>
  pathOr(defaultValue, ['label'], option);
