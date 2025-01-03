
interface Category {
    category: string;
  }
  
  interface Menus{
    name: string;
    Vendor: {
        name: string;
      }
  }
   
  
  export interface MenuItem {
    id: number,
    category_id: number,
    menu_id: number,
    name: string,
    description: string | undefined,
    price: number,
    image_url: string | undefined,
    availability: boolean ,
    is_active: boolean  ,
    Menu: Menus; // Nested Menu object
    Category: Category; // Nested Category object
    
    }