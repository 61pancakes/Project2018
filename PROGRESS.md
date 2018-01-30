### day 1 (8 January 2017)
- Proposal Document geschreven, met twee opties: Optie 1, het visualiseren van het kaartspel 'Hanabi', Optie 2, verdiepen in statistieken van studenten aan de UvA.
- Data opgezocht voor optie 2 en uiteindelijk knoop doorgehakt dat ook daadwerkelijk te gaan doen (past beter bij dit vak).
- Proposal Document voor optie 2 uitgewerkt.

![voortgang](/doc/Sketch.png).


### day 2 (9 January 2017)
- Data handmatig verzameld en omgezet naar CSV & JSON-format. 
- JSON-data aangepast om mannen en vrouwen in aparte sets te hebben, dat leek me beter qua code.

### day 3 (10 January 2017)
- Proposal besproken met TA: bubble chart gaat een multilijngrafiek worden, dat voegt meer toe aan het verhaal.
- Begonnen aan Design Document.
- Begonnen aan Grouped & Stacked Staafdiagram (visualisatie #1).

### day 4 (11 January 2017)
- De Staafdiagram redelijk werkende gekregen: grouped werkt, nu nog het 'stacked' gedeeltde van de Masters.
- Proposal aangepast op basis van gesprek met TA. 
- Idee aangepast in README & Design Document.

![voortgang](/doc/Sketchv2.png).
![voortgang](/doc/voortgang_v1.png)

## day 5 (12 January 2017)
- Multilijngrafiek gemaakt & redelijk werkende gekregen: legenda en kleurtjes moeten nog aangepast worden. Nu zijn namelijk alle lijnen die mannen representeren blauw, en de andere vrouwen. Die scheiding moet wel zichtbaar blijven, maar de lijnen moeten allemaal wel verschillende kleuren hebben. Ik weet nog niet zo goed hoe ik die scheiding duidelijk wil aangeven.
- Barchart kloppende gekregen (voor en na:)
![voortgang](/doc/barchart.png)

### day 6 (15 January 2017)
- Sunburst gemaakt. Benodigde data had ik nog niet in een goed format, dus dat eerst herschreven, zodat de sunburst het kon gebruiken. Sunburst werkt op zichzelf, maar moet nog duidelijker worden (tekst + kleuren aanpassen) + ik twijfel over of ik hem pas wil laten zien nadat een jaar is geselecteerd in de staafdiagram of dat hij enkel van niveau verandert door het klikken.
![voortgang](/doc/sunburstv1.png)

### day 7 (16 January 2017)
- Interactiviteit van de staafdiagram toegevoegd (tooltip + legenda) - nu is het duidelijker.
- Staafdiagramcode opgeschoond. 
- Progress geupdate.

![voortgang](/doc/barchartv2.png)

--------

### day 8 (17 January 2017)
- Code georganiseerd. 
- Aan lijngrafiek gewerkt.
- Na zitten denken over indeling HTML, geen verstand van Bootstrap dus beetje rond zitten kijken naar voorbeelden op de site wat mogelijkheden zijn.

### day 9 (18 January 2017)
- IVM Storm thuisgebleven.

### day 10 (19 January 2017)
- Gewerkt aan de legenda + aan/uitzetten van lijnen in de lijngrafiek, maar kreeg dat laatste (nog) niet volledig werkende.
- Twijfel over of ik de duo's (M/F) individueel wil kunnen uitzetten, of een soort voorselectie wil kunnen geven met een dropdown menu, of enkel als duo's. Hoeveel vrijheid geef je de gebruiker?
- Presentatie gegeven. 

![voortgang](/doc/linechartv1.png)


### day 11 (22 January 2017)
- Heel erg veel gekloot met pages & kleuren van de sunburst. Ik wil de laatste twee ringen specifieke kleuren geven en ook de studies in verschillende jaren wel consistent kleuren, en in alle voorbeelden zijn die random dus daar moet ik nog wat op vinden.
![voortgang](/doc/sunburst.gif)

## day 12 (23 January 2017)
- Legenda van de lijngrafiek afgemaakt (Statisch)
- Opnieuw poging gewaagd aan de interactie van de lijngrafiek (lines & legenda) - wat precies uit en aan kunnen zetten waar? 
- Interactiviteit tussen barchart en sunburst toegevoegd! :) Er moet nog wel uitleg komen over wat je kan doen en waarom je dat zou doen.

## day 13 (24 January 2017)
- Lijngrafieklegenda interactie werkende gekregen! Ik had ook graag gewild dat je lijnen uit kon zetten door op de lijnen zelf te klikken, in plaats van op de legenda, maar dat is wel nog meer werk en ik weet niet zo snel hoe ik dat netjes zou oplossen, dus doe ik dat maar (voorlopig) niet.
- Begin gemaakt aan tabel in Bootstrap, besloten de tabel 'verticaal' met elkaar te vergelijken, in plaats van de standaard 'horizontale' tabellen waarbij een dataset in 1 rij in kolommen wordt geplaatst. Nu is nog de vraag - hoeveel studies met elkaar vergelijken? Beginnen met kijken of ik 2 kan laten werken.
- Planning voor laatste dagen gemaakt.

![voortgang](/doc/linegraph.gif)

## day 14 (25 January 2017)
- Besloten datapunten toe te voegen aan de lijngrafiek, om de data beter te visualiseren.
- Daar een tooltip bijgemaakt, zelfde als bij staafdiagram.
- Poging tot legenda bij sunburst gedaan. Dat zijn echter te veel kleuren, dus bleek geen goed idee:  
![voortgang](/doc/sunburstlegenda.png)
- Toen keek ik of ik niet gewoon een tooltip kon maken, maar dat faalde ook met layers van de SVG en maakte het niet echt duidelijker.  
![voortgang](/doc/sunburstv2.png)

- Tot slot toch maar gekeken of ik de ['hoverable' sunburst](https://bl.ocks.org/kerryrodden/7090426) na kon maken, wat er nogal lastig uit zag. Dat is gelukkig wel gelukt en ik vind het duidelijk genoeg. Code is nu wel een zooitje maar dat komt volgende week wel.  
![voortgang](/doc/sunburstv3.png)


## day 15 (26 January 2017)
- Presentatie gegeven. 

## day 16 (29 January 2017)
- Code grotendeels opgeschoond, ik moet nog kijken of ik de line chart nog verder kan inkorten. Ik heb nu alle M/F-functies bijna dubbel.
- Sunburst veranderd naar enkel aanroepen door staafdiagram (max. 1 academisch jaar visualiseren) - er zit nog een bug in de eerste keer klikken, dan kan je nog niet hoveren, dus dat moet ik morgen nog even oplossen.
- Begin gemaakt aan layout website.

![voortgang](/doc/websitev1.png)
![voortgang](/doc/websitev2.png)

## day 17 (30 January 2017)
- Code review: code verder opgeschoond.

## day 18 (31 January 2017)
## day 19 (32 January 2017)










///////
Your process book details your steps in developing your solution, including the alternative designs you tried, and the insights you got. Equally important to your final results is how you got there! Your process book is the place you describe and document the space of possibilities you explored at each step of your project. It is not, however, a journal or lab notebook that describes every single detail — you should think carefully about the important decisions you made and insights you gained and present your reasoning in a concise way. You are preserving the knowledge that you are gaining during the process for later reference.

We strongly advise you to include many figures in your process book, including photos of your sketches of potential designs, screen shots from different visualization tools you explored, inspirations of visualizations you found online, etc. Several images illustrating changes in your design or focus over time will be far more informative than text describing those changes. Instead, use text to describe the rationale behind the evolution of your project.

In the process book, at the end of each day, summarize important decisions you have made. Do not be afraid to do this somewhat crudely, probably with bullet points and the like. Do aim to provide insight in the process you’re going through while creating your application.

Doing this will make it easier to write your report, and we also use it during grading, to see if there were obvious problems we should know about.

