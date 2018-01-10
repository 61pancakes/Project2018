### ~ Basis voor de drie datavisualisaties 
#### Staafdiagram / Bar chart
- Basisdata goed verwerken van de UvA-pagina naar CSV, naar JSON.  
- Juiste data van de M/F koppelen en naast elkaar plaatsen ([voorbeeld van een 'grouped bar chart'](https://bl.ocks.org/mbostock/3887051)).  
- De Master-studenten stacken bovenop de Bachelor-studenten ([voorbeeld van een 'stacked bar chart'](https://bl.ocks.org/mbostock/3886208)).  

#### Sunburst 
-
-
- 

#### Bubble chart
-
-
-

#### Datasources
De (voornaamste) databron is de [statistiekenpagina](https://public.tableau.com/views/FeitenenCijfers/Students?:embed=y&:toolbar=no&:toolbar=no&:display_count=no&:display_count=no&:showVizHome=nohttps://public.tableausoftware.com/views/FeitenenCijfers/Students?:embed%3Dy&:showVizHome=no)
van de Universiteit van Amsterdam. De cijfers die in deze grafieken te vinden zijn, heb ik handmatig omgezet naar CSV,
en dat vervolgens met zelfgemaakte Python-code naar JSON vertaald (zie het mapje [data](/data/)). 
In de huidige JSON staan alleen nog het aantal studenten in elk academisch jaar per studie, als basis. Ik denk dat ik 
voor de sunburst deze moet uitbreiden of een tweede maken, waarin de verschillende jaarlagen van een studie ook nog onderscheiden zijn.
Misschien kan ik nog een andere variabele toevoegen, maar het lijkt me beter om eerst wat feedback te krijgen en de basis rond te krijgen.

### ~ Extra's 


//////////
Map the separate parts of the solution onto the framework(s) that you are using.
What APIs, methods or techniques do you need to implement each feature?

Think about and fully express how the user interface will be handled,
where the data is coming from, and how the various parts will work together to form a complete application.

# a list of data sources if you will get data from an external source,
# including information on how your are going to filter and transform the data for your project
# a diagram with an overview of the technical components of your app (visualizations, scraper etc etc)
# as well as descriptions of each of the components and what you need to implement these
# a list of APIs or D3 plugins that you will be using to provide functionality in your app

It is expected that you separate, in your code, handling of the user interface from data management and
from complex algorithms whenever possible. It should be clear from your design document how you are going
to do this!

