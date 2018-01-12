#### Minor Programmeren: Programmeerproject 2018     
**Titel:** Demografie van (bèta-)studies aan de UvA.
**Auteur:** Andrea van den Hooff  
**Samenvatting:** In dit project worden verschillende visualisaties gemaakt, die meer inzicht moeten geven in de man/vrouw-verhoudingen bij de FNWI, per studie en per academisch jaar.  

#### Problem statement:  
Het doel van deze visualisatie is het beter in kaart brengen, en inzicht krijgen in, de demografie bij bètastudies aan de Universiteit van Amsterdam. Het is bekend dat vrouwen in de minderheid zijn bij technische studies en daar wordt van alles aan gedaan, door subsidies en NGO's zoals [Women Who Code](https://www.womenwhocode.com). Is die balans bij alle studies aan de FNWI zo scheef en in hoeverre zit er een ontwikkeling in sinds het populairder worden van banen in de ICT?

#### Solution:  
Ik wil de ontwikkelingen in de man/vrouw-verhouding bij technische studies aan de Universiteit van Amsterdam in kaart brengen door de demografie van opleidingen in verschillende academische jaren met elkaar te vergelijken en die te visualiseren. Dit zal er als volgt uit moeten gaan zien:

* Visualisatie 1: Barchart van de afgelopen jaren van totaal aantal studenten (m/v en BA/MA gescheiden).
* Visualisatie 2: Sunburst met per niveau: Verdeling in academische jaren, studies, geslacht, jaarlagen + nog een vierde laag?
* Visualisatie 3: Multilijngrafiek: Vergelijk de FNWI van de UvA met de UvA als geheel, haar staf, andere universiteiten zoals de TU Delft.
![Sketch](/doc/Sketch.jpg)
![Sketch updated](/doc/Sketch_v2.jpg)

#### Main Features: 
- Laat het verschil in inschrijvingen van geslacht zien per academisch jaar. (MVP)  
- Laat het verschil in inschrijvingen van geslacht zien per studie. (MVP)  
- Extra vergelijkingen toevoegen met andere faculteiten, universiteiten, of de staf van de UvA. (MVP)  
- Klikken zorgt voor interactie tussen de visualisaties en geeft meer details weer. (MVP)  
- Hoveren zorgt voor extra informatie in windows. (MVP / Optioneel)  
- Links toevoegen naar de opleidingpagina's van de website. (Optioneel)
- Mooie layout maken. (Optioneel)

#### Prerequisites:
1. Transformeer data vanuit de [dataset](https://public.tableau.com/views/FeitenenCijfers/Students?:embed=y&:toolbar=no&:toolbar=no&:display_count=no&:display_count=no&:showVizHome=nohttps://public.tableausoftware.com/views/FeitenenCijfers "UvA") van de UvA.  
2. Volgens mij zijn er geen externe componenten nodig voor deze visualisaties. (Niet heel erg in verdiept - zou wel kunnen?)
3. Gerelateerde visualisaties zijn bijvoorbeeld: [WomenWhoTech](https://www.womenwhotech.com/womenintechinfographic) en [TU Delft](https://www.tudelft.nl/over-tu-delft/feiten-en-cijfers/onderwijs/studentenpopulatie/). WWT is een blitse, populistische visualisatie. Het is niet interactief en gooit vooral heel veel data naar de kijker. Het is waarschijnlijk niet geprogrammeerd, maar kan nog wel een goed voorbeeld zijn qua visualisatie. Het laat goed het verschil zien tussen de mannen en vrouwen (alhoewel cliché). De TU Delft is vergelijkbaar met, maar beter dan, de dataset van de UvA. De site heeft in tegenstelling tot WWT juist heel veel data verwerkt, maar laat dit wel maar in 1 compacte barchart zien. Sommige dingen, zoals de faculteiten, zijn niet erg begrijpelijk voor mensen buiten de TU. 
4. Hardest parts: Ik heb de vorige vakken van de Minor Programmeren een jaar geleden gedaan en de d3/js is enigszins weggezakt. Het uitzoeken hoe ik de verschillende visualisaties met elkaar interactief moet maken zal een grote uitdaging zijn, maar hopelijk te doen met hulp van de TA's en Het Internet. Daarnaast zal het verzamelen van de data niet per se lastig zijn, maar wel redelijk wat werk, omdat ik het handmatig zal moeten invoeren via de gegevens van de UvA. Ik zal er relatief veel tijd voor moeten inplannen.
