
interface Category {
    category: string;
  }
  export interface Vendor {
    name: string;
  }
  export interface  Menus {
    name: string;
    vendor_id: string;
    Vendor : Vendor;
  
  }
 
  export interface MenuItem {
    id: number,
    category_id: number,
    name: string,
    description: string | undefined,
    price: number,
    image_url: string | undefined,
    availability: boolean ,
    is_active: boolean  ,
    Menus: Menus; // Nested Menu object
    Category: Category; // Nested Category object
    
    }