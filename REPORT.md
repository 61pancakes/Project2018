**BESCHRIJVING WEBSITE**
----------------  
Dit project visualiseert de demografische ontwikkelingen van de Universiteit van Amsterdam. Het brengt het aantal inschrijvingen per studie in kaart en focust daarbij op de Bachelor- en Masterstudenten aan de bètafaculteit FNWI. Door de afgelopen 5 jaar in de verschillende grafieken naast elkaar te zetten, kunnen er vergelijkingen worden gedaan, niet alleen tussen studies, maar ook tussen verschillende academische jaren.

![Website](doc/finalv3.png)

**DESIGN**
----------------  
**OVERVIEW**

Clearly describe the technical design: how is the functionality implemented in your code?
This should be like your DESIGN.md but updated to reflect the final application.
First, give a high level overview, which helps us navigate and understand the total of your code (which components are there?).

**DETAILS** 
Second, go into detail, and describe the modules/classes/functions and how they relate.

**CHALLENGES**
----------------  
1. De rest van de Minor een jaar geleden gedaan hebben.  
Hier had ik vooral de eerste twee weken nogal last van. Hoewel ik sinds de Minor eind 2016 wel een stuk meer geprogrammeerd heb, was dat vooral meer 'technisch' dingen bouwen, en niet in Javascript en HTML werken. Hierdoor duurde het even voordat ik de basis onder de knie had en had ik 'zelfs' met een simpele staafdiagram moeite in de eerste week. Ik heb mijn plan hier echter niet op aangepast, maar juist geprobeerd mezelf uit te dagen met wat ik ging maken. Toen het allemaal wat soepeler ging heb ik besloten juist extra's toe te voegen aan de visualisaties. In plaats van een simpele staafdiagram heb ik hem dus stacked & grouped gemaakt. In plaats van een cirkeldiagram heb ik de sunburst gemaakt en ook nog een extra hover + legenda toegevoegd toen de basis niet zo moeilijk bleek. Ook bij de lijndiagram heb ik geprobeerd met het aan/uitzetten het programmeren wat lastiger te maken. Het leek me dat ik hier meer van zou leren dan als ik iets zou doen met een originele API, waar ik dan vooral veel tijd in zou moeten steken om uit te vinden hoe het werkt.

2. De functies rondom SVGs & Javascript-files opbouwen.
Het is me na vier weken wel een stuk duidelijker, maar ik snap nog steeds niet helemaal hoe d3, Javascript en HTML nou samenwerken. Zo waren de coördinaten van de verschillende rechthoeken in de staafdiagram echt een uitdaging, en daar heb ik meer uren dan me lief is in moeten steken. Ik heb het uiteindelijk wel werkend gekregen, maar de code is echt een zooitje. De bedoeling is natuurlijk dat je functies mooi gescheiden zijn, maar mijn staafdiagram is één grote functie. Als ik de 'laad & show data' in een aparte functie wou gooien, verdwenen ze van het scherm en ik heb het niet op kunnen lossen. (Maar goed, het werkt in de huidige vorm, dus dat is wel fijn.)

3. Onderschat hoeveel bugs en i's er waren om puntjes op te zetten.
Mijn plan was aan het einde van week drie om nog in de laatste week een tabel te gaan maken, die stond namelijk nog in mijn originele plan (wel als optioneel). Op dat moment had ik namelijk drie werkende visualisaties en leek het allemaal wel goed te gaan. Echter heb ik bij het opschonen van de code gezien dat er eigenlijk nog wel veel te doen was. Er deden zich steeds weer nieuwe problemen voor, waardoor ik er uiteindelijk voor heb gekozen om het begin van de tabel die ik gemaakt had, weg te gooien en te focussen op dat wat ik al had. Hier heb ik misschien wel in algemene zin het meeste van geleerd!

4. De website in elkaar zetten.
Dit sluit enigszins aan bij 1 en 3; HTML is behoorlijk anders dan de andere programmeertalen waarmee ik in contact ben gekomen. Als je het kant-en-klaar ziet is het te begrijpen, maar om het zelf op te bouwen is toch iets anders. Ik heb er uiteindelijk voor gekozen om een template van Bootstrap te nemen en die aan te passen. Echter stond er zoveel in dat template wat ik niet nodig had, dat ik vooral veel tijd kwijt was aan het uitzoeken wat ik allemaal weg kon gooien. Je wilt (natuurlijk) wel een mooie lay-out hebben en ik heb dan ook misschien meer tijd gestoken in dat netjes te krijgen dan mijn code qua stijl echt goed te krijgen.

**VERANDERINGEN**
------------------
Van het originele design document is het meest intact gebleven. De algemene lay-out heb ik wel veranderd, omdat mijn laptopbeeldscherm niet groot genoeg was. Daarnaast heb ik één niveau van de sunburst weggehaald, op aanraden van de presentaties op vrijdag. Er stond te veel data in. Hoewel het wel een mooie visualisatie was, was de data niet meer overzichtelijk. Verder heb ik vooral dingen toegevoegd om de visualisaties te verduidelijken: legenda's, kleurtjes, tooltips en interactie stonden allemaal in het teken van uitleg. 

Als ik meer tijd had gehad, had ik nog een dag of twee naar de stijl van mijn code willen kijken. En daarnaast vooral nog een tabel interactief en werkende willen krijgen. De lijngrafiek had ik mogelijk ook wel anders gedaan. Ik vind hem niet echt mooi en er staat misschien te veel data in, als je hem in zijn geheel ziet (alhoewel daar natuurlijk alle interactiviteit voor is). Natuurlijk is het altijd mooier in je hoofd als je gewoon zou kunnen tekenen wat je zou willen maken, in plaats van gebruik te moeten maken van d3. Toch denk ik dat ik wel redelijk 'naar mijn kunnen' heb gepresteerd en ben ik trots op het resultaat! 
