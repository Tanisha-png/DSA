/*
Basic - 
Class and Object
1. Inheritance - Single Inheritance , Muliple Inheritance , Multi level inheritance , Hybrid , Hierarchical Inheritance
2. Polymorphism - Compile time and Run time polymorphism 
3. Encapsulation
4. Abstraction
*/

/* ===========================================================
   1. INHERITANCE
   ===========================================================

   Definition:
   Inheritance allows one class to reuse the properties and
   methods of another class.

   Real world example:
   A Dog is an Animal.
*/

// ---------------------------
// Single Inheritance
// ---------------------------

// Parent Class 
class Animal {
    // Method
    eat() {
        console.log("Animal is eating");
    }
}
// Child Class
class Dog extends Animal {
    bark() {
        console.log("Dog is barking");
    }
}

// Creating a new Object
const dog = new Dog();
const dog1 = new Dog();
dog.eat(); // Inherited from Animal
dog.bark();


/*
Output:
Animal is eating
Dog is barking
*/

// ---------------------------
// Multilevel Inheritance
// ---------------------------
// Animal - Dog - Puppy 

class Puppy extends Dog {
    play() {
        console.log("Puppy is playing");
    }
}

const puppy = new Puppy();

puppy.eat();   //from Animal 
puppy.bark();  // From Dog 
puppy.play();   // From Puppy

/*
Output:
Animal is eating
Dog is barking
Puppy is playing
*/

// ---------------------------
// Hierarchical Inheritance
// ---------------------------
/*
A                        Animal 
B                   Dog          Cat
C

*/

class Cat extends Animal {
    meow() {
        console.log("Cat is meowing");
    }
}

const cat = new Cat();

cat.eat();
cat.meow();

/*
Output:
Animal is eating
Cat is meowing
*/

// ---------------------------
// Multiple Inheritance
// ---------------------------

/*
JavaScript classes do NOT support:

class Child extends Father, Mother {}

Instead, composition or mixins are used.
*/

const canDrive = {
    drive() {
        console.log("Driving");
    },
};

const canCook = {
    cook() {
        console.log("Cooking");
    },
};

class Person { }

Object.assign(Person.prototype, canDrive, canCook);

const person = new Person();

person.drive();
person.cook();

/*
Output:
Driving
Cooking
*/

// ---------------------------
// Hybrid Inheritance
// ---------------------------

class Fish extends Animal { }

const canSwim = {
    swim() {
        console.log("Swimming");
    },
};

Object.assign(Fish.prototype, canSwim);

const fish = new Fish();

fish.eat();
fish.swim();

/*
Output:
Animal is eating
Swimming
*/

/* ===========================================================
   2. POLYMORPHISM
   ===========================================================

   Definition:
   One method name can have different behaviors depending on
   which object calls it.

   Real world example:
   makeSound()

   Dog -> Woof
   Cat -> Meow
*/

class AnimalSound {
    makeSound() {
        console.log("Some animal sound");
    }
}

class DogSound extends AnimalSound {
    makeSound() {
        console.log("Woof");
    }
}

class CatSound extends AnimalSound {
    makeSound() {
        console.log("Meow");
    }
}

const animalSound = new AnimalSound();
const dogSound = new DogSound();
const catSound = new CatSound();

animalSound.makeSound();
dogSound.makeSound();
catSound.makeSound();

/*
Output:
Some animal sound
Woof
Meow
*/

/*
Compile time polymorphism (method overloading)
is NOT supported in JavaScript.

Instead, we usually use optional parameters
or the rest operator.
*/


class Calculator {
    add(...numbers) {
        let sum = 0;

        for (const number of numbers) {
            sum += number;
        }

        return sum;
    }
}

const calculator = new Calculator();

console.log(calculator.add(2, 3));
console.log(calculator.add(2, 3, 4));
console.log(calculator.add(2, 3, 4, 5));

/*
Output:
5
9
14
*/

/* ===========================================================
   3. ENCAPSULATION
   ===========================================================

   Definition:
   Keep data private and provide controlled access using methods.

   Real world example:
   ATM

   You cannot directly modify your balance.
   You use Deposit or Withdraw options.
*/

class BankAccount {
    #balance = 1000;

    getBalance() {
        return this.#balance;
    }

    deposit(amount) {
        this.#balance += amount;
    }
}

const account = new BankAccount();

console.log(account.getBalance());

account.deposit(500);

console.log(account.getBalance());

/*
Output:
1000
1500
*/

// Direct access is NOT allowed
// console.log(account.#balance);

/* ===========================================================
   4. ABSTRACTION
   ===========================================================

   Definition:
   Show only what is necessary and hide internal implementation.

   Real world example:
   You press the Start button in a car.
   You do not need to know how the engine starts.
*/

class Car {
    start() {
        this.#checkBattery();
        this.#startEngine();

        console.log("Car is ready to drive");
    }

    #checkBattery() {
        console.log("Checking battery...");
    }

    #startEngine() {
        console.log("Starting engine...");
    }
}

const myCar = new Car();

myCar.start();

/*
Output:
Checking battery...
Starting engine...
Car is ready to drive
*/

// Hidden method
// myCar.#checkBattery();

/* ===========================================================
   QUICK REVISION
   ===========================================================

   Inheritance
   -----------
   Child class reuses code from parent class.

   Example:
   Dog extends Animal

   Polymorphism
   ------------
   Same method name, different behavior.

   Example:
   makeSound()
   Dog -> Woof
   Cat -> Meow

   Encapsulation
   -------------
   Hide data and allow controlled access.

   Example:
   #balance accessed using getBalance() and deposit()

   Abstraction
   -----------
   Hide internal implementation and expose only what users need.

   Example:
   car.start()
   User does not know how the engine starts internally.
*/