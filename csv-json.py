import json
import csv

datas = []

with open("word.csv", "r") as f:
    reader = csv.reader(f)
    for row in reader:
        no = int(row[0])
        sec = int(row[1])
        eng = row[2]
        jp = row[3]
        datas.append({"no":no, "sec":sec, "eng":eng, "jp":jp})


with open('word.json', 'w', encoding="utf-8") as f:
    json.dump(datas, f, ensure_ascii=False)