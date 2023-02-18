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
class Factory<Key, Instance> {
    private map = new Map<Key, Instance>();
    get(key: Key): Instance {
        return this.map.get(key)!;
    }
    set(key: Key, value: Instance) {
        this.map.set(key, value);
    }
}

const DisplayFactory = new Factory<DisplayInsId, Display>();
DisplayFactory.set(DisplayInsId.computer, new Computer());
DisplayFactory.set(DisplayInsId.phone, new Phone());

const PersonFactory = new Factory<PersonInsId, Person<PersonInsId>>();
PersonFactory.set(PersonInsId.woman, new Woman());
PersonFactory.set(PersonInsId.man, new Man());

/**
 * !优点
 * 工厂模式的思想是隐藏创建实例的细节，减少重复的创建对象的逻辑，
 * 调用者想得到创建的对象，只要知道其唯一标识即可
 * !缺点
 * 没有隐藏工厂创建的逻辑
 * 每次增加一个产品时，都需要增加一个具体类和对象实现工厂，
 * 使得系统中类的个数成倍增加，在一定程度上增加了系统的复杂度，
 * 同时也增加了系统对具体工厂的依赖。这并不是什么好事
 */
function main() {
    const computer = DisplayFactory.get(DisplayInsId.computer);
    const phone = DisplayFactory.get(DisplayInsId.phone);
    computer.print();
    phone.print();

    const woman = PersonFactory.get(PersonInsId.woman);
    const man = PersonFactory.get(PersonInsId.man);
    console.log(woman.sex, man.sex);
}
