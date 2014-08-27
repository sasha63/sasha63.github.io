ymaps.ready(init);

var myMap;

var mineral = [];
var pres = [];
var termal = [];
var termal_mineral = [];
var placemarks = [pres, mineral, termal,  termal_mineral];

function init() {
    myMap = new ymaps.Map("map", {
        center: [41.20, 74.00],
        zoom: 6,
        type: 'yandex#hybrid'
    });
    myMap.behaviors.enable('scrollZoom');
    myMap.controls.add('zoomControl', {
        float: 'none',
        position: {
            right: 40,
            top: 5
        }
    });

    var data = loadGeoData();
    for (var i=0; i < data.length; i++) {
        var row_data = data[i];

        var type = row_data[0];        
		var x = Number(row_data[10]);
		var y = Number(row_data[9]);
		var text = row_data[0];
        var size = Number(row_data[7]) * 10;
        
        var placemark = new ymaps.Placemark([x, y], {
			content: text,
			balloonContent: text + " тут!Э"
		}, {
            iconLayout: 'default#image',
            iconImageHref: getIcon(type),
            iconImageSize: [size, size],
            iconImageOffset: [-size/2, -size/2],
            visible: false
        });
        
        if (type == 'Гафний') {
            pres.push(placemark);
        } else if (type == 'Тантал и ниобий') {
            mineral.push(placemark);
        } else if (type == 'Цирконий') {
            termal.push(placemark);
        } else if (type == 'Литий, цезий, торий, цирконий') {
            termal_mineral.push(placemark);
        }
    }

    putPlacemarksOnMap();

    var pres_button = new ymaps.control.Button('Гафний');
    var mineral_button = new ymaps.control.Button('Тантал и ниобий');
    var termal_button = new ymaps.control.Button('Цирконий');
    var termal_mineral_button = new ymaps.control.Button('Литий, цезий, торий, цирконий');


    var typeControls = new ymaps.control.Group({
            items: [pres_button, mineral_button, termal_button,  termal_mineral_button]
        }, {
            position: { left: 40 }
    });

    pres_button.events.add(['select'], function (e) {
        showGroup(pres);
    });
    pres_button.events.add(['deselect'], function (e) {
        hideGroup(pres);
    });
    mineral_button.events.add(['select'], function (e) {
        showGroup(mineral);
    });
    mineral_button.events.add(['deselect'], function (e) {
        hideGroup(mineral);
    });
    termal_button.events.add(['select'], function (e) {
        showGroup(termal);
    });
    termal_button.events.add(['deselect'], function (e) {
        hideGroup(termal);
    });
    termal_mineral_button.events.add(['select'], function (e) {
        showGroup(termal_mineral);
    });
    termal_mineral_button.events.add(['deselect'], function (e) {
        hideGroup(termal_mineral);
    });


    myMap.controls.add(typeControls);
}


function showGroup(group) {
    myMap.setCenter([41.20, 74.00], 6, { duration: 1000 });
    for (var i = 0; i < group.length; i++) {
        group[i].options.set({ visible: true });
    }
}

function hideGroup(group) {
    for (var i = 0; i < group.length; i++) {
        group[i].options.set({ visible: false });
    }
}

function getIcon(type) {
        if (type == 'Гафний') {
            return 'pure.png';
        } else if (type == 'Тантал и ниобий') {
            return 'mineral.png';
        } else if (type == 'Цирконий') {
            return 'thermal.png';
        } else if (type == 'Литий, цезий, торий, цирконий') {
            return 'thermalMineral.png';
        }
}

function putPlacemarksOnMap() {
    for (var i = 0; i < placemarks.length; i++) {
        for (var j = 0; j < placemarks[i].length; j++) {
            myMap.geoObjects.add(placemarks[i][j]);
        }        
    }
};



function loadGeoData() {
var data = [
["Гафний","Редкоземельные и рассеянные элементы","Металлы","Рудные","Коренное месторождение","113","Мелкое","3","","72.17","39.77","13257207","4407541","","72.17","39.77","72.17","39.77","Кадамжайский район","/icon/Sb04.png","745__Chekendy.txt","","","","Баткенская область","","39.77","Неизученный объект <br>Высокогорная зона (2300-3600м), неосвоенный район.<br>Поиски с поверхности  1983-87 гг (канавы). <br><br>На  01.01.1987г кат.Р1: <br>Nb2O5-13.6 тыс.т <br>ZrO2 -0.2тыс.т <br>HfO2-2.3 тыс.т <br>U-0.27 тыс.т  <br><br>Nb2O5-0.4 % <br>ZrO2 -0.4 % <br>U-0.008% <br>Pb-до 1 % <br>Ag-до 100г/т <br>Sn-до 0.4% Mo-до 0.1% <br>HfO2-0.006%<br><br>Субвертикальные жилообразные тела карбонатитов и альбититов (200-1500х100-200м) среди сиенитов Р1-2, несущие вкрапленность пирохлора  циркона."],
["Тантал и ниобий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Проявление","","","0","","76.1","42.85","13589915","4746727","","76.1","42.85","76.1","42.85","Кеминский район","/icon/Sb04.png","738__Perevalnoe.txt","","","","Чуйская область","","42.85","Бесперспективное.<br>Среднегорная зона (2400м). <br>Поиски с поверхности 1964 72-74гг (канавы, единичные пробы). <br><br>Не подсчитывались<br><br>Nb2O5-0.026-0.1% <br>Ta2O5-0.006-0.011% <br>Sn-0.06-0.12% <br><br>2 мелкие кварц-магнетитовые жилы в гранитах Р. Мощность жил 1.2-1.3 м."],
["Тантал и ниобий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Проявление","","","0","","72.3","42.63","13278524","4725606","","72.3","42.63","72.3","42.63","Таласский район","/icon/Sb04.png","739__Batamchal.txt","","","","Таласская область","","42.63","Бесперспективное.<br>Низкогорная зона (1700-2100м). <br>Поиски с поверхности и на глубину  1963-66гг  (канавы, шурфы). <br><br>На  01.01.1966г кат.С1: <br>Ta2O5-4.2т <br>Nb2O5-70.0т <br><br>Ta2O5-0.013% <br>Nb2O5-0.211% <br>STR2O3-0.01-0.2% <br><br>Мелкие тела пегматитов (50-150х0.7-1.2м)  во взаимосвязи со штоками диоритов О1 и гранит-порфиров S1,  прорывающих филлиты R2."],
["Тантал и ниобий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Проявление","","","0","","73.73","42.02","13395080","4654347","4","73.73","42.02","73.73","42.02","Жайыльский район","/icon/Sb04.png","740__Birgan.txt","","","","Чуйская область","","42.02","Бесперспективное.<br>Высокогорная зона (3400м). <br>Поиски с поверхности  1968-70 гг  (канава). <br><br>Нет сведений <br><br>Nb2O5-0.031-0.083% <br>Ta2O5-0.006-0.012% <br>ZrO2 - 0.31-0.66% <br>BeO-0.01%<br><br>Мелкие пегматитовые жилы (до 10х3м) в гранитах О3"],
["Тантал и ниобий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Проявление","","","0","","76.03","41.03","13586942","4541168","","76.07","41.03","76.07","41.03","Ат-Башинский район","/icon/Sb04.png","741__Surteke-4.txt","","","","Нарынская область","","41","Бесперспективное.<br>Высокогорная зона (3400м-3700м), неосвоенный район.<br>Поиски с поверхности  1961-63гг  (канавы). <br><br>Нет сведений <br><br>Ta2O5-0.01-0.01% <br>Nb2O5-0.003-0.222% <br>STR2O3-0.01-0.05% <br><br>3 мелких (60-290х3-17м) флюорит-альбититовых тела, залегающих среди контактовых роговиков и мраморов D1, прорванных щелочными сиенитами Р1."],
["Тантал и ниобий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Коренное месторождение","110","Крупное","1","","70.83","39.55","13141801","4387944","","70.83","39.55","70.83","39.55","Баткенский район","/icon/Sb04.png","742__Delbek.txt","","","","Баткенская область","","39.55","Перспективное, неизученное. Высокогорная зона (2200-4000м), слабо освоенный район.<br>Поиски с поверхности  1988-90гг (канавы). <br><br>На  01.01.1992г кат.Р1+Р2 <br>Ta2O5-56.2тыс.т <br><br>Ta2O5-0.06% <br>Nb2O5-0.011% <br>STR2O3-0.25% <br>ZrO2 - 0.011% <br><br>10 крупных тел (300-1250х19.8-49,  4х155-625м) карбонатитовых метасоматитов,  в экзоконтакте интрузии щелочных сиенитов Р2-Т1. Рудный минерал - пирохлор."],
["Тантал и ниобий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Проявление","111","Среднее","2","","70.8","39.48","13138589","4380672","","70.8","39.48","70.8","39.48","Баткенский район","/icon/Sb04.png","743__Tutek.txt","","","","Баткенская область","","39.48","Перспективное  неизученное месторождение. <br>Высокогорная зона (3500-3900м), слабо освоенный район.<br>Поиски с поверхности 1988-90гг (канавы). <br><br>На  01.01.1992г кат.Р1+Р2 <br>Ta2O5-30.6тыс.т <br>Nb2O5-16.4 тыс.т <br>ZrO2 -60.1 тыс.т <br>U-2.4 тыс.т <br>Th - 6.5 тыс.т <br><br>Ta2O5-0.076% <br>Nb2O5-0.076% <br>U,  Th-0.074% <br>Th-0.19% <br>ZrO2 - 0.322% <br>S<br>TR2O3-0.01-0.48%<br>LiO2-до 0.15% <br><br>Три рудоносные зоны (1.3-2.95кмх0.45-0.75км)  в массиве щелочных сиенитов Р2-Т1,  насыщенные десятками жил (150-800х1.7-5х100х600м) с полисульфидно-торий-пирохлоровой минерализацией."],
["Тантал и ниобий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Проявление","","","0","","71.28","39.57","13180574","4388098","","71.28","39.57","71.28","39.57","Баткенский район","/icon/Sb04.png","744__Yugjnokontaktovoe.txt","","","","Баткенская область","","39.57","Бесперспективное.<br>Высокогорная зона (3200м-3400м), слабо освоенный район.<br>Поиски с поверхности  1946-56гг (канавы). <br><br>Нет сведений <br><br>Nb2O5-0.077% <br>Ta2O5-0.03% <br>U3О8-0.031% <br><br>Жилообразные рудоносные дайки (500х50м) щелочных сиенитов (Р1-2), прорывающие карбонатно-сланцевую толщу S."],
["Цирконий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Проявление","","Мелкое","3","","72.4","42.12","13284971","4667951","4","72.4","42.12","72.4","42.12","Токтогульский район","/icon/Sb04.png","746__Kurgan.txt","","","","Джалал-Абадская область","","42.12","Перспективное  детально разведанное месторождение. <br>Условия благоприятные, высота 2500 м, доступно.<br><br>Р1 на 07.1993 г. <br>ZrO2 -823.4т /0.495%/ <br>STR2O3-244.7т /0.146%/ <br>Th-142.9т /0.085%/ <br>BeO-81.1т /0.048%/ <br>Nb2O5-133.7т /0.05%/ <br><br>ZrO2 -0.02-1.8% <br>STR2O3-0.01-1.63%  <br>Th-0.085%  <br>BeO-0.048%  <br>Nb2O5-0.05-0.3%  <br>Pb-0.05-40.5% <br>Zn-до 27.93%  <br>Sn-до 1.99%  <br>Ag-до 342г/т  <br>As-до 0.65%  <br>Sb-до 0.78% <br>In-0.03% <br><br>28 секущих жило- и столбообразных рудных тел (6-200х6-78х 165м) в известняках R3. Руды пирротин-галенит-сфалеритовые, окисленные."],
["Цирконий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Коренное месторождение","109","Крупное","1","","72.93","41.67","13327877","4616760","","72.93","41.67","72.93","41.67","Базар-Коргонский район","/icon/Sb04.png","747__Chumali.txt","","","","Джалал-Абадская область","","41.67","Неизученный перспективный объект. <br>Среднегорная зона (1800-2100 м), освоенный район. <br>Поиски с поверхности  1959-61 гг (канавы). <br><br>На  01.01.1964г кат.Р3: <br>Nb2O5-59.4 тыс.т <br>Ta2O5-2.09 тыс.т <br>ZrO2 -1223тыс.т <br>Hf2O3-17.47 тыс.т <br>Ce2O3-52.41тыс.т <br><br>Nb2O5-0.85% <br>Ta2O5-0.003% <br>ZrO2 -1.75% <br>Hf2O3-0.25% <br>Ce2O3-0.075% <br>U-до 0.01% <br>La2O3-до 0.04% <br><br>2 минерализованные зоны (330х600х130-330м),  сопровождающие экзоконтакты даек сиенитов PZ3, прорывающих карбонатно-сланцевые толщи S2-D1."],
["Цирконий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Проявление","","","0","","71.23","39.65","13176664","4397533","","71.23","39.65","71.23","39.65","Баткенский район","/icon/Sb04.png","748__Khodjaachkanskoe.txt","","","","Баткенская область","","39.65","Бесперспективное.<br>Высокогорная зона (3500 м), слабо освоенный район.<br>Поиски с поверхности 1946-59 гг (канавы).  <br><br>На 01.01.1950г кат.С2: Th-8.66 т  <br><br>Nb-0.01-0.1% <br>Zn- до 1% <br><br>Минерализованные тела альбититов (10-200х0.5-10м) в дайках щелочных сиенитов Р1-2 и вмещающих глинистых сланцах С3."],
["Литий,цезий,торий,цирконий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Коренное месторождение","","","0","","71.68","42.45","13227138","4707038","4","71.68","42.45","71.68","42.45","Бакай-Атинский район","/icon/Sb04.png","749__Dizelny prosp..txt","","","","Таласская область","","42.45","Самостоятельных перспектив не имеет. <br>Низкогорная зона (1800м), освоенный район. <br>Поиски с поверхности  1960-63 гг (канавы). <br><br>Нет сведений <br><br>Li-0.098-0.53%, макс.-0.7-1.5% <br>Грейзенизированные жилы гранитов и грейзенов (10-12х0.5м) со скоплениями берилла (0.15х 0.45м)  среди гранитов S, прорывающих филлиты PZ1."],
["Литий,цезий,торий,цирконий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Проявление","","Мелкое","3","","76.58","41.85","13631492","4636270","","76.58","41.85","76.58","41.85","Кочкорский район","/icon/Sb04.png","751__Tuyukter.txt","","","","Нарынская область","","41.85","Недоизученный перспективный объект. <br>Высокогорная зона (3600-3900м), неосвоенный район.<br>Поиски с поверхности  1977 г. (канавы). <br><br>На  01.01.1981г кат.Р1: <br>Cs-307.45 т <br>Rb-133.25 т <br>Li-162.89 т <br>BeO-24.44 т  <br><br>Cs-0.009-1% и >(0.315%) <br>Rb-0.02-0.4% (0.137%)  <br>Li-0.02-1% (0.167%) <br>Nb2O5-до 0.005% <br>Ta2O5-до 0.026% <br>BeO-0.025% <br><br>2 линзообразных тела (50х10) поллуцит-сподумен-лепидолитовых пегматитов среди метаморфических сланцев R3, прорванных массивами диоритов О1-2."],
["Литий,цезий,торий,цирконий","Редкоземельные и рассеянные элементы","Металлы","Рудные","Коренное месторождение","","Среднее","2","","71.27","39.67","13179604","4399265","","71.27","39.67","71.27","39.67","Баткенский район","/icon/Sb04.png","752__Djilisuiskoe.txt","","","","Баткенская область","","39.67","Перспективное  частично изученное на глубину  месторождение. <br>Высокогорная зона (2600-3500м), слабо освоенный район.<br>Поиски с поверхности и на глубину 1946-59 гг (канавы, шурфы, штольни). <br><br>На  01.01.1960г кат.С2: <br>Nb2O5-9.47тыс.т <br>Ta2O5-1.07 тыс.т <br>ZrO2-15.9 т.т<br>LiО2-25.9 тыс.т <br>Th-10 тыс.т <br><br>Nb2O5-0.03-0.149% (0.071%)  <br>Ta2O5-0.006-0.013%  (0.008%) <br>ZrO2-0.06-0.29% (0.12%) <br>LiО2-0.06-0.41% (0.19%) <br>Th-0.1-0.5 %<br><br>14 крутопадающих минерализованных зон (45-455х1-80м) с альбит-пирохлор-цирконовой минерализацией среди роговиков в экзоконтакте массива щелочных сиенитов Р1-2."]

];
	return data;	
}
