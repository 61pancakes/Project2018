#### day 1 (8 January 2017)
- Proposal Document geschreven, met twee opties:
1. Het visualiseren van het allerleukste kaartspel ooit, 'Hanabi'.
2. Verdiepen in statistieken van studenten aan de UvA.
- Toch maar data opgezocht voor optie 2 en uiteindelijk knoop doorgehakt (#2 past beter in dit vak).
![voortgang](/doc/Sketch.png).

#### day 2 (9 January 2017)
- Data handmatig verzameld en omgezet naar CSV & JSON-format. 
- Besloten om de JSON-data aan te passen, zodat de mannen en vrouwen in aparte objecten per studie zitten, dat leek me beter qua code.

#### day 3 (10 January 2017)
- Proposal besproken met TA: de bubble chart gaat een multilijngrafiek worden, dat voegt meer toe aan het verhaal.
- Begonnen aan DESIGN.md om dit te visualiseren.
- Begonnen aan grouped & stacked staafdiagram (visualisatie #1).

#### day 4 (11 January 2017)
- De staafdiagram redelijk werkende gekregen: grouped werkt, nu nog het 'stacked' gedeelte.
- Proposal in README.md & DESIGN.md aangepast op basis van gesprek met TA. 
![voortgang](/doc/Sketchv2.png).
![voortgang](/doc/voortgang_v1.png)

### day 5 (12 January 2017)
- Multilijngrafiek gemaakt & redelijk werkende gekregen. De legenda en kleurtjes moeten nog aangepast worden. Nu zijn namelijk alle lijnen die mannen representeren blauw, en de rest roze. Die scheiding moet wel zichtbaar blijven, maar de lijnen moeten allemaal wel verschillende kleuren hebben. Ik weet nog niet zo goed hoe ik die scheiding duidelijk wil aangeven. Ook blijkt Tim kleurenblind te zijn dus daar moet ik over nadenken.
- Staafdiagram helemaal kloppende gekregen (voor en na:)
![voortgang](/doc/barchart.png)

#### day 6 (15 January 2017)
- Begin aan de sunburst gemaakt. Benodigde data had ik nog niet in een goed format, dus dat heb ik moeten herschrijven. De sunburst werkt op zichzelf, maar moet nog duidelijker worden. Ik heb nu gewoon een standaard voorbeeld nagemaakt en zal dus de tekst en kleuren nog moeten aanpassen. Daarnaast twijfel ik of ik de sunburst pas wil laten zien nadat een jaar is geselecteerd in de staafdiagram, of dat hij in het geheel zichtbaar is en enkel van schaal verandert door het klikken.
![voortgang](/doc/sunburstv1.png)

#### day 7 (16 January 2017)
- Interactiviteit aan de staafdiagram toegevoegd (tooltip + legenda). Het is nu duidelijker wat de diagram visualiseert.
- Staafdiagramcode opgeschoond. 
- Progress geupdate.  
![voortgang](/doc/barchartv2.png)

#### day 8 (17 January 2017)
- Code van de drie grafieken georganiseerd. 
- Na zitten denken over indeling HTML, geen verstand van Bootstrap dus beetje rond zitten kijken naar voorbeelden op de site wat mogelijkheden zijn. Ik heb nog niet echt iets gezien waarvan ik denk: 'Ja, die wordt het!'.

#### day 9 (18 January 2017)
- IVM storm thuis gebleven.

#### day 10 (19 January 2017)
- Gewerkt aan de legenda + aan/uitzetten van lijnen in de lijngrafiek, maar kreeg dat laatste (nog) niet volledig werkende.
- Twijfel over of ik de duo's (M/F) individueel wil kunnen uitzetten, of een soort voorselectie wil kunnen geven met een dropdown menu, of enkel als duo's. Hoeveel vrijheid geef je de gebruiker?
- Presentatie gegeven. 
![voortgang](/doc/linechartv1.png)

#### day 11 (22 January 2017)
- Heel erg veel gekloot met het werkend krijgen van pages & de kleuren van de sunburst. Ik wil de laatste twee ringen specifieke kleuren geven en ook de studies in verschillende jaren wel consistent kleuren, en in alle voorbeelden zijn die random dus daar moet ik nog wat op vinden.
![voortgang](/doc/sunburst.gif)

#### day 12 (23 January 2017)
- Legenda van de lijngrafiek afgemaakt (werkt nu statisch).
- Opnieuw poging gewaagd aan de interactie van de lijngrafiek (lines & legenda) - wat precies uit en aan kunnen zetten waar? 
- De interactiviteit tussen barchart en sunburst toegevoegd! :) Er moet nog wel uitleg komen over wat je kan doen en waarom je dat zou doen.

#### day 13 (24 January 2017)
- Lijngrafieklegenda interactie werkende gekregen! Ik had ook graag gewild dat je lijnen uit kon zetten door op de lijnen zelf te klikken, in plaats van op de legenda, maar dat is wel nog meer werk en ik weet niet zo snel hoe ik dat netjes zou oplossen, dus doe ik dat maar (voorlopig) niet.
- Begin gemaakt aan tabel in Bootstrap, besloten de tabel 'verticaal' met elkaar te vergelijken, in plaats van de standaard 'horizontale' tabellen waarbij een dataset in 1 rij in kolommen wordt geplaatst. Nu is nog de vraag - hoeveel studies met elkaar vergelijken? Beginnen met kijken of ik 2 kan laten werken.
- Planning voor laatste dagen gemaakt.
![voortgang](/doc/linegraph.gif)

#### day 14 (25 January 2017)
- Besloten datapunten toe te voegen aan de lijngrafiek, om de data beter te visualiseren. Daar vervolgens ook een tooltip bijgemaakt, zelfde als bij staafdiagram.
- Poging tot legenda bij sunburst gedaan. Dat zijn echter te veel kleuren, dus bleek geen goed idee:    
![voortgang](/doc/sunburstlegenda.png)Toen keek ik of ik niet gewoon een tooltip kon maken, maar dat faalde ook met layers van de SVG en maakte het niet echt duidelijker.  
![voortgang](/doc/sunburstv2.png)
Tot slot toch maar gekeken of ik de ['hoverable' sunburst](https://bl.ocks.org/kerryrodden/7090426) na kon maken, wat er nogal lastig uit zag. Dat is gelukkig wel gelukt en ik vind het duidelijk genoeg. Code is nu wel een zooitje maar dat komt volgende week wel.  
![voortgang](/doc/sunburstv3.png)


#### day 15 (26 January 2017)
- Presentatie gegeven. 
- Vast heel nuttig geweest, maar ik wist het maandag niet meer :)

#### day 16 (29 January 2017)
- Code grotendeels opgeschoond, ik moet nog kijken of ik de lijngrafiek nog verder kan inkorten. Ik heb nu alle M/F-functies bijna dubbel.
- Sunburst veranderd naar enkel aanroepen door staafdiagram (max. 1 academisch jaar visualiseren) - er zit nog een bug in de eerste keer klikken, dan kan je nog niet hoveren, dus dat moet ik morgen nog even oplossen.
- Begin gemaakt aan layout website.
![voortgang](/doc/websitev1.png)
![voortgang](/doc/websitev2.png)

#### day 17 (30 January 2017)
- Op basis van code review: code verder opgeschoond.
- Besloten om toch nog een poging aan een interactieve tabel te wagen, omdat ik meende daar tijd voor te hebben, voordat ik aan het verslag begin.
- Maar eerst aan de lay-out van de website gezeten. :)

#### day 18 (31 January 2017)
- Door het vinden van nog redeiljk wat bugs toch maar besloten de tabel te laten voor wat het is en me te focussen op de lay-out: liever een informatietooltip en goede, opgeruimde, werkdende code & verslag dan een extra interactief component. (Bovendien waren de tabellen, die ik zou kunnen maken in twee dagen echt lelijk zijn en zou het me veel stress gaan geven.) 
- Gefocust op het geheel mooi te krijgen, aangezien ik al maanden niks meer met HTML had gedaan.
- Begin gemaakt aan REPORT.MD, PROGRESS.md uitgewerkt & README.md geupdate. 

#### day 19 (1 February 2017)

