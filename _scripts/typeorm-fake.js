"use strict";
function Column(typeOrOptions, options) {
    return function (object, propertyName) { };
}
exports.Column = Column;
function CreateDateColumn(options) {
    return function (object, propertyName) { };
}
exports.CreateDateColumn = CreateDateColumn;
function DiscriminatorColumn(discriminatorOptions) {
    return function (target) { };
}
exports.DiscriminatorColumn = DiscriminatorColumn;
function PrimaryGeneratedColumn(options) {
    return function (object, propertyName) { };
}
exports.PrimaryGeneratedColumn = PrimaryGeneratedColumn;
function PrimaryColumn(typeOrOptions, options) {
    return function (object, propertyName) { };
}
exports.PrimaryColumn = PrimaryColumn;
function UpdateDateColumn(options) {
    return function (object, propertyName) { };
}
exports.UpdateDateColumn = UpdateDateColumn;
function VersionColumn(options) {
    return function (object, propertyName) { };
}
exports.VersionColumn = VersionColumn;
/* typeorm/src/decorator/listeners/ */
function AfterInsert() {
    return function (object, propertyName) { };
}
exports.AfterInsert = AfterInsert;
function AfterLoad() {
    return function (object, propertyName) { };
}
exports.AfterLoad = AfterLoad;
function AfterRemove() {
    return function (object, propertyName) { };
}
exports.AfterRemove = AfterRemove;
function AfterUpdate() {
    return function (object, propertyName) { };
}
exports.AfterUpdate = AfterUpdate;
function BeforeInsert() {
    return function (object, propertyName) { };
}
exports.BeforeInsert = BeforeInsert;
function BeforeRemove() {
    return function (object, propertyName) { };
}
exports.BeforeRemove = BeforeRemove;
function BeforeUpdate() {
    return function (object, propertyName) { };
}
exports.BeforeUpdate = BeforeUpdate;
function EventSubscriber() {
    return function (target) { };
}
exports.EventSubscriber = EventSubscriber;
/* typeorm/src/decorator/options/ */
function JoinColumn(options) {
    return function (object, propertyName) { };
}
exports.JoinColumn = JoinColumn;
function JoinTable(options) {
    return function (object, propertyName) { };
}
exports.JoinTable = JoinTable;
function ManyToMany(typeFunction, inverseSideOrOptions, options) {
    return function (object, propertyName) { };
}
exports.ManyToMany = ManyToMany;
function ManyToOne(typeFunction, inverseSideOrOptions, options) {
    return function (object, propertyName) { };
}
exports.ManyToOne = ManyToOne;
function OneToMany(typeFunction, inverseSideOrOptions, options) {
    return function (object, propertyName) { };
}
exports.OneToMany = OneToMany;
function OneToOne(typeFunction, inverseSideOrOptions, options) {
    return function (object, propertyName) { };
}
exports.OneToOne = OneToOne;
function RelationCount(relation) {
    return function (object, propertyName) { };
}
exports.RelationCount = RelationCount;
function RelationId(relation) {
    return function (object, propertyName) { };
}
exports.RelationId = RelationId;
/* typeorm/src/decorator/tables/ */
function AbstractTable() {
    return function (target) { };
}
exports.AbstractTable = AbstractTable;
function ClassTableChild(tableName, options) {
    return function (target) { };
}
exports.ClassTableChild = ClassTableChild;
function ClosureTable(name, options) {
    return function (target) { };
}
exports.ClosureTable = ClosureTable;
function EmbeddableTable() {
    return function (target) { };
}
exports.EmbeddableTable = EmbeddableTable;
function SingleTableChild() {
    return function (target) { };
}
exports.SingleTableChild = SingleTableChild;
function Table(name, options) {
    return function (target) { };
}
exports.Table = Table;
function TableInheritance(type) {
    return function (target) { };
}
exports.TableInheritance = TableInheritance;
/* typeorm/src/decorator/tree/ */
function TreeChildren(options) {
    return function (object, propertyName) { };
}
exports.TreeChildren = TreeChildren;
function TreeLevelColumn() {
    return function (object, propertyName) { };
}
exports.TreeLevelColumn = TreeLevelColumn;
function TreeParent(options) {
    return function (object, propertyName) { };
}
exports.TreeParent = TreeParent;
/* typeorm/src/decorator/ */
function DiscriminatorValue(value) {
    return function (target) { };
}
exports.DiscriminatorValue = DiscriminatorValue;
function Embedded(typeFunction) {
    return function (object, propertyName) { };
}
exports.Embedded = Embedded;
function Index(nameOrFields, maybeFieldsOrOptions, maybeOptions) {
    return function (clsOrObject, propertyName) { };
}
exports.Index = Index;
function NamingStrategy(name) {
    return function (target) { };
}
exports.NamingStrategy = NamingStrategy;
