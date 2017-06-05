/* typeorm/src/decorator/columns/ */
export function Column(): Function;
export function Column(type: any): Function;
export function Column(options: any): Function;
export function Column(type: any, options: any): Function;
export function Column(typeOrOptions?: any, options?: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function CreateDateColumn(options?: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function DiscriminatorColumn(discriminatorOptions: any): Function {
  return function (target: Function) {};
}

export function PrimaryGeneratedColumn(options?: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function PrimaryColumn(options?: any): Function;
export function PrimaryColumn(type?: any, options?: any): Function;
export function PrimaryColumn(typeOrOptions?: any, options?: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function UpdateDateColumn(options?: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function VersionColumn(options?: any): Function {
  return function (object: Object, propertyName: string) {};
}


/* typeorm/src/decorator/listeners/ */
export function AfterInsert() {
  return function (object: Object, propertyName: string) {};
}

export function AfterLoad() {
  return function (object: Object, propertyName: string) {};
}

export function AfterRemove() {
  return function (object: Object, propertyName: string) {};
}

export function AfterUpdate() {
  return function (object: Object, propertyName: string) {};
}

export function BeforeInsert() {
  return function (object: Object, propertyName: string) {};
}

export function BeforeRemove() {
  return function (object: Object, propertyName: string) {};
}

export function BeforeUpdate() {
  return function (object: Object, propertyName: string) {};
}

export function EventSubscriber() {
  return function (target: Function) {};
}


/* typeorm/src/decorator/options/ */
export function JoinColumn(options?: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function JoinTable(options?: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function ManyToMany<T>(typeFunction: any, options?: any): Function;
export function ManyToMany<T>(typeFunction: any,
                              inverseSide?: any,
                              options?: any): Function;
export function ManyToMany<T>(typeFunction: any,
                              inverseSideOrOptions?: any,
                              options?: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function ManyToOne<T>(typeFunction: any, options?: any): Function;
export function ManyToOne<T>(typeFunction: any,
                             inverseSide?: any,
                             options?: any): Function;
export function ManyToOne<T>(typeFunction: any,
                              inverseSideOrOptions?: any,
                              options?: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function OneToMany<T>(typeFunction: any,
                             inverseSide: any,
                             options?: any): Function;
export function OneToMany<T>(typeFunction: any,
                             inverseSideOrOptions: any,
                             options?: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function OneToOne<T>(typeFunction: any, options?: any): Function;
export function OneToOne<T>(typeFunction: any,
                            inverseSide?: any,
                            options?: any): Function;
export function OneToOne<T>(typeFunction: any,
                            inverseSideOrOptions?: any,
                            options?: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function RelationCount<T>(relation: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function RelationId<T>(relation: any): Function {
  return function (object: Object, propertyName: string) {};
}


/* typeorm/src/decorator/tables/ */
export function AbstractTable() {
  return function (target: Function) {};
}

export function ClassTableChild(tableName?: any, options?: any) {
  return function (target: Function) {};
}

export function ClosureTable(name?: any, options?: any) {
  return function (target: Function) {};
}

export function EmbeddableTable(): Function {
  return function (target: Function) {};
}

export function SingleTableChild() {
  return function (target: Function) {};
}

export function Table(name?: any, options?: any) {
  return function (target: Function) {};
}

export function TableInheritance(type: any) {
  return function (target: Function) {};
}


/* typeorm/src/decorator/tree/ */
export function TreeChildren(options?: any): Function {
  return function (object: Object, propertyName: string) {};
}

export function TreeLevelColumn(): Function {
  return function (object: Object, propertyName: string) {};
}

export function TreeParent(options?: any): Function {
  return function (object: Object, propertyName: string) {};
}


/* typeorm/src/decorator/ */
export function DiscriminatorValue(value: any): Function {
  return function (target: Function) {};
}
export function Embedded<T>(typeFunction: any) {
  return function (object: Object, propertyName: string) {};
}

export function Index(options?: any): Function;
export function Index(name: any, options?: any): Function;
export function Index(name: any, fields: any, options?: any): Function;
export function Index(fields: any, options?: any): Function;
export function Index(fields: any, options?: any): Function;
export function Index(name: any, fields: any, options?: any): Function;
export function Index(nameOrFields: any,
                      maybeFieldsOrOptions?: any,
                      maybeOptions?: any): Function {
  return function (clsOrObject: Function|Object, propertyName?: string) {};
}

export function NamingStrategy(name?: any): Function {
  return function (target: Function) {};
}
