import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'mobiles',
    name: 'Mobiles',
    nameUrdu: 'موبائلز',
    iconName: 'Smartphone',
    slug: 'mobiles',
    subcategories: [
      {
        id: 'mobile-phones',
        name: 'Mobile Phones',
        nameUrdu: 'موبائل فونز',
        attributes: [
          { name: 'brand', label: 'Brand', labelUrdu: 'برانڈ', type: 'select', options: ['Apple', 'Samsung', 'Xiaomi', 'Vivo', 'Oppo', 'Google Pixel', 'Realme', 'Infinix', 'OnePlus'] },
          { name: 'ptaStatus', label: 'PTA Status', labelUrdu: 'پی ٹی اے تصدیق', type: 'select', options: ['PTA Approved', 'Non-PTA', 'CPID Approved', 'VIP Pass'] },
          { name: 'storage', label: 'Storage', labelUrdu: 'اسٹوریج', type: 'select', options: ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB'] },
          { name: 'batteryHealth', label: 'Battery Health (%)', labelUrdu: 'بیٹری صحت', type: 'number' }
        ]
      },
      {
        id: 'accessories',
        name: 'Accessories',
        nameUrdu: 'لوازمات',
        attributes: [
          { name: 'type', label: 'Accessory Type', labelUrdu: 'قسم', type: 'select', options: ['Chargers & Cables', 'Cases & Covers', 'AirPods & Earbuds', 'Power Banks', 'Screen Protectors'] }
        ]
      },
      {
        id: 'smart-watches',
        name: 'Smart Watches',
        nameUrdu: 'اسمارٹ گھڑیاں',
        attributes: [
          { name: 'brand', label: 'Brand', labelUrdu: 'برانڈ', type: 'select', options: ['Apple Watch', 'Samsung Galaxy Watch', 'Huawei', 'Amazfit', 'Other'] }
        ]
      },
      {
        id: 'tablets',
        name: 'Tablets',
        nameUrdu: 'ٹیبلٹس',
        attributes: [
          { name: 'brand', label: 'Brand', labelUrdu: 'برانڈ', type: 'select', options: ['Apple iPad', 'Samsung Tab', 'Lenovo', 'Amazon Fire'] }
        ]
      }
    ]
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    nameUrdu: 'گاڑیاں',
    iconName: 'Car',
    slug: 'vehicles',
    subcategories: [
      {
        id: 'cars',
        name: 'Cars',
        nameUrdu: 'کاریں',
        attributes: [
          { name: 'make', label: 'Make', labelUrdu: 'میک', type: 'select', options: ['Toyota', 'Honda', 'Suzuki', 'Hyundai', 'KIA', 'MG', 'Changan', 'Mercedes Benz', 'BMW', 'Audi'] },
          { name: 'modelYear', label: 'Year', labelUrdu: 'ماڈل سال', type: 'select', options: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'] },
          { name: 'transmission', label: 'Transmission', labelUrdu: 'ٹرانسمیشن', type: 'select', options: ['Automatic', 'Manual'] },
          { name: 'fuelType', label: 'Fuel Type', labelUrdu: 'ایندھن', type: 'select', options: ['Petrol', 'Hybrid', 'Diesel', 'Electric', 'CNG'] },
          { name: 'mileage', label: 'Mileage (KM)', labelUrdu: 'مائلیج (کلومیٹر)', type: 'number' },
          { name: 'registeredIn', label: 'Registered In', labelUrdu: 'رجسٹرڈ شہر', type: 'select', options: ['Islamabad', 'Lahore', 'Karachi', 'Rawalpindi', 'Peshawar', 'Un-Registered'] }
        ]
      },
      {
        id: 'cars-on-installments',
        name: 'Cars on Installments',
        nameUrdu: 'اقساط پر کاریں',
        attributes: [
          { name: 'downPayment', label: 'Down Payment (PKR)', labelUrdu: 'ابتدائی رقم', type: 'number' },
          { name: 'monthlyInstallment', label: 'Monthly Installment (PKR)', labelUrdu: 'ماہانہ قسط', type: 'number' }
        ]
      },
      {
        id: 'spare-parts',
        name: 'Spare Parts & Accessories',
        nameUrdu: 'اسپیئر پارٹس',
        attributes: [
          { name: 'partType', label: 'Part Type', labelUrdu: 'پارٹ کی قسم', type: 'text' }
        ]
      }
    ]
  },
  {
    id: 'property-sale',
    name: 'Property for Sale',
    nameUrdu: 'جائیداد برائے فروخت',
    iconName: 'Home',
    slug: 'property-for-sale',
    subcategories: [
      {
        id: 'houses',
        name: 'Houses & Villas',
        nameUrdu: 'مکانات اور ولاز',
        attributes: [
          { name: 'areaUnit', label: 'Area Unit', labelUrdu: 'رقبہ کی اکائی', type: 'select', options: ['5 Marla', '7 Marla', '10 Marla', '1 Kanal', '2 Kanal', '120 Sq. Yds', '240 Sq. Yds', '500 Sq. Yds'] },
          { name: 'bedrooms', label: 'Bedrooms', labelUrdu: 'سونے کے کمرے', type: 'select', options: ['2', '3', '4', '5', '6+'] },
          { name: 'bathrooms', label: 'Bathrooms', labelUrdu: 'باتھ رومز', type: 'select', options: ['2', '3', '4', '5', '6+'] },
          { name: 'furnished', label: 'Furnished', labelUrdu: 'فرنشڈ', type: 'select', options: ['Unfurnished', 'Semi-Furnished', 'Furnished'] }
        ]
      },
      {
        id: 'apartments',
        name: 'Apartments & Flats',
        nameUrdu: 'اپارٹمنٹس اور فلیٹس',
        attributes: [
          { name: 'bedrooms', label: 'Bedrooms', labelUrdu: 'کمرے', type: 'select', options: ['Studio', '1 Bed', '2 Bed', '3 Bed', '4 Bed'] },
          { name: 'floor', label: 'Floor Level', labelUrdu: 'منزل', type: 'text' }
        ]
      },
      {
        id: 'plots',
        name: 'Plots & Land',
        nameUrdu: 'پلاٹس اور اراضی',
        attributes: [
          { name: 'plotType', label: 'Type', labelUrdu: 'قسم', type: 'select', options: ['Residential Plot', 'Commercial Plot', 'Agricultural Land', 'Plot File'] },
          { name: 'size', label: 'Size', labelUrdu: 'سائز', type: 'text' }
        ]
      }
    ]
  },
  {
    id: 'property-rent',
    name: 'Property for Rent',
    nameUrdu: 'جائیداد برائے کرایہ',
    iconName: 'Building',
    slug: 'property-for-rent',
    subcategories: [
      {
        id: 'rent-houses',
        name: 'Houses for Rent',
        nameUrdu: 'کرایہ پر مکانات',
        attributes: [
          { name: 'areaUnit', label: 'Area Unit', labelUrdu: 'رقبہ', type: 'select', options: ['5 Marla', '10 Marla', '1 Kanal', '120 Sq. Yds', '240 Sq. Yds'] },
          { name: 'monthlyRent', label: 'Rent Period', labelUrdu: 'کرایہ کی مدت', type: 'select', options: ['Monthly', 'Yearly'] }
        ]
      },
      {
        id: 'rent-apartments',
        name: 'Apartments for Rent',
        nameUrdu: 'کرایہ پر فلیٹس',
        attributes: [
          { name: 'bedrooms', label: 'Bedrooms', labelUrdu: 'کمرے', type: 'select', options: ['Studio', '1 Bed', '2 Bed', '3 Bed'] }
        ]
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics & Appliances',
    nameUrdu: 'الیکٹرانکس اور گھریلو اشیاء',
    iconName: 'Tv',
    slug: 'electronics-home-appliances',
    subcategories: [
      {
        id: 'computers-laptops',
        name: 'Computers & Laptops',
        nameUrdu: 'کمپیوٹر اور لیپ ٹاپ',
        attributes: [
          { name: 'brand', label: 'Brand', labelUrdu: 'برانڈ', type: 'select', options: ['Dell', 'HP', 'Lenovo', 'Apple MacBook', 'Asus', 'Acer'] },
          { name: 'processor', label: 'Processor', labelUrdu: 'پروسیسر', type: 'select', options: ['Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'Apple M1/M2/M3', 'AMD Ryzen 5', 'AMD Ryzen 7'] },
          { name: 'ram', label: 'RAM', labelUrdu: 'ریم', type: 'select', options: ['8 GB', '16 GB', '32 GB', '64 GB'] }
        ]
      },
      {
        id: 'tvs-video-audio',
        name: 'TV - Video - Audio',
        nameUrdu: 'ٹی وی اور آڈیو',
        attributes: [
          { name: 'screenSize', label: 'Screen Size', labelUrdu: 'اسکرین سائز', type: 'select', options: ['32 Inch', '43 Inch', '50 Inch', '55 Inch', '65 Inch', '75+ Inch'] }
        ]
      },
      {
        id: 'ac-coolers',
        name: 'AC & Coolers',
        nameUrdu: 'اے سی اور کولرز',
        attributes: [
          { name: 'capacity', label: 'Capacity', labelUrdu: 'صلاحیت', type: 'select', options: ['1 Ton', '1.5 Ton', '2 Ton', '4 Ton Cabinet'] },
          { name: 'type', label: 'Type', labelUrdu: 'قسم', type: 'select', options: ['DC Inverter', 'Conventional AC', 'Solar AC'] }
        ]
      }
    ]
  },
  {
    id: 'bikes',
    name: 'Bikes',
    nameUrdu: 'موٹر سائیکلیں',
    iconName: 'Bike',
    slug: 'bikes',
    subcategories: [
      {
        id: 'motorcycles',
        name: 'Motorcycles',
        nameUrdu: 'موٹر سائیکلز',
        attributes: [
          { name: 'make', label: 'Make', labelUrdu: 'میک', type: 'select', options: ['Honda', 'Yamaha', 'Suzuki', 'Road Prince', 'United', 'Super Power', 'Benelli'] },
          { name: 'modelYear', label: 'Year', labelUrdu: 'سال', type: 'select', options: ['2025', '2024', '2023', '2022', '2021', '2020', '2019'] },
          { name: 'engine', label: 'Engine Capacity', labelUrdu: 'انجن صلاحیت', type: 'select', options: ['70cc', '100cc', '125cc', '150cc', '250cc+'] }
        ]
      }
    ]
  },
  {
    id: 'business-industrial',
    name: 'Business & Industrial',
    nameUrdu: 'کاروبار اور زراعت',
    iconName: 'Briefcase',
    slug: 'business-industrial-agriculture',
    subcategories: [
      {
        id: 'solar-generators',
        name: 'Solar Energy & Generators',
        nameUrdu: 'سولر پینلز اور جنریٹرز',
        attributes: [
          { name: 'systemSize', label: 'System Size', labelUrdu: 'سائز', type: 'select', options: ['3 kW', '5 kW', '10 kW', '15 kW', '20 kW+'] }
        ]
      },
      {
        id: 'food-restaurants',
        name: 'Restaurant & Catering Equipment',
        nameUrdu: 'ریسٹورنٹ سازوسامان',
        attributes: []
      }
    ]
  },
  {
    id: 'services',
    name: 'Services',
    nameUrdu: 'خدمات',
    iconName: 'Wrench',
    slug: 'services',
    subcategories: [
      { id: 'web-dev', name: 'Web & IT Services', nameUrdu: 'آئی ٹی سروسز', attributes: [] },
      { id: 'home-repair', name: 'Home Repair & Electrician', nameUrdu: 'گھریلو مرمت', attributes: [] }
    ]
  },
  {
    id: 'jobs',
    name: 'Jobs',
    nameUrdu: 'ملازمتیں',
    iconName: 'UserCheck',
    slug: 'jobs',
    subcategories: [
      { id: 'it-software', name: 'IT & Software Engineering', nameUrdu: 'آئی ٹی جابز', attributes: [] },
      { id: 'sales-marketing', name: 'Sales & Marketing', nameUrdu: 'مارکیٹنگ', attributes: [] }
    ]
  },
  {
    id: 'animals',
    name: 'Animals',
    nameUrdu: 'جانور',
    iconName: 'PawPrint',
    slug: 'animals',
    subcategories: [
      { id: 'birds', name: 'Birds & Parrots', nameUrdu: 'پرندے اور طوطے', attributes: [] },
      { id: 'cats', name: 'Cats & Kittens', nameUrdu: 'بلیاں', attributes: [] },
      { id: 'livestock', name: 'Livestock & Cattle', nameUrdu: 'مویشی', attributes: [] }
    ]
  },
  {
    id: 'furniture',
    name: 'Furniture & Decor',
    nameUrdu: 'فرنیچر اور سجاوٹ',
    iconName: 'Armchair',
    slug: 'furniture-home-decor',
    subcategories: [
      { id: 'sofas', name: 'Sofa & Dining Sets', nameUrdu: 'صوفہ سیٹس', attributes: [] },
      { id: 'beds', name: 'Beds & Wardrobes', nameUrdu: 'بیڈز اور الماریاں', attributes: [] }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion & Beauty',
    nameUrdu: 'فیشن اور خوبصورتی',
    iconName: 'Shirt',
    slug: 'fashion-beauty',
    subcategories: [
      { id: 'clothes', name: 'Clothes & Eastern Wear', nameUrdu: 'کپڑے', attributes: [] },
      { id: 'watches-jewellery', name: 'Watches & Jewellery', nameUrdu: 'گھڑیاں اور زیورات', attributes: [] }
    ]
  }
];
