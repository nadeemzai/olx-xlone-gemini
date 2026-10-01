export interface CityLocation {
  city: string;
  cityUrdu: string;
  province: string;
  areas: string[];
}

export const PAKISTAN_CITIES: CityLocation[] = [
  {
    city: 'Karachi',
    cityUrdu: 'کراچی',
    province: 'Sindh',
    areas: [
      'All Areas',
      'Clifton',
      'DHA Phase 5',
      'DHA Phase 6',
      'Gulshan-e-Iqbal',
      'North Nazimabad',
      'PECHS',
      'Bahria Town Karachi',
      'Gulistan-e-Johar',
      'Saddar',
      'Tariq Road',
      'Malir Cantt'
    ]
  },
  {
    city: 'Lahore',
    cityUrdu: 'لاہور',
    province: 'Punjab',
    areas: [
      'All Areas',
      'DHA Phase 5',
      'DHA Phase 6',
      'Gulberg III',
      'Model Town',
      'Johar Town',
      'Bahria Town Lahore',
      'Cantt',
      'Wapda Town',
      'Faisal Town',
      'Allama Iqbal Town',
      'Cavallry Ground'
    ]
  },
  {
    city: 'Islamabad',
    cityUrdu: 'اسلام آباد',
    province: 'Federal Capital',
    areas: [
      'All Areas',
      'Sector F-7',
      'Sector F-6',
      'Sector F-8',
      'Sector F-10',
      'Sector F-11',
      'Sector G-11',
      'Sector I-8',
      'Blue Area',
      'Bahria Town',
      'DHA Islamabad',
      'E-11'
    ]
  },
  {
    city: 'Rawalpindi',
    cityUrdu: 'راولپنڈی',
    province: 'Punjab',
    areas: [
      'All Areas',
      'Saddar',
      'Satellite Town',
      'Chaklala Scheme III',
      'Bahria Town Phase 7',
      'Bahria Town Phase 8',
      'Westridge',
      'Peshawar Road',
      'Adyala Road'
    ]
  },
  {
    city: 'Faisalabad',
    cityUrdu: 'فیصل آباد',
    province: 'Punjab',
    areas: [
      'All Areas',
      'D Ground',
      'Kohinoor City',
      'Madina Town',
      'Peoples Colony',
      'Canal Road',
      'Civil Lines'
    ]
  },
  {
    city: 'Multan',
    cityUrdu: 'ملتان',
    province: 'Punjab',
    areas: [
      'All Areas',
      'Gulgasht Colony',
      'Bosan Road',
      'Cantt',
      'Model Town',
      'Shah Rukn-e-Alam',
      'Wapda Town'
    ]
  },
  {
    city: 'Peshawar',
    cityUrdu: 'پشاور',
    province: 'Khyber Pakhtunkhwa',
    areas: [
      'All Areas',
      'Hayatabad',
      'University Town',
      'Saddar',
      'Warsak Road',
      'Dalazak Road',
      'Gulbahar'
    ]
  },
  {
    city: 'Quetta',
    cityUrdu: 'کوئٹہ',
    province: 'Balochistan',
    areas: [
      'All Areas',
      'Jinnah Town',
      'Cantt',
      'Satellite Town',
      'Samungli Road',
      'Zarghoon Road'
    ]
  },
  {
    city: 'Gujranwala',
    cityUrdu: 'گوجرانوالہ',
    province: 'Punjab',
    areas: [
      'All Areas',
      'DC Colony',
      'Master City',
      'Wapda Town',
      'Model Town',
      'Cantt'
    ]
  },
  {
    city: 'Sialkot',
    cityUrdu: 'سیالکوٹ',
    province: 'Punjab',
    areas: [
      'All Areas',
      'Cantt',
      'Kashmir Road',
      'Model Town',
      'Paris Road',
      'Ugoki'
    ]
  }
];
