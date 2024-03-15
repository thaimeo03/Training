interface IProductRepository {
  addProduct(product: Product): void
  updateProduct(product: Product): void
  deleteProduct(id: string): void
  queryProducts(name: string): Product[]
}

interface IProductEditable {
  updateProduct(product: Product): void
}

interface IProductQueryable {
  queryProducts(): Product[]
}

class Product {
  id: string
  name: string
  price: number
  description: string

  constructor({id, name, price, description}: {id: string, name: string, price: number, description: string}) {
    this.id = id
    this.name = name
    this.price = price
    this.description = description
  }
}

class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = []

  addProduct(product: Product): void {
    this.products.push(product)
  }
  deleteProduct(id: string): void {
    const index = this.products.findIndex(product => product.id === id)
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0]
    }
    else {
      console.log(`Product with ID ${id} not found.`)
    }
  }
  updateProduct(product: Product): void {
    const index = this.products.findIndex(prod => prod.id === product.id)
    if (index !== -1) {
      this.products[index] = product
    }
    else {
      console.log(`Product with ID ${product.id} not found.`)
    }
  }

  queryProducts(name: string): Product[] {
    return this.products.filter(product => product.name === name)
  }
}

class ProductManager {
  constructor(private repository: IProductRepository) {} 

  addProduct(product: Product) {
    this.repository.addProduct(product)
  }

  updateProduct(product: Product) {
    this.updateProduct(product)
  }

  deleteProduct(id: string) {
    this.repository.deleteProduct(id)
  }
}

class ProductEditable implements IProductEditable {

  constructor(private repository: IProductRepository) {}

  updateProduct(product: Product) {
    this.repository.updateProduct(product)
  }
}

// class ProductQueryable implements IProductQueryable {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   constructor(private repository: IProductRepository) {}

//   queryProducts(): Product[] {
//     return this.repository.queryProducts()
//   }
// }

const productRepository = new InMemoryProductRepository()
const productManager = new ProductManager(productRepository)
const productEditable = new ProductEditable(productRepository)

const product_1 = new Product({
  id: '1',
  name: 'Product 1',
  price: 100,
  description: 'Product 1 description'
})

productManager.addProduct(product_1)