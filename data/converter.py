import csv
import json

csvfile = open('totaalstudenten.csv', 'r')
jsonfile = open('file.json', 'w')

fieldnames = ("course", "twaalfdertien", "dertienveertien", "veertienvijftien",
              "vijftienzestien", "zestienzeventien", "zeventienachttien")

reader = csv.DictReader(csvfile, fieldnames, delimiter=';')
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')
