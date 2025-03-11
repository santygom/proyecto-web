export default abstract class AbstractCategory {
    protected id: string;
    protected name: string;
    protected description: string;
  
    constructor(categoryInterface: CategoryInterface) {
      this.id = categoryInterface.id;
      this.name = categoryInterface.name;
      this.description = categoryInterface.description;
    }
  
    public abstract isNull(): boolean;
  
    public getId = (): string => this.id;
    public getName = (): string => this.name;
    public getDescription = (): string => this.description;
  }
  
  export interface CategoryInterface {
    id: string;
    name: string;
    description: string;
  }