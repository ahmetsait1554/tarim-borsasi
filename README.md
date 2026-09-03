interface Price {
  product: string;
  price: string;
  unit: string;
  change: string;
  trend: 'up' | 'down';
  low: string;
  high: string;
  market: string;
  category: string;
}

const regions = ['Tümü', 'Konya', 'Adana', 'Polatlı', 'Ulusal Süt Konseyi'];

const prices: Price[] = [
  // Makarnalık Buğday Grupları
  {
    product: '3. Grup Makarnalık Buğday',
    price: '17,21 TL',
    unit: 'TL / KG',
    change: '+0,00 TL',
    trend: 'up',
    low: '17,21',
    high: '17,21',
    market: 'Konya',
    category: 'Tahıl'
  },
  {
    product: 'Standart Dışı Makarnalık Buğday',
    price: '15,38 TL',
    unit: 'TL / KG',
    change: '+0,94 TL',
    trend: 'up',
    low: '14,48',
    high: '17,50',
    market: 'Konya',
    category: 'Tahıl'
  },
  {
    product: '2. Grup Makarnalık Buğday',
    price: '17,25 TL',
    unit: 'TL / KG',
    change: '+0,00 TL',
    trend: 'up',
    low: '17,25',
    high: '17,25',
    market: 'Konya',
    category: 'Tahıl'
  },
  {
    product: '1. Grup Makarnalık Buğday',
    price: '17,89 TL',
    unit: 'TL / KG',
    change: '+0,00 TL',
    trend: 'up',
    low: '17,89',
    high: '17,89',
    market: 'Konya',
    category: 'Tahıl'
  },
  {
    product: 'Düşük Vasıflı Makarnalık Buğday',
    price: '15,90 TL',
    unit: 'TL / KG',
    change: '+0,45 TL',
    trend: 'up',
    low: '14,00',
    high: '17,60',
    market: 'Konya',
    category: 'Tahıl'
  },

  // Beyaz Sert Buğday Grupları
  {
    product: 'Düşük Vasıflı Beyaz Sert Ekmeklik',
    price: '19,00 TL',
    unit: 'TL / KG',
    change: '+0,00 TL',
    trend: 'up',
    low: '19,00',
    high: '19,00',
    market: 'Adana',
    category: 'Tahıl'
  },
  {
    product: '1. Grup Beyaz Sert Ekmeklik',
    price: '19,06 TL',
    unit: 'TL / KG',
    change: '+0,52 TL',
    trend: 'up',
    low: '18,50',
    high: '19,52',
    market: 'Adana',
    category: 'Tahıl'
  },

  // Kırmızı Sert Buğday Grupları
  {
    product: '1. Grup Kırmızı Sert Ekmeklik',
    price: '18,91 TL',
    unit: 'TL / KG',
    change: '+0,35 TL',
    trend: 'up',
    low: '18,35',
    high: '19,16',
    market: 'Polatlı',
    category: 'Tahıl'
  },
  {
    product: '3. Grup Kırmızı Sert Ekmeklik',
    price: '16,96 TL',
    unit: 'TL / KG',
    change: '-0,25 TL',
    trend: 'down',
    low: '15,30',
    high: '18,31',
    market: 'Polatlı',
    category: 'Tahıl'
  },
  {
    product: 'Düşük Vasıflı Kırmızı Sert Ekmeklik',
    price: '16,79 TL',
    unit: 'TL / KG',
    change: '-0,40 TL',
    trend: 'down',
    low: '14,64',
    high: '18,89',
    market: 'Polatlı',
    category: 'Tahıl'
  },
  {
    product: '2. Grup Kırmızı Sert Ekmeklik',
    price: '18,44 TL',
    unit: 'TL / KG',
    change: '+0,30 TL',
    trend: 'up',
    low: '18,00',
    high: '19,05',
    market: 'Polatlı',
    category: 'Tahıl'
  },

  // Arpa ve Mısır
  {
    product: '1. Grup Arpa',
    price: '13,23 TL',
    unit: 'TL / KG',
    change: '+0,12 TL',
    trend: 'up',
    low: '13,01',
    high: '13,29',
    market: 'Konya',
    category: 'Tahıl'
  },
  {
    product: 'Standart Dışı Mısır',
    price: '15,09 TL',
    unit: 'TL / KG',
    change: '+0,80 TL',
    trend: 'up',
    low: '9,00',
    high: '15,30',
    market: 'Adana',
    category: 'Bakliyat / Diğer'
  },

  // Bakliyat
  {
    product: 'Kuru Fasulye',
    price: '66,21 TL',
    unit: 'TL / KG',
    change: '+1,50 TL',
    trend: 'up',
    low: '65,00',
    high: '68,00',
    market: 'Konya',
    category: 'Bakliyat / Diğer'
  },
  {
    product: 'Nohut (H.T.S.)',
    price: '34,24 TL',
    unit: 'TL / KG',
    change: '+0,75 TL',
    trend: 'up',
    low: '32,62',
    high: '35,35',
    market: 'Polatlı',
    category: 'Bakliyat / Diğer'
  },
  {
    product: 'Mercimek (H.M.S.)',
    price: '38,90 TL',
    unit: 'TL / KG',
    change: '+0,00 TL',
    trend: 'up',
    low: '38,90',
    high: '38,90',
    market: 'Konya',
    category: 'Bakliyat / Diğer'
  }
];
