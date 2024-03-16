interface IBehavior {
  shout(): void
}

interface IAnimalRepository {
  addAnimal(animal: Animal): void
  getAnimals(): Animal[]
}

class Animal implements IBehavior {
  private name: string
  private sound: string
  
  constructor({name, sound}: {name: string, sound: string}) {
    this.name = name
    this.sound = sound
  }

  shout(): void {
    console.log(this.sound);
  }
}

class AnimalRepository implements IAnimalRepository {
  private animals: Animal[] = []

  addAnimal(animal: Animal): void {
    this.animals.push(animal)
  }

  getAnimals(): Animal[] {
    return this.animals
  }
}

class Farm {
  constructor(private animalRepository: AnimalRepository) {}

  addAnimal(animal: Animal) {
    this.animalRepository.addAnimal(animal)
  }

  getAnimals(): Animal[] {
    return this.animalRepository.getAnimals()
  }
}

class Cat extends Animal {
  constructor({name, sound}: {name: string, sound: string}) {
    super({name, sound})
  }
}

class Dog extends Animal {
  constructor({name, sound}: {name: string, sound: string}) {
    super({name, sound})
  }
}

export const animalMain = () => {
  const animalRepository = new AnimalRepository()
  const farm_1 = new Farm(animalRepository)

  const cat_1 = new Cat({name: "Mee", sound: "Meo"})
  const dog_1 = new Dog({name: "Juu", sound: "Grw"})

  farm_1.addAnimal(cat_1)
  farm_1.addAnimal(dog_1)

  farm_1.getAnimals().forEach(animal => {
    animal.shout()
  })
}