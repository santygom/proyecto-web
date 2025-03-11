// src/product/infrastructure/repository/ProductRepository.ts
import Product from '../../domain/product/Product';
import NullProduct from '../../domain/product/NullProduct';
import ProductRepositoryPort from '../../domain/port/driven/ProductRepositoryPort';
import Category from '../../domain/category/Category';
import Image from '../../domain/image/Image';
import AbstractCategory from '../../domain/category/AbstractCategory';

export default class ProductRepository implements ProductRepositoryPort {
  private products: Product[] = [];
  

  constructor() {
    
    this.initRealProducts();
  }
  

  private initRealProducts(): void {
    // Categorías reales basadas en los tipos de productos
    const categories = [
      new Category({ id: '1', name: 'Aceites Esenciales', description: 'Aceites esenciales naturales para aromaterapia y uso cosmético' }),
      new Category({ id: '2', name: 'Cuidado Facial', description: 'Productos para el cuidado y rejuvenecimiento facial' }),
      new Category({ id: '3', name: 'Cuidado Corporal', description: 'Productos para hidratar y nutrir la piel del cuerpo' }),
      new Category({ id: '4', name: 'Aceites Corporales', description: 'Aceites naturales para el cuidado de la piel' }),
      new Category({ id: '5', name: 'Suplementos', description: 'Suplementos naturales para el bienestar' })
    ];

    // Productos tienda "Buena Vida"
    this.products = [
      new Product({
        id: '1',
        name: 'Aceite esencial de Clavo',
        price: 7.99,
        description: 'El aceite esencial de clavo es conocido por sus increíbles propiedades antimicrobianas, antimicóticas, antisépticas, antivirales, afrodisíacas y estimulantes. Perfecto para utilizar en tus mezclas de Cosmética Natural.',
        category: categories[0] as AbstractCategory,
        stock: 30,
        discount: 0,
        images: [new Image({ id: '1', url: '/images/aceite-clavo.jpg', alt: 'Aceite esencial de Clavo' })],
        inPromotion: false
      }),
      new Product({
        id: '2',
        name: 'Parches de Oro de 24 kt Rejuvenecedores para Contorno de Ojos',
        price: 15.50,
        description: 'Parches de oro de 24 kt rejuvenecedores para contorno de ojos de Natura Siberica. Parches para ojos con efecto rejuvenecedor enriquecidos con oro de 24kt.',
        category: categories[1] as AbstractCategory,
        stock: 50,
        discount: 0,
        images: [new Image({ id: '2', url: '/images/parches-oro.jpg', alt: 'Parches de Oro Rejuvenecedores' })],
        inPromotion: false
      }),
      new Product({
        id: '3',
        name: 'Parches Iluminadores para el Contorno de Ojos',
        price: 15.50,
        description: 'Parches iluminadores para el contorno de ojos de Natura Siberica. 60 Parches para ojos con efecto iluminador que hidratan la piel del contorno.',
        category: categories[1] as AbstractCategory,
        stock: 45,
        discount: 0,
        images: [new Image({ id: '3', url: '/images/parches-iluminadores.jpg', alt: 'Parches Iluminadores' })],
        inPromotion: false
      }),
      new Product({
        id: '4',
        name: 'Parches Supertonificantes para Contorno de Ojos',
        price: 15.50,
        description: 'Parches supertonificantes para contorno de ojos de Natura siberica. Parches para ojos con efecto tonificante que reducen visiblemente los signos de fatiga.',
        category: categories[1] as AbstractCategory,
        stock: 40,
        discount: 0,
        images: [new Image({ id: '4', url: '/images/parches-supertonificantes.jpg', alt: 'Parches Supertonificantes' })],
        inPromotion: false
      }),
      new Product({
        id: '5',
        name: '6 Discos Desmaquillantes de Fibra Natural',
        price: 10.50,
        description: 'Eliminan el maquillaje y limpian el rostro con suavidad. Elaborados en algodón y carbón de bambú. De doble cara y función.',
        category: categories[1] as AbstractCategory,
        stock: 35,
        discount: 0,
        images: [new Image({ id: '5', url: '/images/discos-desmaquillantes.jpg', alt: 'Discos Desmaquillantes' })],
        inPromotion: false
      }),
      new Product({
        id: '6',
        name: 'Aceite anticelulítico de abedul',
        price: 22.90,
        description: 'El extracto de hojas de abedul contiene flavonoides y tanines, los cuales sirven para mantener y conservar el metabolismo y circulación de los líquidos en el cuerpo.',
        category: categories[2] as AbstractCategory,
        stock: 25,
        discount: 0,
        images: [new Image({ id: '6', url: '/images/aceite-abedul.jpg', alt: 'Aceite de Abedul' })],
        inPromotion: false
      }),
      new Product({
        id: '7',
        name: 'Aceite antiinflamatorio S.O.S Rescate',
        price: 12.45,
        description: 'Pequeñas heridas, quemaduras, golpes, cicatrices… ¿Cuántos productos diferentes estás usando para paliar estos accidentes?',
        category: categories[3] as AbstractCategory,
        stock: 30,
        discount: 10,
        images: [new Image({ id: '7', url: '/images/aceite-sos.jpg', alt: 'Aceite SOS Rescate' })],
        inPromotion: true
      }),
      new Product({
        id: '8',
        name: 'Aceite Bucal de Coco Orgánico Premium',
        price: 9.60,
        description: 'Oil Pulling de Dr. Goerg. El aceite bucal de coco orgánico premium de Dr. Goerg es fácil de usar y, gracias a sus ingredientes 100 % naturales.',
        category: categories[3] as AbstractCategory,
        stock: 40,
        discount: 5,
        images: [new Image({ id: '8', url: '/images/aceite-coco.jpg', alt: 'Aceite Bucal de Coco' })],
        inPromotion: true
      }),
      new Product({
        id: '9',
        name: 'Aceite corporal blanco siberiano anticelulítico de Natura Siberica',
        price: 6.95,
        description: 'Este producto te trae lo mejor para el cuidado de tu cuerpo gracias a las propiedades de la cera blanca de abeja, los aceites naturales y la schizandra.',
        category: categories[3] as AbstractCategory,
        stock: 20,
        discount: 15,
        images: [new Image({ id: '9', url: '/images/aceite-siberiano.jpg', alt: 'Aceite Siberiano' })],
        inPromotion: true
      }),
      new Product({
        id: '10',
        name: 'Aceite corporal Body Sculptor',
        price: 73.70,
        description: 'Aceite corporal que moldea el cuerpo y esculpe la silueta de forma natural y eficaz. Previene el exceso de peso y la retención de líquidos.',
        category: categories[3] as AbstractCategory,
        stock: 15,
        discount: 0,
        images: [new Image({ id: '10', url: '/images/body-sculptor.jpg', alt: 'Body Sculptor' })],
        inPromotion: false
      }),
      new Product({
        id: '11',
        name: 'Aceite corporal de almendras dulces',
        price: 10.45,
        description: 'El Aceite de Almendras dulces es básico para una hidratación y nutrición de la piel. Puedes utilizarlo en todas las partes de tu cuerpo.',
        category: categories[3] as AbstractCategory,
        stock: 50,
        discount: 20,
        images: [new Image({ id: '11', url: '/images/aceite-almendras.jpg', alt: 'Aceite de Almendras' })],
        inPromotion: true
      }),
      new Product({
        id: '12',
        name: 'Aceite corporal de almendras dulces con dosificador 1L',
        price: 14.99,
        description: 'El Aceite de Almendras dulces es básico para una hidratación y nutrición de la piel. Formato grande con dosificador.',
        category: categories[3] as AbstractCategory,
        stock: 30,
        discount: 0,
        images: [new Image({ id: '12', url: '/images/aceite-almendras-1l.jpg', alt: 'Aceite de Almendras 1L' })],
        inPromotion: false
      }),
      new Product({
        id: '13',
        name: 'Aceite corporal de almendras dulces con dosificador 500ml',
        price: 11.55,
        description: 'El Aceite de Almendras dulces es básico para una hidratación y nutrición de la piel. Formato mediano con dosificador.',
        category: categories[3] as AbstractCategory,
        stock: 35,
        discount: 0,
        images: [new Image({ id: '13', url: '/images/aceite-almendras-500ml.jpg', alt: 'Aceite de Almendras 500ml' })],
        inPromotion: false
      }),
      new Product({
        id: '14',
        name: 'Aceite Corporal de Granada',
        price: 22.90,
        description: 'El aceite corporal de granada es de acción antioxidante intensiva que sirve para la regeneración celular, reafirmando y mejorando la elasticidad.',
        category: categories[3] as AbstractCategory,
        stock: 25,
        discount: 0,
        images: [new Image({ id: '14', url: '/images/aceite-granada.jpg', alt: 'Aceite de Granada' })],
        inPromotion: false
      }),
      new Product({
        id: '15',
        name: 'Aceite Corporal de Rosa Mosqueta',
        price: 22.90,
        description: 'La principal acción de la Rosa Mosqueta es la regeneración de la piel y elasticidad, aportando tonicidad a la piel.',
        category: categories[3] as AbstractCategory,
        stock: 30,
        discount: 10,
        images: [new Image({ id: '15', url: '/images/aceite-rosa.jpg', alt: 'Aceite de Rosa Mosqueta' })],
        inPromotion: true
      }),
      new Product({
        id: '16',
        name: 'Aceite corporal Embellecedor del Busto',
        price: 81.70,
        description: 'Aceite corporal empleado para moldear y realzar el busto dándole una apariencia de mayor volumen.',
        category: categories[3] as AbstractCategory,
        stock: 10,
        discount: 0,
        images: [new Image({ id: '16', url: '/images/embellecedor-busto.jpg', alt: 'Embellecedor del Busto' })],
        inPromotion: false
      }),
      new Product({
        id: '17',
        name: 'Aceite corporal Reafirmante de Tejidos',
        price: 60.00,
        description: 'Aceite corporal indispensable para prevenir la pérdida de firmeza de los tejidos y reafirmar las zonas que presentan flacidez.',
        category: categories[3] as AbstractCategory,
        stock: 15,
        discount: 5,
        images: [new Image({ id: '17', url: '/images/reafirmante-tejidos.jpg', alt: 'Reafirmante de Tejidos' })],
        inPromotion: true
      }),
      new Product({
        id: '18',
        name: 'Aceite corporal Reafirmante del Busto',
        price: 81.70,
        description: 'Aceite corporal específico de tratamiento que reafirma eficazmente el seno caído a la vez que hidrata y suaviza la piel devolviéndole su belleza.',
        category: categories[3] as AbstractCategory,
        stock: 10,
        discount: 0,
        images: [new Image({ id: '18', url: '/images/reafirmante-busto.jpg', alt: 'Reafirmante del Busto' })],
        inPromotion: false
      }),
      new Product({
        id: '19',
        name: 'Aceite corporal Reina de Egipto',
        price: 57.30,
        description: 'Aceite corporal de exótica fragancia que nutre en profundidad, combate el envejecimiento cutáneo, regenera y alisa.',
        category: categories[3] as AbstractCategory,
        stock: 20,
        discount: 0,
        images: [new Image({ id: '19', url: '/images/reina-egipto.jpg', alt: 'Reina de Egipto' })],
        inPromotion: false
      }),
      new Product({
        id: '20',
        name: 'Aceite daúrico corporal de Natura Siberica',
        price: 18.95,
        description: 'Relaja tu cuerpo con este fantástico producto con el que podrás disfrutar de momentos únicos. Aceite daúrico corporal es perfecto para pieles secas.',
        category: categories[3] as AbstractCategory,
        stock: 25,
        discount: 15,
        images: [new Image({ id: '20', url: '/images/aceite-daurico.jpg', alt: 'Aceite Daúrico' })],
        inPromotion: true
      }),
      new Product({
        id: '21',
        name: 'Aceite de Aguacate corporal',
        price: 15.00,
        description: 'El aceite de aguacate actúa un bálsamo perfecto para la piel. Destaca por su efecto nutritivo, protector y regenerante.',
        category: categories[3] as AbstractCategory,
        stock: 30,
        discount: 0,
        images: [new Image({ id: '21', url: '/images/aceite-aguacate.jpg', alt: 'Aceite de Aguacate' })],
        inPromotion: false
      }),
      new Product({
        id: '22',
        name: 'Aceite de almendras corporal Bio',
        price: 14.95,
        description: 'Hidrata y nutre tu piel con este aceite de almendras ecológico de primera prensada en frío.',
        category: categories[3] as AbstractCategory,
        stock: 40,
        discount: 0,
        images: [new Image({ id: '22', url: '/images/aceite-almendras-bio.jpg', alt: 'Aceite de Almendras Bio' })],
        inPromotion: false
      }),
      new Product({
        id: '23',
        name: 'Aceite de Argán Bio 30ML',
        price: 12.99,
        description: 'Este aceite vegetal rico en vitaminas y antioxidantes te hará lucir una piel radiante. Formato pequeño.',
        category: categories[3] as AbstractCategory,
        stock: 35,
        discount: 10,
        images: [new Image({ id: '23', url: '/images/aceite-argan-30ml.jpg', alt: 'Aceite de Argán 30ml' })],
        inPromotion: true
      }),
      new Product({
        id: '24',
        name: 'Aceite de Argán Bio 100ML',
        price: 25.95,
        description: 'Este aceite vegetal rico en vitaminas y antioxidantes te hará lucir una piel radiante. Formato grande.',
        category: categories[3] as AbstractCategory,
        stock: 30,
        discount: 5,
        images: [new Image({ id: '24', url: '/images/aceite-argan-100ml.jpg', alt: 'Aceite de Argán 100ml' })],
        inPromotion: true
      }),
      new Product({
        id: '25',
        name: 'Aceite de CBD 5%',
        price: 20.95,
        description: 'Aceite de semillas de cáñamo con CBD al 5%. Adecuado para el uso diario en personas con dolor crónico o de intensidad alta.',
        category: categories[4] as AbstractCategory,
        stock: 20,
        discount: 0,
        images: [new Image({ id: '25', url: '/images/aceite-cbd.jpg', alt: 'Aceite de CBD' })],
        inPromotion: false
      })
    ];
  }

  // Resto de métodos del repositorio sin cambios
  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async findById(id: string): Promise<Product> {
    const product = this.products.find(product => product.getId() === id);
    return product || new NullProduct();
  }

  public async findByCategory(categoryId: string): Promise<Product[]> {
    return this.products.filter(product => product.getCategory().getId() === categoryId);
  }

  public async findProductsInPromotion(): Promise<Product[]> {
    return this.products.filter(product => product.isInPromotion());
  }

  public async searchProducts(term: string): Promise<Product[]> {
    const searchTerm = term.toLowerCase();
    return this.products.filter(product => 
      product.getName().toLowerCase().includes(searchTerm) || 
      product.getDescription().toLowerCase().includes(searchTerm)
    );
  }

  public async save(item: Product): Promise<Product> {
    const newId = (this.products.length + 1).toString();
    const newProduct = new Product({
      ...item,
      id: newId
    } as any);
    
    this.products.push(newProduct);
    return newProduct;
  }

  public async update(id: string, item: Product): Promise<Product | boolean> {
    const index = this.products.findIndex(product => product.getId() === id);
    if (index === -1) {
      return false;
    }
    
    this.products[index] = item;
    return this.products[index];
  }

  public async patch(id: string, item: Partial<Product>): Promise<Product | boolean> {
    const index = this.products.findIndex(product => product.getId() === id);
    if (index === -1) {
        return false;
    }
    this.products[index] = { ...this.products[index], ...item } as Product;
    return this.products[index] ?? false; 
}


  public async delete(id: string): Promise<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.getId() !== id);
    return this.products.length !== initialLength;
  }
}