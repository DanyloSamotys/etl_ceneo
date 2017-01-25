# ETL Ceneo

Demo programu jest dostępna pod adresesm: https://etl-ceneo-grupa3-samotysd.c9users.io/

ETL ceneo, to aplikacja webowa, która pozwala na przeprowadzenie procesu ETL na podstawie portalu Ceneo.pl.

Aplikacja stworzona przez:
  - Danylo Samotys
  - Kuba Kalbarczyk
  - Piotr Siekierski
  - Dariusz Pastwa

Program potrafi:
  - Pobrać dane o produkcie w formacie HTML
  - Przekonwertować te dane do formatu JSON
  - Załadować danę w formacie JSON do bazy danych MongoDB

### Technologie

Program jest wykonany w następujących technologiach:
  - Node.js
  - ES6
  - Express.js
  - Socket.io
  - Cheerio.js

### Instalacja

ETL Ceneo wymaga [Node.js](https://nodejs.org/) v4+.

Sciągnij i zainstaluj ETL Ceneo [ostatnia wersja] z (https://github.com/DanyloSamotys/etl_ceneo).

Install the dependencies and devDependencies and start the server.

```sh
$ cd etl_ceneo
$ npm install -d
$ npm install nodemon
$ npm start
```

### Instrukcja użytkownika

* Do uruchomienia aplikacji potrzebna jest minimalna konfiguracja pozwalająca uruchomić przeglądarkę internetową. Może to być zarówno komputer stacjonarny, laptop, tablet czy telefon komórkowy. Do prawidłowego działania aplikacji potrzebny jest również dostęp do sieci Internet.

* Po załadowaniu się strony możemy zobaczyć pole tekstowe oraz kilka przycisków:

* Pole tekstowe pozwala na wpisanie numeru ID produktu, który nas interesuje. Po wpisaniu ID którego jeszcze nie ma w bazie zostają odblokowane przyciski Extract oraz ETL. W celu pobrania danych na temat produktu należy nacisnąć przycisk Extract, prawidłowe wykonanie tej czynności odblokuje dostęp do przycisków Transform, oraz zablokuje możliwość wciśnięcia przycisku ETL.
* Przycisk Transform pozwala na przekształcenie pobranych danych do postaci pozwalających na załadowanie ich do bazy. Czynność ta odblokowuje dostęp do przycisku Load.
Naciśnięcie przycisku Load spowoduje wczytanie wcześniej przygotowanych danych do bazy.
* W celu przeprowadzenia całego procesu automatycznie po wpisaniu ID produktu należy wcisnąć przycisk ETL.
Jeżeli użytkownik wpisze ID produktu który już znajduje się w bazie jego oczom ukażą się dwa dodatkowe przyciski: Wyczyść i Wyświetl dane:

* Kliknięcie przycisku Wyczyść powoduje usunięcie z bazy danych informacji o wskazanym produkcie. Kliknięcie przycisku Wyświetl spowoduje wyświetlenie informacji na temat danego produktu.

### Dokumentacja

Kod programu jest całkowicie pokryty komentarzami.

Dokumentacja techniczna jest dostępna pod adresem: https://etl-ceneo-grupa3-samotysd.c9users.io/doco

