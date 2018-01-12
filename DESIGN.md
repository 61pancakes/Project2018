#### Staafdiagram / Bar chart in D3
- Basisdata goed verwerken van de UvA-pagina naar CSV, naar JSON, naar D3.
- Juiste data van de M/F koppelen en naast elkaar plaatsen ([voorbeeld van een 'grouped bar chart'](https://bl.ocks.org/mbostock/3887051)).  
- De Master-studenten stacken bovenop de Bachelor-studenten ([voorbeeld van een 'stacked bar chart'](https://bl.ocks.org/mbostock/3886208)).  

#### Sunburst in D3
- Extra informatie toevoegen aan de basisdata, verder net als staafdiagram goed verwerken.
- Verschillende niveaus implenteren en beter overwegen welk niveau precies welke variabele gaat vertegenwoordigen ([met een tutorial in het maken van sunbursts](https://bl.ocks.org/denjn5/e1cdbbe586ac31747b4a304f8f86efa5)).
- De visualisatie in D3 op orde krijgen ([voorbeeld van een sunburst](https://bl.ocks.org/mbostock/4348373)). 
- Interactie met staafdiagram implementeren (lastigst).

#### Multilijngrafiek / Multi line chart in D3
- Aparte data fixen voor de lijngrafieken (andere faculteiten, universiteiten).
- Duidelijk onderscheid creëren in de lijnen. ([voorbeeld van een multilijngrafiek](https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f)).
- Interactie met de andere twee visualisaties implementeren.

#### Datasources
De (voornaamste) databron is de [statistiekenpagina](https://public.tableau.com/views/FeitenenCijfers/Students?:embed=y&:toolbar=no&:toolbar=no&:display_count=no&:display_count=no&:showVizHome=nohttps://public.tableausoftware.com/views/FeitenenCijfers/Students?:embed%3Dy&:showVizHome=no)
van de Universiteit van Amsterdam. De cijfers die in deze grafieken te vinden zijn, heb ik handmatig omgezet naar CSV,
en dat vervolgens met zelfgemaakte Python-code naar JSON vertaald (zie het mapje [data](/data/)). 
In de huidige JSON staan alleen nog het aantal studenten in elk academisch jaar per studie, als basis. Ik denk dat ik 
voor de sunburst deze moet uitbreiden of een tweede maken, waarin de verschillende jaarlagen van een studie ook nog onderscheiden zijn.
Misschien kan ik nog een andere variabele toevoegen, maar het lijkt me beter om eerst wat feedback te krijgen en de basis rond te krijgen.

#### D3 Features, Plugins & APIs
- Alles in D3.
- ???

#### Interaction of various parts
Data: Handmatig uit de UvA-website gehaald, omgezet naar CSV en JSON, die in aparte bestanden in de Git staan.  
Overview: HTML-pagina met calls naar barchart.js, sunburst.js etcetera. (Ik weet niet hoeveel moeilijker qua interactie dat is, dus misschien ga ik dat nog aanpassen in week 2.).

