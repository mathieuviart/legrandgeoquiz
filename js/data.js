// ─── CATEGORIES ───────────────────────────────────────────────────────────────
var ALL_CATEGORIES = [
  {id:'pib',icon:'💰',fr:'PIB Total',en:'Total GDP',ua:'Загальний ВВП',de:'BIP Gesamt',
   sort:{fr:'Plus grand PIB en premier',en:'Highest GDP first',ua:'Найбільший ВВП першим',de:'Größtes BIP zuerst'},
   desc:{fr:'Valeur totale des biens et services produits par un pays sur une année. Le rang indique la position économique globale.',en:"Total value of goods and services produced in a year. The rank indicates the country's overall economic position.",ua:'Загальна вартість товарів і послуг за рік. Ранг відображає економічне становище країни.',de:'Gesamtwert aller in einem Jahr produzierten Güter und Dienstleistungen. Der Rang zeigt die wirtschaftliche Position.'}},

  {id:'nb_habitant',icon:'👥',fr:"Nb d'habitants",en:'Population',ua:'Населення',de:'Einwohnerzahl',
   sort:{fr:'Population la plus grande en premier',en:'Largest population first',ua:'Найбільше населення першим',de:'Größte Bevölkerung zuerst'},
   desc:{fr:"Nombre total de personnes résidant dans le pays, indicateur fondamental de la taille d'un État.",en:"Total number of people residing in the country, a fundamental indicator of a state's size.",ua:'Загальна кількість людей у країні — базовий показник розміру держави.',de:'Gesamtzahl der im Land lebenden Personen, grundlegender Indikator für die Grösse eines Staates.'}},

  {id:'depense_defense_pctg_pib',icon:'🛡️',fr:'Dépense défense % PIB',en:'Defense spending % GDP',ua:'Витрати на оборону % ВВП',de:'Verteidigungsausgaben % BIP',
   sort:{fr:'Plus forte dépense militaire (% PIB) en premier',en:'Highest defense spending (% GDP) first',ua:'Найвищі витрати на оборону (% ВВП) першими',de:'Höchste Verteidigungsausgaben (% BIP) zuerst'},
   desc:{fr:"Part du budget national allouée à la défense, en % du PIB. Reflète les priorités stratégiques d'un pays.",en:"Share of national budget allocated to defense, as % of GDP. Reflects a country's strategic priorities.",ua:'Частка бюджету на оборону у відсотках від ВВП. Відображає стратегічні пріоритети країни.',de:'Anteil des Staatshaushalts für Verteidigung in % des BIP. Spiegelt die strategischen Prioritäten wider.'}},

  {id:'indice_paix',icon:'☮️',fr:'Indice de paix',en:'Peace index',ua:'Індекс миру',de:'Friedensindex',
   sort:{fr:'Pays le plus pacifique en premier',en:'Most peaceful country first',ua:'Наймирніша країна першою',de:'Friedlichstes Land zuerst'},
   desc:{fr:'Mesure le niveau de paix : conflits internes, relations avec les voisins, stabilité politique. Rang faible = plus pacifique.',en:'Measures peace and security: internal conflicts, neighbor relations, political stability. Low rank = more peaceful.',ua:'Вимірює рівень миру: конфлікти, відносини з сусідами, стабільність. Низький ранг = мирніша країна.',de:'Misst das Friedensniveau: interne Konflikte, Nachbarschaftsbeziehungen, politische Stabilität. Niedriger Rang = friedlicher.'}},

  {id:'densite_pop',icon:'🏙️',fr:'Densité de population',en:'Population density',ua:'Густота населення',de:'Bevölkerungsdichte',
   sort:{fr:'Plus forte densité en premier',en:'Highest density first',ua:'Найвища густота першою',de:'Höchste Dichte zuerst'},
   desc:{fr:'Nombre d\'habitants par km², reflétant la concentration de la population sur le territoire.',en:'Number of inhabitants per km², reflecting the concentration of the population.',ua:'Кількість мешканців на км² — концентрація населення на території.',de:'Einwohner pro km², zeigt die Konzentration der Bevölkerung auf dem Staatsgebiet.'}},

  {id:'age_median',icon:'📅',fr:'Âge médian',en:'Median age',ua:'Середній вік',de:'Medianalter',
   sort:{fr:'Population la plus âgée en premier',en:'Oldest population first',ua:'Найстаріше населення першим',de:'Älteste Bevölkerung zuerst'},
   desc:{fr:'Âge qui sépare la population en deux groupes égaux. Indique si la population est plutôt jeune ou vieillissante.',en:'Age that divides the population into two equal groups. Indicates whether the population is younger or aging.',ua:'Вік, який ділить населення навпіл. Вказує, молода чи стара країна.',de:'Alter, das die Bevölkerung in zwei gleich grosse Gruppen teilt. Zeigt ob die Bevölkerung eher jung oder alt ist.'}},

  {id:'taux_mortalite',icon:'💀',fr:'Taux de mortalité',en:'Mortality rate',ua:'Рівень смертності',de:'Sterberate',
   sort:{fr:'Taux de mortalité le plus élevé en premier',en:'Highest mortality rate first',ua:'Найвищий рівень смертності першим',de:'Höchste Sterberate zuerst'},
   desc:{fr:'Nombre de décès pour 1 000 habitants, indicateur général de la santé d\'une population.',en:'Number of deaths per 1,000 inhabitants, a general health indicator.',ua:'Кількість смертей на 1 000 жителів — загальний показник здоров\'я населення.',de:'Anzahl Todesf00e4lle pro 1.000 Einwohner, allgemeiner Gesundheitsindikator.'}},

  {id:'taux_mortalite_routiere',icon:'🚗',fr:'Mortalité routière',en:'Road mortality',ua:'Дорожня смертність',de:'Verkehrstote',
   sort:{fr:'Plus de morts sur la route en premier',en:'Most road deaths first',ua:'Найбільше смертей на дорогах першим',de:'Meiste Verkehrstote zuerst'},
   desc:{fr:'Nombre de décès liés aux accidents de la route pour 100 000 habitants.',en:'Number of road accident deaths per 100,000 inhabitants.',ua:'Кількість загиблих у ДТП на 100 000 жителів.',de:'Anzahl Verkehrstote pro 100\'000 Einwohner.'}},

  {id:'taux_fecondite',icon:'🍼',fr:'Taux de fécondité',en:'Fertility rate',ua:'Рівень народжуваності',de:'Geburtenrate',
   sort:{fr:'Fécondité la plus haute en premier',en:'Highest fertility first',ua:'Найвища народжуваність першою',de:'Höchste Geburtenrate zuerst'},
   desc:{fr:'Nombre moyen d\'enfants par femme. Influence la croissance démographique.',en:'Average number of children per woman. Directly influences population growth.',ua:'Середня кількість дітей на жінку. Впливає на демографічне зростання.',de:'Durchschnittliche Kinderzahl pro Frau. Beeinflusst das Bevölkerungswachstum.'}},

  {id:'esperance_vie',icon:'❤️',fr:'Espérance de vie',en:'Life expectancy',ua:'Очікувана тривалість життя',de:'Lebenserwartung',
   sort:{fr:'Espérance de vie la plus longue en premier',en:'Longest life expectancy first',ua:'Найбільша тривалість життя першою',de:'Höchste Lebenserwartung zuerst'},
   desc:{fr:'Âge moyen auquel on s\'attend à vivre. Indicateur clé de la qualité de vie.',en:'Average age one is expected to live to. A key quality of life indicator.',ua:'Середній очікуваний вік. Ключовий показник якості життя.',de:'Durchschnittliches erwartetes Lebensalter. Wichtiger Indikator für Lebensqualität.'}},

  {id:'pib_habitant',icon:'💵',fr:'PIB / Habitant',en:'GDP per capita',ua:'ВВП на душу населення',de:'BIP / Einwohner',
   sort:{fr:'PIB/hab le plus élevé en premier',en:'Highest GDP per capita first',ua:'Найвищий ВВП/особу першим',de:'Höchstes BIP pro Einwohner zuerst'},
   desc:{fr:'Richesse économique moyenne par personne (PIB ÷ nb habitants).',en:'Average economic wealth per person (GDP ÷ population).',ua:'Середній економічний добробут на одну особу (ВВП ÷ населення).',de:'Durchschnittlicher wirtschaftlicher Wohlstand pro Person (BIP ÷ Einwohner).'}},

  {id:'dette_publique_pctg_pib',icon:'📉',fr:'Dette publique % PIB',en:'Public debt % GDP',ua:'Держборг % ВВП',de:'Staatsverschuldung % BIP',
   sort:{fr:'Dette la plus élevée (% PIB) en premier',en:'Highest debt (% GDP) first',ua:'Найвищий борг (% ВВП) першим',de:'Höchste Verschuldung (% BIP) zuerst'},
   desc:{fr:"Niveau d'endettement d'un État par rapport à sa richesse économique annuelle, en % du PIB.",en:"Level of a state's debt relative to its annual economic wealth, as % of GDP.",ua:'Рівень заборгованості держави відносно ВВП, у відсотках.',de:'Verschuldungsgrad eines Staates im Verhältnis zur jährlichen Wirtschaftsleistung, in % des BIP.'}},

  {id:'indice_corruption',icon:'🕵️',fr:'Indice de corruption',en:'Corruption index',ua:'Індекс корупції',de:'Korruptionsindex',
   sort:{fr:'Pays le moins corrompu en premier',en:'Least corrupt country first',ua:'Найменш корумпована країна першою',de:'Wenigstes korruptes Land zuerst'},
   desc:{fr:'Mesure le niveau perçu de corruption dans le secteur public.',en:'Measures the perceived level of corruption in the public sector.',ua:'Вимірює сприйнятий рівень корупції в державному секторі.',de:'Misst das wahrgenommene Korruptionsniveau im öffentlichen Sektor.'}},

  {id:'nb_touriste',icon:'✈️',fr:'Arrivées touristiques',en:'Tourist arrivals',ua:'Туристичні прибуття',de:'Touristenankünfte',
   sort:{fr:'Plus de touristes en premier',en:'Most tourists first',ua:'Найбільше туристів першою',de:'Meiste Touristen zuerst'},
   desc:{fr:"Nombre total de visiteurs internationaux, indicateur de l'attractivité touristique.",en:"Total number of international visitors, an indicator of tourist attractiveness.",ua:'Загальна кількість міжнародних відвідувачів — показник привабливості країни.',de:'Gesamtzahl internationaler Besucher, Indikator für touristische Attraktivität.'}},

  {id:'niveau_mathematique',icon:'📐',fr:'Niveau mathématiques',en:'Math level',ua:'Рівень математики',de:'Mathematikniveau',
   sort:{fr:'Meilleur score en maths en premier',en:'Best math score first',ua:'Найкращий результат з математики першим',de:'Bestes Matheniveau zuerst'},
   desc:{fr:'Performance en mathématiques mesurée par des tests standardisés internationaux (PISA).',en:'Math performance measured by international standardized tests (PISA).',ua:'Успішність з математики за міжнародними тестами (PISA).',de:'Mathematische Leistung gemessen durch internationale standardisierte Tests (PISA).'}},

  {id:'empreinte_ecologique_par_habitant',icon:'🌱',fr:'Empreinte éco/hab',en:'Eco footprint/capita',ua:'Екослід на душу',de:'Öko-Fussabdruck/Einw.',
   sort:{fr:'Empreinte écologique/hab la plus élevée en premier',en:'Highest eco footprint per capita first',ua:'Найбільший екослід на особу першим',de:'Größter Öko-Fussabdruck/Einw. zuerst'},
   desc:{fr:'Pression sur les ressources naturelles par habitant, en hectares globaux.',en:'Pressure on natural resources per inhabitant, in global hectares.',ua:'Навантаження на природні ресурси на одного жителя, у глобальних гектарах.',de:'Belastung der natürlichen Ressourcen pro Einwohner, in globalen Hektar.'}},

  {id:'empreinte_ecologique',icon:'🌍',fr:'Empreinte écologique',en:'Ecological footprint',ua:'Екологічний слід',de:'Ökologischer Fussabdruck',
   sort:{fr:'Empreinte écologique totale la plus élevée en premier',en:'Highest total ecological footprint first',ua:'Найбільший загальний екологічний слід першим',de:'Größter gesamter Öko-Fussabdruck zuerst'},
   desc:{fr:'Pression totale exercée par un pays sur les ressources naturelles, en hectares globaux.',en:"Total pressure exerted by a country on natural resources, in global hectares.",ua:'Загальне навантаження країни на природні ресурси, у глобальних гектарах.',de:'Gesamtbelastung eines Landes auf die natürlichen Ressourcen, in globalen Hektar.'}},

  {id:'surface_foret_pctg_territoire',icon:'🌲',fr:'Surface forestière %',en:'Forest cover %',ua:'Лісовий покрив %',de:'Waldfläche %',
   sort:{fr:'Plus grande couverture forestière en premier',en:'Highest forest cover first',ua:'Найбільший лісовий покрив першим',de:'Größte Waldfläche zuerst'},
   desc:{fr:'Pourcentage du territoire couvert par des forêts. Indicateur de biodiversité.',en:'Percentage of the territory covered by forests. A biodiversity indicator.',ua:'Відсоток території, вкритої лісами. Показник біорізноманіття.',de:'Prozent des Staatsgebiets, das von Wald bedeckt ist. Biodiversitätsindikator.'}},

  {id:'production_or',icon:'🥇',fr:"Production d'or",en:'Gold production',ua:'Виробництво золота',de:'Goldproduktion',
   sort:{fr:'Plus grande production d\'or en premier',en:'Highest gold production first',ua:'Найбільше виробництво золота першим',de:'Größte Goldproduktion zuerst'},
   desc:{fr:"Quantité d'or produite, liée à l'activité minière et aux ressources naturelles.",en:'Amount of gold produced, linked to mining activity and natural resources.',ua:'Кількість видобутого золота, пов\'язана з гірничодобувною діяльністю.',de:'Produzierte Goldmenge, verbunden mit Bergbau und natürlichen Ressourcen.'}},

  {id:'pctg_irreligieux',icon:'🔮',fr:'% Irréligieux',en:'% Non-religious',ua:'% Нерелігійних',de:'% Nicht-Religiöse',
   sort:{fr:'Plus grande proportion de non-croyants en premier',en:'Most non-religious first',ua:'Найбільша частка нерелігійних першою',de:'Meiste Nicht-Religiöse zuerst'},
   desc:{fr:"Proportion de la population ne s'identifiant à aucune religion.",en:'Proportion of the population not identifying with any religion.',ua:'Частка населення без релігійної приналежності.',de:'Anteil der Bevölkerung, der sich keiner Religion zugehörig fühlt.'}},

  {id:'taux_suicide',icon:'📊',fr:'Taux de suicide',en:'Suicide rate',ua:'Рівень суїциду',de:'Suizidrate',
   sort:{fr:'Taux de suicide le plus élevé en premier',en:'Highest suicide rate first',ua:'Найвищий рівень суїциду першим',de:'Höchste Suizidrate zuerst'},
   desc:{fr:'Nombre de suicides pour 100 000 habitants. Indicateur de santé mentale.',en:'Number of suicides per 100,000 inhabitants. A mental health indicator.',ua:'Кількість самогубств на 100 000 жителів. Показник психічного здоров\'я.',de:'Anzahl Suizide pro 100.000 Einwohner. Indikator für psychische Gesundheit.'}},

  {id:'taux_tabagisme',icon:'🚬',fr:'Taux de tabagisme',en:'Smoking rate',ua:'Рівень куріння',de:'Raucherquote',
   sort:{fr:'Taux de tabagisme le plus élevé en premier',en:'Highest smoking rate first',ua:'Найвищий рівень куріння першим',de:'Höchste Raucherquote zuerst'},
   desc:{fr:'Pourcentage de la population qui fume régulièrement.',en:'Percentage of the population that smokes regularly.',ua:'Відсоток населення, яке регулярно курить.',de:'Prozentsatz der Bevölkerung, die regelmässig raucht.'}},

  {id:'conso_alcool_par_habitant',icon:'🍺',fr:'Conso alcool/hab',en:'Alcohol consumption/capita',ua:'Споживання алкоголю',de:'Alkoholkonsum/Einw.',
   sort:{fr:'Plus forte consommation d\'alcool en premier',en:'Highest alcohol consumption first',ua:'Найвище споживання алкоголю першим',de:'Höchster Alkoholkonsum zuerst'},
   desc:{fr:"Quantité moyenne d'alcool pur consommée par personne et par an.",en:'Average amount of pure alcohol consumed per person per year.',ua:'Середня кількість чистого алкоголю на одну особу на рік.',de:'Durchschnittliche Menge reinen Alkohols pro Person und Jahr.'}},

  {id:'travail_enfant',icon:'👶',fr:'Travail des enfants',en:'Child labour',ua:'Дитяча праця',de:'Kinderarbeit',
   sort:{fr:'Prévalence du travail des enfants la plus élevée en premier',en:'Highest child labour prevalence first',ua:'Найвища поширеність дитячої праці першою',de:'Höchste Kinderarbeit zuerst'},
   desc:{fr:"Prévalence du travail des enfants dans une activité économique. Reflète les conditions sociales.",en:'Prevalence of child labor in economic activity. Reflects social conditions.',ua:'Поширеність дитячої праці. Відображає соціально-економічні умови.',de:'Verbreitung von Kinderarbeit in wirtschaftlicher Tätigkeit. Spiegelt soziale Bedingungen wider.'}},

  {id:'nb_militaire',icon:'🪖',fr:'Nb de militaires',en:'Military personnel',ua:'Військовий персонал',de:'Militärpersonal',
   sort:{fr:'Plus grande armée en premier',en:'Largest military first',ua:'Найбільша армія першою',de:'Größtes Militär zuerst'},
   desc:{fr:"Effectif total des forces armées. Indicateur de la capacité militaire d'un pays.",en:"Total size of a country's armed forces. A military capacity indicator.",ua:'Загальна чисельність збройних сил. Показник військового потенціалу країни.',de:'Gesamtstärke der Streitkräfte. Indikator für die militärische Kapazität eines Landes.'}},

  {id:'classement_fifa_H',icon:'⚽',fr:'Classement FIFA (H)',en:'FIFA Ranking (M)',ua:'Рейтинг ФІФА (Ч)',de:'FIFA-Rangliste (M)',
   sort:{fr:'Meilleure équipe masculine en premier',en:'Best men\'s team first',ua:'Найкраща чоловіча збірна першою',de:'Beste Herrenmannschaft zuerst'},
   desc:{fr:"Position de l'équipe nationale masculine de football au classement mondial FIFA.",en:"Position of the men's national football team in the FIFA world rankings.",ua:'Позиція чоловічої збірної з футболу у світовому рейтингу ФІФА.',de:'Position der Herren-Fussballnationalmannschaft in der FIFA-Weltrangliste.'}},

  {id:'classement_fifa_F',icon:'⚽',fr:'Classement FIFA (F)',en:'FIFA Ranking (W)',ua:'Рейтинг ФІФА (Ж)',de:'FIFA-Rangliste (F)',
   sort:{fr:'Meilleure équipe féminine en premier',en:'Best women\'s team first',ua:'Найкраща жіноча збірна першою',de:'Beste Damenmannschaft zuerst'},
   desc:{fr:"Position de l'équipe nationale féminine de football au classement mondial FIFA.",en:"Position of the women's national football team in the FIFA world rankings.",ua:'Позиція жіночої збірної з футболу у світовому рейтингу ФІФА.',de:'Position der Frauen-Fussballnationalmannschaft in der FIFA-Weltrangliste.'}},

  {id:'classement_rugby_H',icon:'🏉',fr:'Classement Rugby (H)',en:'Rugby Ranking (M)',ua:'Рейтинг регбі (Ч)',de:'Rugby-Rangliste (M)',
   sort:{fr:'Meilleure équipe de rugby en premier',en:'Best rugby team first',ua:'Найкраща регбійна збірна першою',de:'Beste Rugbymannschaft zuerst'},
   desc:{fr:"Position de l'équipe nationale masculine de rugby au classement mondial World Rugby.",en:"Position of the men's national rugby team in the World Rugby rankings.",ua:'Позиція чоловічої збірної з регбі у світовому рейтингу World Rugby.',de:'Position der Herren-Rugbynationalmannschaft in der World-Rugby-Weltrangliste.'}},

  {id:'point_culminant',icon:'🏔️',fr:'Point culminant',en:'Highest point',ua:'Найвища точка',de:'Höchster Punkt',
   sort:{fr:'Altitude la plus élevée en premier',en:'Highest altitude first',ua:'Найвища висота першою',de:'Größte Höhe zuerst'},
   desc:{fr:"Altitude du sommet le plus élevé du pays, reflétant le relief du territoire.",en:"Altitude of the country's highest peak, reflecting the terrain.",ua:'Висота найвищої вершини країни, що відображає рельєф території.',de:'Höhe des höchsten Gipfels des Landes, spiegelt das Gelände wider.'}},

  {id:'ordre_alphabetique',icon:'🔤',fr:'Ordre alphabétique',en:'Alphabetical order',ua:'Алфавітний порядок',de:'Alphabetische Reihenfolge',
   sort:{fr:'De A à Z',en:'From A to Z',ua:'Від А до Я',de:'Von A bis Z'},
   desc:{fr:"Position du pays dans une liste triée par nom (de A à Z).",en:"Position of the country in a list sorted by name (from A to Z).",ua:'Позиція країни у списку, відсортованому за назвою (від А до Я).',de:'Position des Landes in einer alphabetisch sortierten Liste (A bis Z).'}},

  {id:'medaille_jo',icon:'🏅',fr:'Médailles JO',en:'Olympic medals',ua:'Олімпійські медалі',de:'Olympische Medaillen',
   sort:{fr:'Plus de médailles olympiques en premier',en:'Most Olympic medals first',ua:'Найбільше олімпійських медалей першим',de:'Meiste olympische Medaillen zuerst'},
   desc:{fr:"Nombre total de médailles obtenues aux Jeux Olympiques. Reflète la puissance sportive.",en:"Total number of medals won at the Olympic Games. Reflects sporting prowess.",ua:'Загальна кількість медалей, здобутих на Олімпійських іграх. Відображає спортивну міць.',de:'Gesamtzahl der bei Olympischen Spielen gewonnenen Medaillen. Zeigt die sportliche Stärke.'}},

  {id:'taux_obesite',icon:'🍔',fr:"Taux d'obésité",en:'Obesity rate',ua:'Рівень ожиріння',de:'Adipositasrate',
   sort:{fr:'Taux d\'obésité le plus élevé en premier',en:'Highest obesity rate first',ua:'Найвищий рівень ожиріння першим',de:'Höchste Adipositasrate zuerst'},
   desc:{fr:"Pourcentage de la population adulte souffrant d'obésité. Indicateur de santé publique.",en:"Percentage of the adult population suffering from obesity. A public health indicator.",ua:'Відсоток дорослого населення з ожирінням. Показник здоров\'я нації.',de:'Prozentsatz der erwachsenen Bevölkerung mit Adipositas. Indikator für öffentliche Gesundheit.'}},

  {id:'prevalence_cannabis_pctg',icon:'🌿',fr:'Prévalence cannabis',en:'Cannabis prevalence',ua:'Поширеність канабісу',de:'Cannabisverbreitung',
   sort:{fr:'Consommation de cannabis la plus élevée en premier',en:'Highest cannabis use first',ua:'Найвище вживання канабісу першим',de:'Höchster Cannabiskonsum zuerst'},
   desc:{fr:"Pourcentage de la population ayant consommé du cannabis au cours de l'année écoulée.",en:"Percentage of the population that has used cannabis in the past year.",ua:'Відсоток населення, яке вживало канабіс протягом останнього року.',de:'Prozentsatz der Bevölkerung, die im letzten Jahr Cannabis konsumiert hat.'}},

  {id:'classement_bball_M',icon:'🏀',fr:'Classement Basket (M)',en:'Basketball ranking (M)',ua:'Рейтинг баскетболу (Ч)',de:'Basketball-Rangliste (M)',
   sort:{fr:'Meilleure équipe de basket masculine en premier',en:'Best men\'s basketball team first',ua:'Найкраща чоловіча баскетбольна збірна першою',de:'Beste Herren-Basketballmannschaft zuerst'},
   desc:{fr:"Position de l'équipe nationale masculine de basketball au classement mondial FIBA.",en:"Position of the men's national basketball team in the FIBA world rankings.",ua:'Позиція чоловічої збірної з баскетболу у світовому рейтингу FIBA.',de:'Position der Herren-Basketballnationalmannschaft in der FIBA-Weltrangliste.'}},

  {id:'heureux',icon:'😊',fr:'Indice de bonheur',en:'Happiness index',ua:'Індекс щастя',de:'Glücksindex',
   sort:{fr:'Pays le plus heureux en premier',en:'Happiest country first',ua:'Найщасливіша країна першою',de:'Glücklichstes Land zuerst'},
   desc:{fr:"Mesure le bien-être subjectif et la satisfaction de vie globale des habitants.",en:"Measures subjective well-being and overall life satisfaction of residents.",ua:'Вимірює суб\'єктивне благополуччя та загальну задоволеність життям мешканців.',de:'Misst das subjektive Wohlbefinden und die allgemeine Lebenszufriedenheit der Bevölkerung.'}},

  {id:'inegalite',icon:'⚖️',fr:"Indice d'inégalité",en:'Inequality index',ua:'Індекс нерівності',de:'Ungleichheitsindex',
   sort:{fr:'Pays le plus inégalitaire en premier',en:'Most unequal country first',ua:'Найнерівніша країна першою',de:'Ungleichstes Land zuerst'},
   desc:{fr:"Mesure les écarts de revenus et la répartition des richesses au sein de la population.",en:"Measures income gaps and wealth distribution within the population.",ua:'Вимірює розрив у доходах та розподіл багатства серед населення.',de:'Misst Einkommensunterschiede und Vermögensverteilung innerhalb der Bevölkerung.'}},

  {id:'dictature',icon:'👮',fr:'Indice de dictature',en:'Dictatorship index',ua:'Індекс диктатури',de:'Diktaturindex',
   sort:{fr:'Pays le plus dictatorial en premier',en:'Most dictatorial first',ua:'Найбільша диктатура першою',de:'Stärkste Diktatur zuerst'},
   desc:{fr:"Mesure le niveau de liberté politique et le type de régime (de dicature à démocratie).",en:"Measures the level of political freedom and regime type (from dictatorship to democracy).",ua:'Вимірює рівень політичної свободи та тип режиму (від диктатури до демократії).',de:'Misst das Niveau politischer Freiheit und den Regimetyp (von Diktatur bis Demokratie).'}},

{id:'taux_d_incarceration',icon:'🔒',fr:"Taux d'incarcération",en:'Incarceration rate',ua:'Рівень ув\'язнення',de:'Inhaftierungsrate',
   sort:{fr:"Taux d'incarcération le plus élevé en premier",en:'Highest incarceration rate first',ua:'Найвищий рівень ув\'язнення першим',de:'Höchste Inhaftierungsrate zuerst'},
   desc:{fr:"Nombre de personnes incarcérées pour 100 000 habitants. Reflète la politique pénale d'un pays.",en:"Number of people incarcerated per 100,000 inhabitants. Reflects a country's penal policy.",ua:'Кількість ув\'язнених на 100 000 жителів. Відображає кримінальну політику країни.',de:'Anzahl inhaftierter Personen pro 100.000 Einwohner. Spiegelt die Strafpolitik eines Landes wider.'}},

  {id:'taux_homicide',icon:'🔪',fr:"Taux d'homicide",en:'Homicide rate',ua:'Рівень вбивств',de:'Mordrate',
   sort:{fr:"Taux d'homicide le plus élevé en premier",en:'Highest homicide rate first',ua:'Найвищий рівень вбивств першим',de:'Höchste Mordrate zuerst'},
   desc:{fr:"Nombre d'homicides volontaires pour 100 000 habitants. Indicateur de sécurité publique.",en:'Number of intentional homicides per 100,000 inhabitants. A public safety indicator.',ua:'Кількість навмисних вбивств на 100 000 жителів. Показник громадської безпеки.',de:'Anzahl vorsätzlicher Tötungsdelikte pro 100.000 Einwohner. Indikator für öffentliche Sicherheit.'}},

  {id:'taux_occupation_prison',icon:'🏛️',fr:'Occupation des prisons',en:'Prison occupancy rate',ua:'Заповненість тюрем',de:'Gefängnisbelegung',
   sort:{fr:'Prisons les plus surpeuplées en premier (% capacité)',en:'Most overcrowded prisons first (% capacity)',ua:'Найбільш переповнені в\'язниці першими (% місткості)',de:'Überfüllteste Gefängnisse zuerst (% Kapazität)'},
   desc:{fr:"Pourcentage de la population carcérale par rapport à la capacité d'accueil officielle des prisons.",en:'Percentage of the prison population relative to the official capacity of prisons.',ua:'Відсоток заповненості тюрем відносно офіційної місткості.',de:'Prozentsatz der Gefängnisbelegung im Verhältnis zur offiziellen Kapazität.'}},

  {id:'nb_vehicule_p_habitant',icon:'🚗',fr:'Véhicules / habitant',en:'Vehicles per capita',ua:'Транспортних засобів на особу',de:'Fahrzeuge / Einwohner',
   sort:{fr:'Plus de véhicules par habitant en premier',en:'Most vehicles per capita first',ua:'Найбільше транспортних засобів на особу першим',de:'Meiste Fahrzeuge pro Kopf zuerst'},
   desc:{fr:'Nombre de véhicules motorisés (voitures, motos) par habitant. Indicateur de mobilité et de niveau de vie.',en:'Number of motorized vehicles (cars, motorcycles) per inhabitant. A mobility and living standard indicator.',ua:'Кількість моторизованих транспортних засобів (автомобілів, мотоциклів) на одного жителя.',de:'Anzahl motorisierter Fahrzeuge (Autos, Motorräder) pro Einwohner. Indikator für Mobilität und Lebensstandard.'}},

  {id:'nb_arme_a_feu_p_habitant',icon:'🔫',fr:'Armes à feu / habitant',en:'Firearms per capita',ua:'Вогнепальна зброя на особу',de:'Schusswaffen / Einwohner',
   sort:{fr:"Plus d'armes à feu par habitant en premier",en:'Most firearms per capita first',ua:'Найбільше зброї на особу першим',de:'Meiste Schusswaffen pro Kopf zuerst'},
   desc:{fr:"Nombre estimé d'armes à feu (civiles) par habitant. Reflète la prévalence des armes dans la société.",en:'Estimated number of civilian firearms per inhabitant. Reflects the prevalence of weapons in society.',ua:'Оцінювана кількість цивільної вогнепальної зброї на одного жителя.',de:'Geschätzte Anzahl ziviler Schusswaffen pro Einwohner. Spiegelt die Verbreitung von Waffen in der Gesellschaft wider.'}},

  {id:'median_internet_speed_fixedbroadband',icon:'🌐',fr:'Vitesse internet fixe',en:'Fixed broadband speed',ua:'Швидкість інтернету (кабель)',de:'Festnetz-Internetgeschwindigkeit',
   sort:{fr:'Internet fixe le plus rapide en premier (Mbit/s)',en:'Fastest fixed broadband first (Mbit/s)',ua:'Найшвидший фіксований інтернет першим (Мбіт/с)',de:'Schnellstes Festnetz-Internet zuerst (Mbit/s)'},
   desc:{fr:"Vitesse médiane de connexion internet sur réseau fixe (box), en Mbit/s. Indicateur d'infrastructure numérique.",en:'Median fixed broadband internet connection speed (Mbit/s). A digital infrastructure indicator.',ua:'Медіанна швидкість фіксованого інтернету (Мбіт/с). Показник цифрової інфраструктури.',de:'Mediane Internetgeschwindigkeit über Festnetz (Mbit/s). Indikator für digitale Infrastruktur.'}},

  {id:'index_acceptation_LGBTI',icon:'🏳️‍🌈',fr:'Acceptation LGBTI',en:'LGBTI acceptance index',ua:'Індекс прийняття ЛГБТІ',de:'LGBTI-Akzeptanzindex',
   sort:{fr:'Meilleure acceptation LGBTI en premier',en:'Highest LGBTI acceptance first',ua:'Найвищий рівень прийняття ЛГБТІ першим',de:'Höchste LGBTI-Akzeptanz zuerst'},
   desc:{fr:"Indice d'acceptation sociale des personnes LGBTI, mesurant les attitudes et droits dans la société.",en:'Index of Social Acceptance of LGBTI People, measuring attitudes and rights within society.',ua:'Індекс соціального прийняття людей ЛГБТІ, що вимірює ставлення суспільства та права.',de:'Index der sozialen Akzeptanz von LGBTI-Personen, misst gesellschaftliche Einstellungen und Rechte.'}}
];

function catName(cat) { return cat[currentLang] || cat.fr; }
function catDesc(cat) { return (cat.desc && cat.desc[currentLang]) ? cat.desc[currentLang] : (cat.desc ? cat.desc.fr : ''); }
function catSort(cat) { return (cat.sort && cat.sort[currentLang]) ? cat.sort[currentLang] : (cat.sort ? cat.sort.fr : ''); }
function getCountryName(c) {
  if (currentLang === 'de') return c.country_DE || c.country_EN || c.country_FR || c.name || '???';
  if (currentLang === 'en') return c.country_EN || c.country_FR || c.name || '???';
  if (currentLang === 'ua') return c.country_UA || c.country_FR || c.name || '???';
  return c.country_FR || c.country_EN || c.name || '???';
}
