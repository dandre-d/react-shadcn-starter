
// interface Category {
//     category: string;
//   }
//   export interface Vendor {
//     name: string;
//   }
//   export interface  Menus {
//     name: string;
//     vendor_id: string;
//     Vendor : Vendor;
  
//   }
 
  export interface MenuItem {
    id: number,
    category_id: number,
    name: string,
    description: string | undefined,
    price: number,
    image_url: string | undefined,
    availability: boolean ,
    is_active: boolean  ,

    category: string,
    menus_name: string,
    menus_start_date: string,
    menus_end_date: string,
    menus_cut_off_time: string,

    menus_vendor_id: number;
    menus_vendor_name : string;

    // Menus: Menus[]; // Nested Menu object
    // Category: Category; // Nested Category object
    
    }