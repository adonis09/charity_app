
REPLACE INTO `institution` (id, name, description) VALUES
(1, 'Dbam o Zdrowie', 'Pomoc dzieciom z ubogich rodzin.'),
(2, 'Dla dzieci', 'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.'),
(3, 'A kogo', 'Pomoc wybudzaniu dzieci ze śpiączki.'),
(4, 'Bez domu', 'Pomoc dla osób nie posiadających miejsca zamieszkania.'),
(5, 'Złota jesień', 'Pomoc dla starszych, samotnych osób.'),
(6, 'Psia łapa', 'Wspieranie schronisk dla psów.');

REPLACE INTO `category` (id, name, description) VALUES
(1, 'clothes-to-use', 'ubrania, które nadają się do ponownego użycia'),
(2, 'clothes-useless', 'ubrania do wyrzucenia'),
(3, 'toys', 'zabawki'),
(4, 'books', 'książki'),
(5, 'other', 'inne');

REPLACE INTO `institution_category` (institution_id, category_id) VALUES
(1, 1),
(1, 3),
(1, 4),
(2, 1),
(3, 3),
(4, 1),
(5, 1),
(6, 2);