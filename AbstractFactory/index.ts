export {};
/* ----------实例---------------------- */
interface Display {
    print(): void;
}
enum DisplayInsId {
    computer,
    phone,
}

class Computer implements Display {
    print(): void {
        console.log("Computer");
    }
}

class Phone implements Display {
    print(): void {
        console.log("Phone");
    }
}

enum PersonInsId {
    woman,
    man,
}
interface Person<T> {
    sex: T;
}

class Woman implements Person<PersonInsId> {
    sex = PersonInsId.woman;
}
class Man implements Person<PersonInsId> {
    sex = PersonInsId.man;
}

/* ----------工厂---------------------- */
class RegisterCenter<Key, Value> {
    private map = new Map<Key, Value>();
    get(key: Key): Value {
        return this.map.get(key)!;
    }
    set(key: Key, value: Value) {
        this.map.set(key, value);
    }
}

abstract class AbstractFactory<Key, Instance> {
    private map = new Map<Key, Instance>();
    get(key: Key): Instance {
        throw new Error("Method not implemented.");
    }
    set(key: Key, value: Instance) {
        this.map.set(key, value);
    }
}
enum FactoryId {
    Display,
    Person,
}

class DisplayFactory extends AbstractFactory<DisplayInsId, Display> {}
class PersonFactory extends AbstractFactory<PersonInsId, Person<PersonInsId>> {}

const factories = new RegisterCenter<FactoryId, AbstractFactory<any, any>>();
factories.set(FactoryId.Display, new DisplayFactory());
factories.set(FactoryId.Person, new PersonFactory());
/* --------------------- */
const displayFactory: AbstractFactory<DisplayInsId, Display> = factories.get(
    FactoryId.Display
);
displayFactory.set(DisplayInsId.computer, new Computer());
displayFactory.set(DisplayInsId.phone, new Phone());
/* --------------------- */
const personFactory: AbstractFactory<
    PersonInsId,
    Person<PersonInsId>
> = factories.get(FactoryId.Person);
personFactory.set(PersonInsId.woman, new Woman());
personFactory.set(PersonInsId.man, new Man());

/**
 * !优点
 * 隐藏工厂创建的细节，工厂类型丢失需要自己告诉编译器,也许有更好的解决方式
 * 工厂模式的思想是隐藏创建实例的细节，减少重复的创建对象的逻辑，
 * 调用者想得到创建的对象，只要知道其唯一标识即可
 *
 * !缺点
 * 每次增加一个产品时，都需要增加一个具体类和对象实现工厂，
 * 使得系统中类的个数成倍增加，在一定程度上增加了系统的复杂度，
 * 同时也增加了系统对具体工厂的依赖。这并不是什么好事
 */
function main() {
    const computer = displayFactory.get(DisplayInsId.computer);
    const phone = displayFactory.get(DisplayInsId.phone);
    computer.print();
    phone.print();

    const woman = personFactory.get(PersonInsId.woman);
    const man = personFactory.get(PersonInsId.man);
    console.log(woman.sex, man.sex);
}
