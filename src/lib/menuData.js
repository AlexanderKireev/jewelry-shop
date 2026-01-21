export const menuItems = [
    {
      name: 'Изделия из золота',
      slug: 'zoloto',
      subcategories: [
        { 
          name: 'Кольца', 
          slug: 'koltsa-zoloto',
          filters: [
            { id: 'size', label: 'Размер кольца', options: ['16.0', '17.0', '18.0'] },
            { id: 'stone', label: 'Вставка', options: ['Бриллиант', 'Изумруд'] }
          ]
        },
        { 
          name: 'Серьги', 
          slug: 'sergi-zoloto',
          filters: [
            { id: 'lock', label: 'Тип замка', options: ['Английский', 'Гвоздик', 'Продевка'] },
            { id: 'color', label: 'Цвет золота', options: ['Красное', 'Белое'] }
          ]
        }
      ]
    },
    {
      name: 'Изделия из серебра',
      slug: 'serebro',
      subcategories: [
        { 
          name: 'Цепочки', 
          slug: 'tsepochki-serebro',
          filters: [
            { id: 'length', label: 'Длина (см)', options: ['40', '45', '50', '60'] },
            { id: 'weave', label: 'Плетение', options: ['Бисмарк', 'Якорное', 'Панцирное'] }
          ]
        }
      ]
    }
  ];
  